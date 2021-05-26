var Connection = require('../common/connection.js')  //$$? can I set require path root 

class Users {
    static async search(params){
        //query by name or surname
        console.log(params);
        const queryDb = {
            name: { $regex: params.name } 
        }
        const searchCursor = await Connection.get().collection('users').find(queryDb);
        const foundUsers = await searchCursor.toArray();
        return foundUsers;
    }
    static async insert(){

    }
}

module.exports = Users;