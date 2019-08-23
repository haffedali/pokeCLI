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
      },

      //change name to initState
      initState: function(state){
        let docRef = db.collection('gameRooms').doc();
        let docID = docRef.id
        var returnObj;

        db.collection('gameRooms').doc(docID).set({
            state:state
        })
        .then((res)=>{
            returnObj = {docID, state}
            
        })

        return {docID,state};
      },


      syncState: async function(state,docref){
        db.collection('gameRooms').doc(docref).set({
            state:state
        },{merge:true})
        .catch(err=>console.log(err))

      },

      pullState: async function(docref){
          // Use await to be sure we got the document from firestore written to our variable
          let document = await db.collection('gameRooms').doc(docref).get();
          

          // Returns the result of data() function on the object we got back from firestore
          return document.data();


      }
  }

  module.exports = controller;