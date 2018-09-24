'use strict'

const db = require('../startup/dbconnection');
const User = db.users;

// exports.login = (req, res) => {	
//     User.findOne({ where: {email: req.body.email } })
//         .then(async function (user) {
//             if(!user){
//                 res.status(404).send('Invalid email or password');
//             } else if(!await user.validPassword(user.password)) {
//                 res.status(400).send('Invalid email or password.');
//             } else {
//                 res.status(200).send(user);
//             }
//         }).catch(err => {
//             res.status(400).send(err);
//         });
// };