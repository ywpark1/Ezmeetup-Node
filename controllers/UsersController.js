// const connection = require('../startup/dbconnection');
const _ = require('lodash');
// const jwt = require('jsonwebtoken');
const db = require('../startup/dbconnection');
// const config = require('config');
const User = db.users;
const UserActivity = db.useractivities;

// Create new user
exports.create = (req, res) => {
    // UserActivity.create({
    //     user: {
    //         email: req.body.email,
    //         password: req.body.password,
    //         firstName: req.body.firstName,
    //         lastName: req.body.lastName,
    //         phoneNumber: req.body.phoneNumber,
    //         isAdmin: true
    //     }
    // }, { include: [ User ] })
    // .then(user => {
    //     res.status(201).send(user);
    // }).catch(err => {
    //     res.status(400).send(err);
    // });

    User.create({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        isAdmin: false
    }).then(user => {

        res.status(201).send(user);
    }).catch(err => {
        res.status(400).send(err);
    });
};

// Display list of all Users.
exports.findAll = (req, res) => {
    User.findAll()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(400).send(err.errors[0].message);
        });
};

// Find a User by Id
exports.findById = (req, res) => {
    User.findOne({ where: { id: req.params.userId } }, {
        attributes: {
            exclude: ['password']
        }
    })
        .then(user => {
            if (!user) {
                res.status(404).send('User not found');
            } else {
                res.status(200).send(user);
            }
        }).catch(err => {
            res.status(400).send(err);
        });
};

// Update User info

/** 
 * TODOs
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
            })
        })
        .then(user => {
            if (!user) {
                res.status(404).send('User not found');
            } else {
                res.status(200).send(user);
                // res.status(200).send("Updated successfully a user with id = " + id);
            }
        }).catch(err => {
            res.status(400).send(err);
        });
            
};

// Delete a User by Id
exports.delete = (req, res) => {
    const id = req.params.userId;
    User.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).send('deleted successfully a User with id = ' + id);
    });
};

// Login method
exports.login = (req, res, next) => {

    const token = req.user.generateAuthToken();

    res.header('x-auth-token', token).status(200).send(_.pick(req.user, ['id', 'email', 'loginStatus']));
    // res.status(200).send(req.user);

    // req.user.update({
    //     loginStatus: true
    // });

    return next();
}