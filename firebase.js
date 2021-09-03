const firebaseConfig = {
  apiKey: "AIzaSyCxS4S__WrBgWX3YvkJpLNyqyVKpKvTIGE",
  authDomain: "todo-app-b0cec.firebaseapp.com",
  projectId: "todo-app-b0cec",
  storageBucket: "todo-app-b0cec.appspot.com",
  messagingSenderId: "692971226531",
  appId: "1:692971226531:web:63ece95c1b84c63b588616",
  measurementId: "G-K2NN8Z77KE",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();
