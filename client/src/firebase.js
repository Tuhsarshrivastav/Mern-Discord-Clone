import firebase from "firebase";

const firebaseConfig = {
  // here your need to paste your firbase config cdn to this react app
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
