const _ = require("lodash");
const db = require("../startup/dbconnection");
const Op = require("sequelize").Op;
const Event = db.events;
const Category = db.categories;
const EventCategory = db.eventCategories;
const User = db.users;
const UserCategory = db.userCategories;
const UserEvent = db.userEvents;
const EventImage = db.eventImages;

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
      },
      {
        model: EventImage,
        attributes: ["image"]
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
      },
      {
        model: EventImage,
        attributes: ["image"]
      }
    ]
  });
}

function getAllUsersInEvent(eventId) {
  return Event.findOne({
    where: { id: eventId },
    attributes: ["id", "eventName", "eventCapacity"],
    include: [
      {
        model: UserEvent,
        attributes: ["userId"]
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
      });
    })
    .then(eventCats => {
      const eventArr = eventCats.map(a => a.eventId);

      return UserEvent.findAll({
        where: { userId: req.params.userId },
        attributes: ["eventId"]
      }).then(events => {
        const evts = events.map(a => a.eventId);
        return eventArr.filter(x => evts.indexOf(x) < 0);
      });
    })
    .then(filteredEvents => {
      const curDate = new Date(
        Date.UTC(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        )
      );
      //   curDate.setHours(curDate.getHours() - 5);

      console.log(curDate);
      return Event.findAll({
        where: {
          id: { [Op.in]: filteredEvents }
          //   eventDate: {
          //     [Op.gte]: curDate
          //   }
        },
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
          },
          {
            model: EventImage,
            attributes: ["image"]
          }
        ],
        distinct: true
      });
    })
    .then(showEvents => {
      res.send(showEvents);
    })
    .catch(err => {
      res.status(400).send(err.errors[0].message);
    });
};

// Create new event
exports.create = (req, res) => {
  const newEvent = JSON.parse(req.body.request);
  const fullAddress =
    newEvent.eventAddress1 +
    ", " +
    (newEvent.eventAddress2 || "") +
    ", " +
    newEvent.eventCity +
    ", " +
    newEvent.eventProvince +
    " " +
    newEvent.eventPostalCode;
  Event.create({
    eventName: newEvent.eventName,
    eventAddress1: newEvent.eventAddress1,
    eventAddress2: newEvent.eventAddress2,
    eventCity: newEvent.eventCity,
    eventProvince: newEvent.eventProvince,
    eventPostalCode: newEvent.eventPostalCode,
    eventLocation: fullAddress,
    eventDescription: newEvent.eventDescription,
    eventCapacity: newEvent.eventCapacity || 0,
    eventDate: newEvent.eventDate,
    userId: newEvent.userId
  })
    .then(event => {
      const categoryArr = newEvent.categoryIds.map(id => ({
        eventId: event.id,
        categoryId: id
      }));
      EventCategory.bulkCreate(categoryArr).then(() => {
        getOneEventWithCategories(event.id).then(event => {
          let filePath = req.protocol + "://" + req.get("host") + "/";
          filePath +=
            req.file !== undefined ? req.file.path : "public/logo.jpg";

          EventImage.create({ eventId: event.id, image: filePath });

          return event;
        });
      });

      res.status(201).send(event);
    })
    .catch(err => {
      if (err.name === "SequelizeForeignKeyConstraintError") {
        res.status(400).send("Event creator does not exist");
      }
      res.status(400).send(err);
    });
};

// Find an event by Id
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

// Find all users in Event
exports.findAllUsersinEvent = (req, res) => {
  getAllUsersInEvent(req.params.eventId)
    .then(users => {
      if (!users) {
        res.status(404).send("users not found");
      } else {
        res.status(200).send(users);
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

  const newEvent = JSON.parse(req.body.request);
  //   res.status(200).send(newEvent);
  const fullAddress =
    newEvent.eventAddress1 +
    ", " +
    (newEvent.eventAddress2 || "") +
    ", " +
    newEvent.eventCity +
    ", " +
    newEvent.eventProvince +
    " " +
    newEvent.eventPostalCode;

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
        eventName: newEvent.eventName || event.eventName,
        eventAddress1: newEvent.eventAddress1 || event.eventAddress1,
        eventAddress2: newEvent.eventAddress2 || event.eventAddress2,
        eventCity: newEvent.eventCity || event.eventCity,
        eventProvince: newEvent.eventProvince || event.eventProvince,
        eventPostalCode: newEvent.eventPostalCode || event.eventPostalCode,
        eventLocation: fullAddress,
        eventDescription: newEvent.eventDescription || event.eventDescription,
        eventCapacity: newEvent.eventCapacity || 0,
        eventDate: newEvent.eventDate || event.eventDate,
        userId: newEvent.userId
      });
    })
    .then(event => {
      const categoryArr = newEvent.categoryIds.map(id => ({
        eventId: event.id,
        categoryId: id
      }));

      EventCategory.destroy({
        where: { eventId: event.id }
      }).then(() => {
        EventCategory.bulkCreate(categoryArr).then(() => {
          let filePath = req.protocol + "://" + req.get("host") + "/";
          filePath +=
            req.file !== undefined ? req.file.path : "public/logo.jpg";
          if (req.file !== undefined) {
            EventImage.findOne({
              where: { eventId: event.id }
            }).then(eventImage => {
              eventImage.update({
                image: filePath
              });
            });
          }
        });
      });
      res.statusMessage = "Successfully Updated";
      res.status(204).send();
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
