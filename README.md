# PRJ666 - Ezmeetup

This is Ezmeetup project repository for PRJ666 course at Seneca college.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

Also, all instructions are for Linux and MacOS. There is not much difference for Windows.

### Prerequisites

Latest nodejs should be installed on your local machine(v8.12.0 LTS or higher). To check if you have installed nodejs, run the following commands :


```bash
node -v
npm -v
```

Also, git should be installed.


### Installing

Create an empty directory, change the directory to new directory, and clone the repo to local machine. For example,

```
mkdir ezmeetup-node
cd ezmeetup-node
git clone https://github.com/ywpark1/Ezmeetup-Node.git
```

And run the following codes :

```
npm install
```

If you see the directory called **node_modules** under the root directory of this repo(i.e. ezmeetup-repo), you installed it correctly.


### File Structure

* Model - the connection to the MySQL db
* Controller - CRUD functionalities
* Route - Receive request, call controller method, and return the return with status code
* Startup - Initialize all app settings
* Logs - store the logs


### API Links

* [POST] /api/users/register - Register the user
* [GET] /api/users/login - Login the user. Get the Token
* [GET] /api/users/:userId - Get One user Info by user ID
* [PUT] /api/users/:userId - Update One user Info by user ID

**Note** : It is updating continuously


## Running the tests

 We will add the test functionality later.


## Deployment

Change the DB settings under config directory.

## Built With

* [NodeJS](https://nodejs.org/en/) - API Server
* [ExpressJS](https://expressjs.com/) - NodeJS Framework
 
## Authors

* Derrick Leung (Group Leader)
* Sina Kamali
* Yeonwoo Park


## TODOs
* apiDoc

* Log Error

* Check all queries before creating the table in DB

* Add user roles to User

* Authenticate User(JWT and Passport)

* Form Validator

* Models :
    * User
    * Event
    * Friend
    * Chat(Takes long time)
	
* Controller :
    * User
    * Event
    * Friend
    * Chat(Takes long time)

* API with requests :
    * User
    * Event
    * Friend
    * Chat(Takes long time)
