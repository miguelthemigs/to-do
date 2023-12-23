const client = require("./databasepg.js");
const express = require("express");
const app = express();
const cors = require('cors'); // Import the 'cors' middleware

// Use 'cors' middleware to enable CORS
app.use(cors());

app.listen(3300, ()=> {
  console.log("Server is now listening at port 3300");
})

client.connect();

// this shows the json in the api
app.get('/notes', (req, res)=>{
  client.query(`SELECT * FROM notes`, (err, result)=>{
      if(!err){
        res.send(result.rows);
      }
  });
  client.end;
})
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // we need this so we can post json

app.post('/notes', (req, res)=> {
  console.log(req.body);
  if (!req.body || !req.body.text) {
    return res.status(400).send('Bad request: Missing text property');
  }
  const item = req.body;
  let insertQuery = `INSERT INTO notes 
                     values('${item.text}')`

  client.query(insertQuery, (err, result)=>{
      if(!err){
          res.send('Insertion was successful')
      }
      else{ console.log(err.message);
      res.status(500).send('Internal server error'); }
  })
  client.end;
})

module.exports = {
  app: app,
  client: client
};