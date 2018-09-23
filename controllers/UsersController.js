// const connection = require('../startup/dbconnection');
const db = require('../startup/dbconnection');
const User = db.users;

// Create new user
exports.create = (req, res) => {
    User.create({ 
        email: "test1@test.ca",
        password: "Password1", 
        firstName: "Firstname 1",
        lastName: "Lastname 1",
        phoneNumber: "123-456-7890"
      }).then(user => {		
          // Send created user to client
          res.status(201).send(user);
      }).catch(err => {
          res.status(400).send(err.errors[0].message);
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
    User.findById(req.params.userId)
        .then(user => {
            if(!user){
                res.status(404).send('User not found');
            } else {
                res.status(200).send(user);
            }
        }).catch(err => {
            res.status(400).send(err);
        });
};

// Update User info
exports.update = (req, res) => {
	const id = req.params.customerId;
	User.update(
        { firstname: req.body.firstname, lastname: req.body.lastname, age: req.body.age },
        { where: {id: req.params.customerId} }
    ).then(() => {
        res.status(200).send("Updated successfully a user with id = " + id);
    });
};
 
// Delete a User by Id
exports.delete = (req, res) => {
	const id = req.params.customerId;
	User.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a User with id = ' + id);
	});
};