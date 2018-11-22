"use strict";

/* Firebase Setting */
var admin = require("firebase-admin");
var serviceAccount = require("../ezmeetup-8cd2b-firebase-adminsdk-xy1bc-f57d58dfc5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ezmeetup-8cd2b.firebaseio.com"
});

module.exports = admin;
