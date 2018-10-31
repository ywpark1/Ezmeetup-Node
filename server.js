"use strict";

const config = require("config");
const express = require("express");
const app = express();

const logger = require("./startup/logger");

/* import app.use() */
require("./startup/prod")(express, app);
require("./startup/routes")(app);
app.get("env") === "development" ? require("./startup/dev")(app) : null;

console.log("Application Name: " + config.get("name") + "\n");

const db = require("./startup/dbconnection");

db.sequelize.sync({ force: true }).then(() => {
  db.categories
    .bulkCreate([
      { categoryName: "Food" },
      { categoryName: "Event" },
      { categoryName: "Sports" },
      { categoryName: "Car Pool" },
      { categoryName: "Conference" },
      { categoryName: "Entertainment" }
    ])
    .then(events => {
      return db.users.create({
        email: "admin@test.ca",
        password: "admin123",
        firstName: "Admin",
        lastName: "Admin",
        phoneNumber: "123-456-7890",
        isAdmin: true
      });
    })
    .then(admin => {
      return db.events.bulkCreate([
        {
          eventName: "Cineplex",
          eventLocation: "15460 Bayview Avenue Aurora, ON, L4G 7J1",
          eventDescription: "Watch a movie together!",
          eventCapacity: 20,
          eventDate: "2018-11-12",
          userId: 1
        },
        {
          eventName: "CNE",
          eventLocation: "210 Princes' Blvd, Toronto, ON M6K 3C3",
          eventDescription:
            "An annual event that takes place at Exhibition Place",
          eventCapacity: 30,
          eventDate: "2018-11-20",
          userId: 1
        }
      ]);
    })
    .then(events => {
      return db.eventCategories.bulkCreate([
        {
          eventId: 1,
          categoryId: 5
        },
        {
          eventId: 2,
          categoryId: 2
        }
      ]);
    })
    .then(categories => {
      return db.eventImages.bulkCreate([
        {
          eventId: 1,
          image:
            "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Cineplex_logo.svg/500px-Cineplex_logo.svg.png"
        },
        {
          eventId: 1,
          image:
            "https://mediafiles.cineplex.com/Attachments/NewItems/venom-595x326-EN_20181005144852_0.jpg"
        },
        {
          eventId: 1,
          image:
            "https://mediafiles.cineplex.com/Attachments/NewItems/astarisborn-595x326-EN_20181005144910_0.jpg"
        },
        {
          eventId: 2,
          image:
            "https://theex.com/statcache/pthumb/images/galleries/skyride/skyride_1.fe2c857b.jpg"
        },
        {
          eventId: 2,
          image:
            "https://theex.com/statcache/pthumb/images/food/restaurants/ribfest_lg.ce9edee6.jpg"
        },
        {
          eventId: 2,
          image:
            "https://theex.com/statcache/pthumb/images/food/craft_beer_fest_2015.ce9edee6.jpg"
        }
      ]);
    })
    .then(categories => {
      console.log("Drop and Resync with { force: true }");
    });
});

// const port = process.env.PORT || 3000;
const port = 10034;

const server = require("http").Server(app);

const io = require("socket.io")(server);

server.listen(port, () => logger.info(`Listening on port ${port}...`));

// server = app.listen(port, () => logger.info(`Listening on port ${port}...`));

// io.on("connection", socket => {
//   console.log(socket.id);

//   socket.on("SEND_MESSAGE", function(data) {
//     io.emit("RECEIVE_MESSAGE", data);
//   });
// });

var chat = io.of("/chat");
chat.on("connection", function(socket) {
  //   socket.emit("a message", {
  //     that: "only",
  //     "/chat": "will get"
  //   });
  //   chat.emit("a message", {
  //     everyone: "in",
  //     "/chat": "will get"
  //   });
  console.log(socket.id + " is connected!");
  //   io.emit("RECEIVE_MESSAGE", "Hello from server");
  socket.on("SEND_MESSAGE", function(data) {
    console.log("Message : " + data.message);
    socket.emit("RECEIVE_MESSAGE", data);
  });
});
// chat.emit("hi", "everyone!");

// console.log("Connected!");

module.exports = server;
