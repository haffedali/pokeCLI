// // db config data
// var firebaseConfig = {
//     apiKey: "AIzaSyBNueBWgUVIZHZTW6Qdutb3hLoKAk8RQ3E",
//     authDomain: "pokeschool-720e3.firebaseapp.com",
//     databaseURL: "https://pokeschool-720e3.firebaseio.com",
//     projectId: "pokeschool-720e3",
//     storageBucket: "",
//     messagingSenderId: "858353794996",
//     appId: "1:858353794996:web:5a6c4fcdcb002ac4"
//   }
  
//   // Set up db connection
//   const firebase = require('firebase')
//   const fireApp = firebase.initializeApp(firebaseConfig)
//   const db = firebase.firestore()

const controller = require('../util/controller')

module.exports = class BattleRoom{
    constructor(teamA,teamB) {
        // this.state = {
        //     user1Mon: teamA.team['first'],
        //     user2Mon: teamB.team['first'],//them
        //     user1Team: [teamA.team['second'],teamA.team['third']],
        //     user2Team: [teamB.team['second'],teamB.team['third']],
        //     turnNum: 0,
        //     active: teamA.active
        // }

        this.user1Mon = Object.assign({},teamA.team['first'])
        this.user2Mon = Object.assign({},teamB.team['first'])
        this.user1Team = [Object.assign({},teamA.team['first']),Object.assign({},teamA.team['second']),Object.assign({},teamA.team['third'])]
        this.user2Team = [Object.assign({},teamB.team['first']),Object.assign({},teamB.team['second']),Object.assign({},teamB.team['third'])]        // this.user1Mon = Object.assign({},)
        this.turnNum = 0
    }


    /**
     * Creates a fireStore friendly object to be saved in the db and returns the
     * docref-ID provided by creating an unamed doc back to the server to be saved
     * in the user's express session
     * 
     */
    async initialize(){
        let fireState = Object.assign({},this);
        let payload = controller.initState(fireState);
        return payload
    }



    /**
     * 
     */
    async sync(){

    }

    test(){
        controller.test();
    }
}