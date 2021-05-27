//================================== Express server
var path = require("path");
const express = require('express')
const app = express()
const port = 3000;

var Connection = require('./common/connection.js')
var Config = require('./common/config.js');
var Users = require('./modules/users')

//=================================== Middleware
app.use(express.json());                        //all coming requests will be converted to json for server
app.use(express.static(__dirname + '/app'));    //serve static files

//================================== MongoDb connection
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect( Config.mongodb.dbUrl , Config.mongodb.options, (err,client)=>{
  if(err){
    return console.log(err);
  } 
  Connection.set(client.db(Config.mongodb.dbName));
  console.log("connected to database");

  app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
  })
})

//=================================== Routes

app.post('/users', (req,res)=>{
    Users.search(req.body).then((result)=>{
      res.json(result);  
    });
});

app.post('/add/user', (req,res)=>{
    Users.insert(req.body).then((result)=>{
      res.json(result);  
    });
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/app/index.html'));
})



