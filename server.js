//================================== Express server
var path = require("path");
const express = require('express')
const app = express()
const port = 3000

var Connection = require('./common/connection.js')

//=================================== Middleware
app.use(express.json()); //all coming requests will be converted to json for server
app.use(express.static(__dirname + '/app')); //serve static files

//================================== MongoDb connection
const MongoClient = require('mongodb').MongoClient;
const { urlencoded } = require("express");
const url = ('mongodb://localhost:27017');
const DatabaseName = 'chatDB'

MongoClient.connect( url , { useUnifiedTopology: true }, (err,client)=>{
  if(err){
    return console.log(err);
  } 
  Connection.set(client.db(DatabaseName)); //FIX DatabaseName should be in config
  console.log("connected to database");

  app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
  })
})

//=================================== Routes

app.post('/users', (req,res)=>{
    let queryParams = req.body;
//----------------------------------- try 3
// $text $seatch or $regex
    Connection.get().collection('users').find({ name: { $regex: queryParams.name } }).toArray((err, items)=>{ 
      res.json(items);
    });

    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname + '/app/index.html'));
    })
//----------------------------------- try 2
    //send back the searched results
    // let data = searchUser(queryParams.name);
    // console.log(data)
    // console.log(typeof(data));
    // res.json(data);
//----------------------------------- try 1
    //res.send(searchUser(queryParams.name));
})

//=================================== MongoDb functions
function searchUser(query){

//----------------------------------- try 2
    // return db.users.find({name: {'$search':'ni'}}).toArray();  // well it doesnot see users collection

//----------------------------------- try 1 
    // db.collection('users').find({}).toArray((err, items)=>{ //FIX? find() without {} was bugging you out 
    //     return items;
    // });
    
}


