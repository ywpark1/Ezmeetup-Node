const _ = require('lodash');
// const jwt = require('jsonwebtoken');
const db = require('../startup/dbconnection');
// const config = require('config');
const Event = db.events;
const User = db.users;

// Display list of all Events.
exports.findAll = (req, res) => {
    Event.findAll()
        .then(events => {
            res.send(events);
        }).catch(err => {
            res.status(400).send(err.errors[0].message);
        });
};

exports.findAllWithUser = (req, res) => {
    Event.findAll({ where: { userId: req.params.userId } })
        .then(events => {
            res.send(events);
        }).catch(err => {
            res.status(400).send(err.errors[0].message);
        });
};

// Create new event
exports.create = (req, res) => {
    Event.create({
        eventName: req.body.eventName,
        eventLocation: req.body.eventLocation,
        eventDescription: req.body.eventDescription,
        eventCapacity: req.body.eventCapacity,
        userId: req.body.userId
    }).then(event => {
        res.status(201).send(event);
    }).catch(err => {
        if(err.name === "SequelizeForeignKeyConstraintError") {
            res.status(400).send("Event creator does not exist");
        }
        res.status(400).send(err);
    });
};



// Find a User by Id
exports.findById = (req, res) => {
    // User.findOne({ where: { id: req.params.userId } }, {
    //     attributes: {
    //         exclude: ['password']
    //     }
    // })
    //     .then(user => {
    //         if (!user) {
    //             res.status(404).send('User not found');
    //         } else {
    //             res.status(200).send(user);
    //         }
    //     }).catch(err => {
    //         res.status(400).send(err);
    //     });
};

// Update User info
exports.update = (req, res) => {
    // const id = req.params.customerId;
    // User.update(
    //     { firstname: req.body.firstname, lastname: req.body.lastname, age: req.body.age },
    //     { where: { id: req.params.customerId } }
    // ).then(() => {
    //     res.status(200).send("Updated successfully a user with id = " + id);
    // });
};

// Delete a User by Id
exports.delete = (req, res) => {
    // const id = req.params.customerId;
    // User.destroy({
    //     where: { id: id }
    // }).then(() => {
    //     res.status(200).send('deleted successfully a User with id = ' + id);
    // });
};