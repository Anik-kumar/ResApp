const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Joi = require('joi');
const expSession = require('express-session');
const mongodbSession = require('connect-mongodb-session')(expSession);
const validator = require('express-validator');
const http = require('http');
const Cookies = require('cookies');
const nodeCookie = require('node-cookie');
const cookieParser = require('cookie-parser');
// const ejs = require('ejs');

const Item = require('./models/item');
const User = require('./models/user');
const UserRouter = require('./routes/UserRouter');
const ItemRouter = require('./routes/ItemRouter');
const AuthRouter = require('./routes/AuthRouter');
const app = express();

const store = new mongodbSession({
  uri: 'mongodb://localhost:27017/restaurant',
  collections: 'sessions'
});

mongoose.connect('mongodb://localhost:27017/restaurant', { useNewUrlParser: true, useUnifiedTopology: true }  )
  .then(() => {
    console.log('Node=> MongoDB Is Connected');
  })
  .catch((err) => {
    console.error("Node=> Error Connecting Server => " + err);
  });


// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(
  expSession({ secret: 'randomstring', saveUninitialized: false, resave: false})
  );
// app.set('views-engine', 'ejs');
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, UPDATE, PATCH, OPTIONS');
  next();
});



// Route Middlewares
app.use('/api/user', UserRouter);
app.use('/api/item', ItemRouter);
app.use('/api/auth', AuthRouter);


/*app.get('/api/item/foods', (req, res, next)=>{
  Item.find()
    .then(documents => {
      res.status(201).json({
        message: "Data is Retrived",
        items: documents
      });
    });

});


app.post('/api/item/add', (req, res) => {
  // res.end('Hello');
  // res.render("addItem.ejs");
  // console.log("A");

  const joiItem = Joi.object().keys({
    id: Joi.any(),
    name: Joi.string().trim().min(3).max(15).required(),
    type: Joi.string().trim().min(3).max(15).required(),
    quantity : Joi.string().trim().min(3).max(15).required(),
    price : Joi.number().greater(0).min(15).required(),
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

app.delete('/api/item/delete/:id', (req, res) => {
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
    _id: Joi.any()
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


});*/


/* app.get('/api/get/users', (req, res) => {
  User.find()
    .then(documents => {
      // console.log(" Users are retrived ", documents);
      res.status(200).json({
        message: "Users are retrived",
        users: documents
      })
    });
}); */


app.get('/home', (req, res) => {
  var cookies = Cookies(req, res);

  // nodeCookie.create(res, "admin", "data data", "veryverylongsecret");

  // var userId = 2;

  // cookies.set('userID', 2);

  // console.log(nodeCookie.get(res, 'admin'));

  let options = {
    maxAge: 1000 * 60 * 60 * 2,
    httpOnly: true,
    signed: true
  };

  res.cookie('Admin', 'Admin cookie data', options);

  console.log(req.cookies);

});



module.exports = app;
