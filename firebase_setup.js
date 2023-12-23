const firebaseConfig = {
    apiKey: "AIzaSyCZulPboPP-zrKecvC4OCK6gbTJ_5u7o_8",
    authDomain: "ty-project-58719.firebaseapp.com",
    databaseURL: "https://ty-project-58719-default-rtdb.firebaseio.com",
    projectId: "ty-project-58719",
    storageBucket: "ty-project-58719.appspot.com",
    messagingSenderId: "928989582933",
    appId: "1:928989582933:web:46ec5928df658c564b26dc",
    measurementId: "G-D7EKVQJK55"
  };
// Firebaseアプリの初期化
firebase.initializeApp(firebaseConfig);


const provider = new firebase.auth.GoogleAuthProvider();


const storage = firebase.storage().ref();
