const db = require('../server.js')
const controller = require('./controller')

const handleUserChoice= {
    /**
     * Takes a copy of state and augment's it to reflect gameState POST switching. Then the method uses our controller to sync the game
     * state with the newly augmented state.
     * 
     * 
     * @param {Object} state ~ Game state object
     * @param {Object} newMon ~ Pokemon object
     * @param {string} dbRef ~ Firestore document reference
     * @param {string} userID ~ User session reference
     */
    switch: async (state,newMon,dbRef,userID)=>{
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

    attack: (state,move,dbRef,userID)=>{

    },

    test: (phrase) => {
        console.log(db)
    }
}

module.exports = handleUserChoice