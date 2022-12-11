const firebase = require("firebase/compat/app");
require("firebase/compat/auth");
require("firebase/compat/database");

require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAuth = firebaseApp.auth();
const firebaseDB = firebaseApp.database();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();

module.exports = firebaseDB;
