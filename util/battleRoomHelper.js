const controller = require('./controller');

const battleRoomHelper={
    pullClientState: async (dbRef,userID) => {
        // let payload = controller.pullState(dbRef)

        // console.log("from battleRoomHelper line 10  "+ payload)
        // return payload

        let test = await controller.pullState(dbRef);

        return test;
    }
}

module.exports = battleRoomHelper;