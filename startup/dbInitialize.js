"use strict";

module.exports = function(db) {
  // db.sequelize.sync({ force: true }).then(() => {
  db.sequelize
    .sync()
    .then(() => {
      console.log("\n***** Finished creating tables if not exist *****\n");

      return db.categories.count();
    })
    .then(count => {
      if (count == 0) {
        db.categories
          .bulkCreate([
            { categoryName: "Food" },
            { categoryName: "Event" },
            { categoryName: "Sports" },
            { categoryName: "Car Pool" },
            { categoryName: "Conference" },
            { categoryName: "Entertainment" }
          ])
          .then(cat => {
            return db.users.create({
              email: "admin@test.ca",
              password: "Admin123!",
              firstName: "Admin",
              lastName: "Admin",
              phoneNumber: "123-456-7890",
              isAdmin: true,
              isVerified: true
            });
          })
          .then(admin => {
            const categoryIds = [1, 2, 3, 4, 5, 6];
            const adminUserCategories = categoryIds.map(id => ({
              userId: admin.id,
              categoryId: id
            }));
            return db.userCategories.bulkCreate(adminUserCategories);
          })
          .then(userCat => {
            return db.events.bulkCreate([
              {
                eventName: "PRJ666 Final Presentation",
                eventAddress1: "70 The Pond Road",
                eventCity: "Toronto",
                eventProvince: "ON",
                eventPostalCode: "L4G 7J1",
                eventLocation: "70 The Pond Road, Toronto, ON L4G 7J1",
                eventDescription: "We will present our final projects.",
                eventCapacity: 0,
                eventDate: "2018-12-04",
                userId: 1
              },
              {
                eventName: "Cineplex",
                eventAddress1: "15460 Bayview Avenue",
                eventCity: "Aurora",
                eventProvince: "ON",
                eventPostalCode: "L4G 7J1",
                eventLocation: "15460 Bayview Avenue Aurora, ON L4G 7J1",
                eventDescription: "Watch a movie together!",
                eventCapacity: 20,
                eventDate: "2018-12-23",
                userId: 1
              },
              {
                eventName: "CNE",
                eventAddress1: "210 Princes' Blvd",
                eventCity: "Toronto",
                eventProvince: "ON",
                eventPostalCode: "M6K 3C3",
                eventLocation: "210 Princes' Blvd, Toronto, ON M6K 3C3",
                eventDescription:
                  "An annual event that takes place at Exhibition Place",
                eventCapacity: 30,
                eventDate: "2018-12-10",
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
                categoryId: 6
              },
              {
                eventId: 3,
                categoryId: 2
              }
            ]);
          })
          .then(categories => {
            return db.eventImages.bulkCreate([
              {
                eventId: 1,
                image: "http://myvmlab.senecacollege.ca:6282/public/logo.jpg"
              },
              {
                eventId: 2,
                image:
                  "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Cineplex_logo.svg/500px-Cineplex_logo.svg.png"
              },
              {
                eventId: 3,
                image:
                  "https://theex.com/statcache/pthumb/images/galleries/skyride/skyride_1.fe2c857b.jpg"
              }
            ]);
          })
          .then(() => {
            // console.log("Drop and Resync with { force: true }");
            console.log("\n***** Add default data into the tables *****\n");
          });
      }
    })
    .then(() => {
      // console.log("Drop and Resync with { force: true }");
      console.log("\n***** Resync tables *****\n");
    })
    .catch(err => {
      console.log(err);
    });
};
