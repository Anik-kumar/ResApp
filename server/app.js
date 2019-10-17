const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Joi = require('joi');
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

  const joiItem = Joi.object().keys({
    id: any(),
    name: Joi.string().trim().min(3).max(15).required(),
    type: Joi.string().trim().min(3).max(15).required(),
    quantity : Joi.string().trim().min(3).max(15).required(),
    price : Joi.number().trim().greater(0).max(15).required(),
    img : Joi.string().trim().min(7).required()
  });

  Joi.validate(req.body, joiItem, (err, result) => {
    if(err) {
      console.error("Joi Validation Error => " + err);

    } else {
      const item = Item({
        name: req.body.name,
        type: req.body.type,
        quantity: req.body.quantity,
        price: req.body.price,
        img: req.body.img
      });

      item.save()
        .then(newItem => {
          console.log("Node => New Item Added to Database");
          res.status(200).json({
            message: "New Item Added to Database",
            id: newItem._id
          });
        });

    }
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

  // console.log("asdf asdfsd =>>> ");

  const schema = Joi.object().keys({
    email : Joi.string().trim().min(6).email().required(),
    firstName: Joi.string().trim().min(3).max(18).required(),
    lastName: Joi.string().trim().min(3).max(18).required(),
    password: Joi.string().trim().min(4).max(20).required(),
    dob: Joi.string().trim().required(),
    id: Joi.any()
  });
  // const schema2 = Joi.object.key
  let isError = false;
  Joi.validate(req.body, schema, (err, result) => {
    if(err) {
      console.log("error error => " + err);
      isError = true;
    }else{

      isError = false;
    }
    // console.log("result => " + result);


    if(!isError){
      const user = User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        dob: req.body.dob
      });
      user.save()
        .then(() => {
          console.log("Node => New User Added");
        })
        .catch(err => {
          console.error("Node => Error adding new user. " + err)
        });
    }



  });

  // console.log(user.dob, user.password, user.email, user.firstName, user.lastName);


});


app.get('/api/get/users', (req, res) => {
  User.find()
    .then(documents => {
      // console.log(" Users are retrived ", documents);
      res.status(200).json({
        message: "Users are retrived",
        users: documents
      })
    });
});



module.exports = app;
