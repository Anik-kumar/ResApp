const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: String, required: true },
  img: { type: String, required: true }
});

const itemModel = mongoose.model('item', itemSchema);

module.exports = itemModel;
