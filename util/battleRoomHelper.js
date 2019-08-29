const controller = require('./controller');

const battleRoomHelper={
    pullClientState: async (dbRef,userID) => {
        // let payload = controller.pullState(dbRef)

        // console.log("from battleRoomHelper line 10  "+ payload)
        // return payload

        let state = await controller.pullState(dbRef);

        //returns as {state:state}
        return state;
    }
}

module.exports = battleRoomHelper;