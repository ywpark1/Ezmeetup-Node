const _ = require("lodash");
const db = require("../startup/dbconnection");
const Category = db.categories;

// // Create new user
// exports.create = (req, res) => {
//     User.create({
//         email: req.body.email,
//         password: req.body.password,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         phoneNumber: req.body.phoneNumber,
//         isAdmin: false
//     }).then(user => {
//         res.status(201).send(user);
//     }).catch(err => {
//         res.status(400).send(err);
//     });
// };

// Display list of all Users.
exports.findAll = (req, res) => {
  Category.findAll({
    attributes: ["id", "categoryName"],
    order: ["id"]
  })
    .then(categories => {
      res.send(categories);
    })
    .catch(err => {
      res.status(400).send(err.errors[0].message);
    });
};
