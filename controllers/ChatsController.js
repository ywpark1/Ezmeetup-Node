const _ = require("lodash");
const db = require("../startup/dbconnection");
const Op = require("sequelize").Op;
const User = db.users;
const Event = db.events;
const Chat = db.chats;
const UserEvent = db.userEvents;
const admin = require("../startup/chatNotification");

// Display list of all Events.
exports.getAllByEventId = (req, res) => {
  Chat.findAll({
    where: { eventId: req.params.eventId },
    attributes: ["message", "createdAt"],
    include: [
      {
        model: User,
        attributes: ["firstName", "lastName"]
      }
    ]
  })
    .then(chats => {
      res.send(chats);
    })
    .catch(err => {
      res.status(400).send(err.errors[0].message);
    });
};

// Create new event
exports.create = (req, res) => {
  Chat.create({
    userId: req.body.userId,
    eventId: req.params.eventId,
    message: req.body.message
  })
    .then(chat => {
      UserEvent.findAll({
        where: { eventId: req.params.eventId },
        attributes: ["userId"],
        include: [
          {
            model: Event,
            attributes: ["eventName"]
          },
          {
            model: User,
            attributes: ["id", "firstName", "deviceToken"]
          }
        ]
      }).then(async userEvents => {
        const userArr = userEvents.map(a => a.user);
        const sender = userArr.filter(u => u.id === chat.userId)[0];
        const receivers = userArr.filter(u => u.id !== chat.userId);
        const event = userEvents.map(a => a.event.eventName)[0];
        const tokenArr = receivers.map(a => a.deviceToken);
        await (function() {
          //   console.log(event);
          tokenArr.forEach(t => {
            // Send notification
            var registrationToken = t;
            var message = {
              android: {
                ttl: 3600 * 1000, // 1 hour in milliseconds
                priority: "normal",
                notification: {
                  title: event,
                  body: sender.firstName + ": " + chat.message,
                  icon: "stock_ticker_update",
                  color: "#f45342"
                }
              },
              token: registrationToken
            };
            admin
              .messaging()
              .send(message)
              .then(response => {
                console.log("Successfully sent message:", response);
              })
              .catch(error => {
                console.log("Error sending message:", error);
              });
          });
        })();
      });

      res.status(201).send(chat);
    })
    .catch(err => {
      if (err.name === "SequelizeForeignKeyConstraintError") {
        res.status(400).send("Event creator does not exist");
      }
      res.status(400).send(err.errors[0].message);
    });
};
