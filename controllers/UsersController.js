// const connection = require('../startup/dbconnection');
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const db = require("../startup/dbconnection");
const config = require("config");

const User = db.users;
const Event = db.events;
const UserEvent = db.userEvents;
const UserCategory = db.userCategories;
const Category = db.categories;

function getOneUserWithCategories(userId) {
  return User.findOne({
    where: { id: userId },
    include: [
      {
        model: UserCategory,
        attributes: ["categoryId"],
        include: [
          {
            model: Category,
            attributes: ["categoryName"]
          }
        ]
      }
    ]
  });
}

function sendVerificationEmail(user) {
  const token = user.generateVerifyToken();
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: user.email,
    from: "no-reply@ezmeetup.com",
    subject: "Confirm your account",
    text:
      "Thank you for using our application!. Please click this link to verify your account : \n",
    html:
      "<a href='http://myvmlab.senecacollege.ca:6282/api/users/verify/" +
      token +
      "'>Activate account</a>"
    // html:
    //   "<a href='http://localhost:10034/api/users/verify/" +
    //   token +
    //   "'>Activate account</a>"
  };
  //   console.log(process.env.SENDGRID_API_KEY);
  //   console.log(msg);
  sgMail.send(msg);
}

// Create new user
exports.create = (req, res) => {
  User.create({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    isAdmin: false
    // email: "test1@test.ca",
    // password: "Password123",
    // firstName: "Firstname1",
    // lastName: "Lastname1",
    // phoneNumber: "123-456-7895",
    // isAdmin: false
  })
    .then(user => {
      const categoryArr = req.body.categoryIds.map(id => ({
        userId: user.id,
        categoryId: id
      }));
      UserCategory.bulkCreate(categoryArr).then(() => {
        getOneUserWithCategories(user.id).then(async user => {
          await sendVerificationEmail(user);
          res.status(201).send(user);
        });
      });
    })
    .catch(err => {
      if (err.name === "SequelizeForeignKeyConstraintError") {
        res.status(400).send("User creator does not exist");
      }
      res.status(400).send(err);
    });
};

// Display list of all Users.
exports.findAll = (req, res) => {
  User.findAll()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(400).send(err.errors[0].message);
    });
};

// Find a User by Id
exports.findById = (req, res) => {
  getOneUserWithCategories(req.params.userId)
    .then(user => {
      if (!user) {
        res.status(404).send("User not found");
      } else {
        res.status(200).send(user);
      }
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

// Update User info

/**
 * TODOs for Update
 * Email changes
 * Password changes
 * others changes
 */
exports.update = (req, res) => {
  const id = req.params.userId;

  User.findOne({ where: { id: id } })
    .then(user => {
      return user.update({
        email: req.body.email || user.email,
        password: req.body.password || user.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber
        // email: "test2@test.ca",
        // password: "Password123",
        // firstName: "Firstname2",
        // lastName: "Lastname2",
        // phoneNumber: "123-456-7895"
      });
    })
    .then(user => {
      if (!user) res.status(404).send("User not found");

      UserCategory.destroy({
        where: { userId: user.id }
      }).then(() => {
        const categoryArr = req.body.categoryIds.map(id => ({
          userId: user.id,
          categoryId: id
        }));
        UserCategory.bulkCreate(categoryArr).then(() => {
          getOneUserWithCategories(user.id).then(user => {
            res.status(200).send(user);
          });
        });
      });
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

// Delete a User by Id
exports.delete = (req, res) => {
  const id = req.params.userId;
  User.destroy({
    where: { id: id }
  }).then(() => {
    res.status(200).send("deleted successfully a User with id = " + id);
  });
};

// Login method
exports.login = (req, res, next) => {
  if (!req.user.userVerified()) {
    res.status(401).send("Please check your email to verify your account");
    return next();
  }

  const token = req.user.generateAuthToken();

  res
    .header("AuthToken", token)
    .status(200)
    .send(_.pick(req.user, ["id", "email", "loginStatus"]));

  return next();
};

// Verify Account
exports.verifyAccount = (req, res) => {
  jwt.verify(req.params.token, config.get("jwtPrivateKey"), (err, decoded) => {
    if (err) {
      return res.status(400).send("Token is invalid");
    }

    User.findOne({ where: { id: decoded.id, email: decoded.email } })
      .then(user => {
        if (!user) return res.status(400).send("Token is invalid");
        if (user.userVerified)
          return res.status(400).send("This user has already been verified.");

        user.update({
          isVerified: true
        });

        res.status(200).send("This account has been verified.");
      })
      .catch(err => {
        res.status(400).send(err.errors[0].message);
      });
  });
};

// Join the event
exports.joinEvent = (req, res) => {
  const userId = req.params.userId;
  const eventId = req.params.eventId;

  UserEvent.create({
    userId: userId,
    eventId: eventId
  })
    .then(userEvent => {
      res.status(201).send(userEvent);
    })
    .catch(err => {
      if (err.name === "SequelizeUniqueConstraintError")
        res.status(400).send("Already Joined the event!");
      else res.status(400).send(err.errors[0].message);
    });
};

exports.findAllEventsById = (req, res) => {
  UserEvent.findAll({
    where: { userId: req.params.userId },
    attributes: ["userId"],
    include: [
      {
        model: Event,
        attributes: [
          "eventId",
          "eventName",
          "eventLocation",
          "eventDescription"
        ]
      }
    ]
  })
    .then(events => {
      res.send(events);
    })
    .catch(err => {
      res.status(400).send(err.errors[0].message);
    });
};
