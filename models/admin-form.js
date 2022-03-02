const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminForm = new Schema({
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
    serial: {
        type: Number,
        required: true
    },
    usname:{
        type: String,
        required: true
    },
    cname:{
        type: String,
        required: true
    },
    udesi: {
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    udistrict: {
        type: String,
        required: true
    },
    amt: String,
    validity: String
});

module.exports = mongoose.model('Adminform',adminForm)