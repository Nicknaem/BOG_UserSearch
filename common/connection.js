class Connection{
    static set(db){
        this._db = db;
    } 
    static get(){
        return this._db;
    }
}

module.exports = Connection;