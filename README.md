# [Ezmeetup - Node.js](https://github.com/ywpark1/Ezmeetup-Node)

This is Ezmeetup project repository for PRJ666 course at Seneca college.

[Download Android apk](https://github.com/sina-kamali/EZMeetUp/blob/master/apk/app-debug.apk?raw=true)

[React Native repository](https://github.com/sina-kamali/EZMeetUp)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

Also, all instructions are for Linux and MacOS. There is not much difference for Windows.

### Prerequisites

Latest nodejs should be installed on your local machine(v8.12.0 LTS or higher). To check if you have installed nodejs, run the following commands :

```bash
node -v
npm -v
```

Also, git and MySQL should be installed on the computer.

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

## Deployment

Change the DB settings under config directory. It is needed for security purpose.
You need three configurations : database password, jwt key, and verify password.
You can run the following commands in UNIX-based system.

```
export DEV_EZMEETUP_PW="YOUR_DATABASE_PASSWORD"
export ezmeetup_jwtPrivateKey="YOUR_JWT_PRIVATE_key"
export ezmeetup_verifyPass="YOUR_VERIFY_PASSWORD"
```

### File Structure

- Model - the connection to the MySQL db
- Controller - CRUD functionalities
- Route - Receive request, call controller method, and return the return with status code
- Startup - Initialize all app settings
- Logs - store the logs

### API Links

#### /

- [GET] / - Home page

#### /api/users

- [GET] /api/users - Get all users for Admin
- [POST] /api/users/register - Register the user
- [GET] /api/users/login - Login the user. Get the Token
- [GET] /api/users/verify/:token - Verify token
- [GET] /api/users/:userId - Get One user Info by user ID
- [PUT] /api/users/:userId - Update One user Info by user ID

- [GET] /api/users/:userId/events - Get all events user joined
- [GET] /api/users/:userId/events/details/:eventId - Get one joined event details
- [GET] /api/users/:userId/events/created - Get the list of events current user created
- [PUT] /api/users/:userId/events/edit/:eventId - Update event information if the current user is a event creator
- [POST] /api/users/:userId/events/join/:eventId - Join the event
- [POST] /api/users/:userId/events/leave/:eventId - Leave the event
- [DELETE] /api/users/:userId/events/edit/:eventId - Delete the event if the user is a creator

#### /api/categories

- [GET] /api/categories - Get all categories

#### /api/chats

- [GET] /api/chats/:eventId - Get all chat history by eventId
- [POST] /api/chats/:eventId - Store new message in the event

#### /api/events

- [GET] /api/events - Get all events
- [GET] /api/events/withCategoriesOfUser/:userId - Get all events based on user categories from current date
- [POST] /api/events/create - Create new event with image(optional)
- [GET] /api/events/:eventId - Get one event details
- [GET] /api/events/:eventId/users - Get all users in the event

**Note** : It is updating continuously

## Built With

- [NodeJS](https://nodejs.org/en/) - API Server
- [ExpressJS](https://expressjs.com/) - NodeJS Framework

## Authors

- Yeonwoo Park
- Derrick Leung (Group Leader)
- Sina Kamali
