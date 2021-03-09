//inernModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({

      name:{
        type: String,
        required: true
      },
      price:{
        type: String,
        required: true
      },
      image:{
        type: String,
        required: true,
        default:"https://res.cloudinary.com/zeeson-info-tech-and-innovations/image/upload/v1605744370/user1_fp1fwm.png"
      }
})

module.exports = mongoose.model('item', itemSchema)
