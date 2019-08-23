const db = require('../server.js')
const controller = require('./controller')

const handleUserChoice= {
    switch: async function(state,newMon,dbRef,userID){
        state.user1Team.push(state.user1Mon)
        for (let i=0;i<state.user1Team.length;i++){
            if (state.user1Team[i].name === newMon){
                state.user1Mon = state.user1Team[i];
                state.user1Team.splice(i,1);
            }
        }

        controller.syncState(state,dbRef)

        // console.log(state)

        // db.collection('gameRooms').doc(dbRef).set({
        //     state: state
        // })
        // .then(()=>{})
        // .catch(err=>console.log(err))
    },

    attack: function(){

    },

    test: function(phrase){
        console.log(db)
    }
}

module.exports = handleUserChoice