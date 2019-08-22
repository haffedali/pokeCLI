// db config data
var firebaseConfig = {
    apiKey: "AIzaSyBNueBWgUVIZHZTW6Qdutb3hLoKAk8RQ3E",
    authDomain: "pokeschool-720e3.firebaseapp.com",
    databaseURL: "https://pokeschool-720e3.firebaseio.com",
    projectId: "pokeschool-720e3",
    storageBucket: "",
    messagingSenderId: "858353794996",
    appId: "1:858353794996:web:5a6c4fcdcb002ac4"
  }
  
  // Set up db connection
  const firebase = require('firebase')
  const fireApp = firebase.initializeApp(firebaseConfig)
  const db = firebase.firestore()

  const controller = {
      test: function(){
          db.collection('test').doc('megatest').set({
              state:"it worked"
          })
      }
  }

  module.exports = controller;