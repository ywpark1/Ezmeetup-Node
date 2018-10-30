const _ = require("lodash");
// const jwt = require('jsonwebtoken');
const db = require("../startup/dbconnection");
// const config = require('config');
const Op = require("sequelize").Op;
const Event = db.events;
const Category = db.categories;
const EventCategory = db.eventCategories;
const User = db.users;
const UserCategory = db.userCategories;

function getOneEventWithCategories(eventId) {
  return Event.findOne({
    where: { id: eventId },
    include: [
      {
        model: EventCategory,
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

function getAllEventsWithCategories() {
  return Event.findAll({
    include: [
      {
        model: EventCategory,
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

// Display list of all Events.
exports.findAll = (req, res) => {
  getAllEventsWithCategories()
    .then(events => {
      res.send(events);
    })
    .catch(err => {
      res.status(400).send(err.errors[0].message);
    });
};

// Display list of all Events based on User Categories.
exports.findAllWithCategories = (req, res) => {
  UserCategory.findAll({
    where: { userId: req.params.userId },
    attributes: ["categoryId"]
  })
    .then(categories => {
      const categoryArr = categories.map(a => a.categoryId);
      return EventCategory.findAll({
        where: { categoryId: { [Op.in]: categoryArr } },
        distinct: true
        // group: "eventId"
      });
    })
    .then(eventCats => {
      const eventArr = eventCats.map(a => a.eventId);

      return Event.findAll({
        where: { id: { [Op.in]: eventArr } },
        include: [
          {
            model: EventCategory,
            attributes: ["categoryId"],
            include: [
              {
                model: Category,
                attributes: ["categoryName"]
              }
            ]
          }
        ],
        distinct: true
      });
      //   res.send(eventArr);
    })
    .then(events => {
      res.send(events);
    })
    .catch(err => {
      res.status(400).send(err.errors[0].message);
    });
  //   res.send(userCategoriesArr);
  //   Event.findAll()
  //     .then(events => {
  //       res.send(events);
  //     })
  //     .catch(err => {
  //       res.status(400).send(err.errors[0].message);
  //     });
};

// Create new event
exports.create = (req, res) => {
  Event.create({
    eventName: req.body.eventName,
    eventLocation: req.body.eventLocation,
    eventDescription: req.body.eventDescription,
    eventCapacity: req.body.eventCapacity,
    eventDate: req.body.eventDate,
    userId: req.body.userId
    // eventName: "Test Event 1",
    // eventLocation: "Toronto, ON",
    // eventDescription: "This is Test Event Description.",
    // eventCapacity: 15,
    // eventDate: "2018-11-12",
    // userId: 1
  })
    .then(event => {
      const categoryArr = req.body.categoryIds.map(id => ({
        eventId: event.id,
        categoryId: id
      }));
      EventCategory.bulkCreate(categoryArr).then(() => {
        getOneEventWithCategories(event.id).then(event => {
          res.status(201).send(event);
        });
      });
    })
    .catch(err => {
      if (err.name === "SequelizeForeignKeyConstraintError") {
        res.status(400).send("Event creator does not exist");
      }
      res.status(400).send(err);
    });
};

// Find a User by Id
exports.findById = (req, res) => {
  getOneEventWithCategories(req.params.eventId)
    .then(event => {
      if (!event) {
        res.status(404).send("Event not found");
      } else {
        res.status(200).send(event);
      }
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

// Update Event info
exports.update = (req, res) => {
  const userId = req.params.userId;
  const eventId = req.params.eventId;

  Event.findOne({
    where: {
      id: eventId,
      userId: userId
    }
  })
    .then(event => {
      if (!event) {
        res.status(404).send("Event not found");
      }

      return event.update({
        eventName: req.body.eventName,
        eventLocation: req.body.eventLocation,
        eventDescription: req.body.eventDescription,
        eventCapacity: req.body.eventCapacity,
        eventDate: req.body.eventDate
      });
    })
    .then(event => {
      res.status(200).send(event);
      // res.status(200).send("Updated successfully a event with id = " + id);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

// Delete a User by Id
exports.delete = (req, res) => {
  const userId = req.params.userId;
  const eventId = req.params.eventId;
  Event.destroy({
    where: { id: eventId, userId: userId }
  }).then(() => {
    res.status(200).send("deleted successfully a User with id = " + id);
  });
};
