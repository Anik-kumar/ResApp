const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const ejs = require('ejs');

// const Item = require('./models/item');

const app = express();

mongoose.connect('mongodb://localhost:27017/restaurant', { useNewUrlParser: true } )
  .then(() => {
    console.log('Node=> MongoDB Is Connected');
  })
  .catch((err) => {
    console.error("Node=> Error Connecting Server => " + err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('views-engine', 'ejs');
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, UPDATE, PATCH, OPTIONS');
// });



app.get('/food/items', (req, res, next)=>{
  Item.find()
    .then(documents => {
      res.status(200).json({
        message: "Data is Retrived",
        items: documents
      });
    });

});


// node route
app.get('/food/add', (req, res) => {
  // res.end('Hello');
  res.render("addItem.ejs");
});



module.exports = app;
