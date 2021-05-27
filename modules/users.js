var Connection = require('../common/connection.js')  //$$? can I set require path root 

class Users {
    static async search(params){
        //query by name or surname
        console.log(params);
        const queryDb = { 
            $and:[
                {name: {$regex: params.name}},
                {surname: {$regex: params.surname}}
            ] 
        }
        const searchCursor = await Connection.get().collection('users').find(queryDb);
        const foundUsers = await searchCursor.toArray();
        return foundUsers;
    }
    static async insert(params){
        let insertCursor = await Connection.get().collection('users').insertOne({name: params.name, surname: params.surname});
        console.log('inserted: '+insertCursor.insertedCount);
        return insertCursor.insertedCount;
    }
}

module.exports = Users;