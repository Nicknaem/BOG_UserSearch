const Config = {
    mongodb: {
        dbName: 'chatDB',
        dbUrl: 'mongodb://localhost:27017',
        options:{
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    }
}

module.exports = Config;