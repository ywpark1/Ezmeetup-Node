'use strict'

const db = require('../startup/dbconnection');
const User = db.users;

exports.login = (req, res) => {	
    User.findOne({ where: {email: req.body.email } })
        .then(async function (user) {
            if(!user){
                res.status(404).send('Invalid email or password');
            } else if(!await user.validPassword(req.body.password)) {
                res.status(400).send('Invalid email or password.');
            } else {
                user.update({
                    loginStatus: true
                })
                .then(() => {
                    const token = user.generateAuthToken();
                    res.send(token);
                });
                // res.status(200).send(user);
            }
        })
        .catch(err => {
            res.status(400).send(err);
        });
};

// export.login = (req, res) => {
//     res.status(200).send(req.user);
// }

exports.logout = (req, res) => {	
    User.findOne({ where: {email: req.body.email } })
        .then(user => {
            user.update({
                loginStatus: false
            })
            .then(() => {
                const token = req.header('x-auth-token');
                res.send(token);
            });
            // res.status(200).send(user);
            
        })
        .catch(err => {
            res.status(400).send(err);
        });
};