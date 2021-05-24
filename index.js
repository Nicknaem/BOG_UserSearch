//================================== Express server
const express = require('express')
const app = express()
const port = 3000
//--------------------------------------------------------
app.use(express.json()); //middleware where all coming requests will be converted to json for server

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/users', (req,res)=>{
    var queryParams = req.query;
    console.log(`came here to search users with name: ${queryParams.name}`);
//----------------------------------- try 3
// $text $seatch or $regex
    db.collection('users').find({ name: { $regex: queryParams.name } }).toArray((err, items)=>{ 
      console.log(items);
      console.log(typeof(items));
      res.json(items);
    });
//----------------------------------- try 2
    //send back the searched results
    // let data = searchUser(queryParams.name);
    // console.log(data)
    // console.log(typeof(data));
    // res.json(data);
//----------------------------------- try 1
    //res.send(searchUser(queryParams.name));
})

app.listen(port, () => {
  console.log(`Server started on port: ${port}`)
})
//================================== MongoDb native driver
const MongoClient = require('mongodb').MongoClient;
const url = ('mongodb://localhost:27017');
const DatabaseName = 'chatDB'
//--------------------------------------------------------

const client = new MongoClient(url , { useUnifiedTopology: true });

client.connect((err)=>{ 
  db = client.db(DatabaseName); //FIX "const db" was stupid thing, because db was block-scoped
  console.log("connected to database");
  // client.close(); closes connection before other async functions execute
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


