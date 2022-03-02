const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userForm = new Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    radio:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
      },
    dob: {
        type: String,
        required: true
    },
    num:{
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    district:{
        type: String,
        required: true
    },
    aadhar:{
        type: Number,
        required: true
    },
    shop: {
        type: String,
        required: true
    },
    shopAd:{
        type: String,
        required: true
    },
    desi: {
        type: String,
        required: true
    },
    amt:{
        type:String
    }
});

module.exports = mongoose.model('Form',userForm)