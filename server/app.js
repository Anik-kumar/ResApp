const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const ejs = require('ejs');

const Item = require('./models/item');
const User = require('./models/user');
const app = express();

mongoose.connect('mongodb://localhost:27017/restaurant', { useNewUrlParser: true, useUnifiedTopology: true }  )
  .then(() => {
    console.log('Node=> MongoDB Is Connected');
  })
  .catch((err) => {
    console.error("Node=> Error Connecting Server => " + err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.set('views-engine', 'ejs');
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, UPDATE, PATCH, OPTIONS');
  next();
});



app.get('/api/food/items', (req, res, next)=>{
  Item.find()
    .then(documents => {
      res.status(201).json({
        message: "Data is Retrived",
        items: documents
      });
    });

});


app.post('/api/add/item', (req, res) => {
  // res.end('Hello');
  // res.render("addItem.ejs");
  // console.log("A");

  const item = Item({
    name: req.body.name,
    type: req.body.type,
    quantity: req.body.quantity,
    price: req.body.price,
    img: req.body.img
  });
  item.save()
    .then(newItem => {
      console.log("New Item Added to Database");
      res.status(200).json({
        message: "New Item Added to Database",
        id: newItem._id
      });
    });

});

app.delete('/api/delete/item/:id', (req, res) => {
  console.log(req.params.id);

  Item.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log('Node => Item is Deleted')
    })
    .catch((err) => {
      console.error('Node => Item Delete Error -> ' + err);
    });

});

app.post('/api/reg/user', (req, res) => {
  const user = User({
    firstName: req.params.firstName,
    lastName: req.params.lastName,
    email: req.params.email,
    pass: req.params.pass,
    dob: req.params.dob
  });
  console.log(user);

  user.save()
    .then(() => {
      console.log("Node => New User Added");
    })
    .catch(err => {
      console.error("Node => Error adding new user. " + err)
    });
});



module.exports = app;
