const client = require("./databasepg.js");
const express = require("express");
const app = express();
const cors = require('cors');

// Use 'cors' middleware to enable CORS
app.use(cors());

app.listen(3300, ()=> {
  console.log("Server is now listening at port 3300");
})

client.connect();

// GET REQUEST
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

// POST REQUEST
app.post('/notes', (req, res)=> { // this is a callback function. when a post request is done, it calls this function
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

// DELETE REQUEST
app.delete('/notes', (req, res) => {
  const noteTextToDelete = req.body.text; // Unique note text used for deletion
  if (!noteTextToDelete) {
    return res.status(400).send('Bad request: Missing note text for deletion');
  }

  const deleteQuery = `DELETE FROM notes WHERE text = '${noteTextToDelete}'`;

  client.query(deleteQuery, (err, queryResult) => {
    if (!err) {
      res.send('Deletion was successful');
    } else {
      console.log(err.message);
      res.status(500).send('Internal server error');
    }
  });
});


// PUT REQUEST (to edit notes)
app.put('/notes', (req, res) => {
  const oldNoteText = req.body.oldText; // Unique existing note text
  const newNoteText = req.body.newText; // New text for the note

  if (!oldNoteText || !newNoteText) {
    return res.status(400).send('Bad request: Missing existing or new note text');
  }

  const updateQuery = `UPDATE notes SET text = '${newNoteText}' WHERE text = '${oldNoteText}'`;

  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send('Update was successful');
    } else {
      console.log(err.message);
      res.status(500).send('Internal server error');
    }
  });
});


module.exports = {
  app: app,
  client: client
};