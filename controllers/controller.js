const {validationResult} = require('express-validator')
const Form = require('../models/user')
const Event = require('../models/event')
const Adminform = require('../models/admin-form')


//=========================================//


exports.getIndex = (req,res,next)=>{
    res.render('index')
}

exports.contact = (req,res,next)=>{
    res.render('contact')
}

exports.about = (req,res,next)=>{
    res.render('about')
}

exports.event = (req,res,next)=>{
    Event.find()
        .then(result=>{
            res.render('pricing',{
                events: result
            })
        })
        .catch(err=>{
            console.log(err)
        })
}

exports.blog = (req,res,next)=>{
    res.render('blog')
}

exports.apply = (req,res,next)=>{
    let message = req.flash('error');
    if(message.length>0){
        message = message[0];
    } else{
        message = null;
    }
    res.render('apply',{
        errorMessage: message,
        info: {
            name: '',
            email: '',
            num : '',
            address: '',
            dist: '',
            aadhar: '',
            shop: '',
            desi: '',
            shopAd: ''
          },
        validationErrors: []
    })
}

exports.viewMembers = (req,res,next)=>{
    Adminform.find()
        .then(form=>{
            res.render('viewMembers',{
                form:form
            })
        })
        .catch(err=>{
            console.log("Something went wrong")
        })
}

exports.postSubmit = (req,res,next)=>{

    const name = req.body.name;
    const email = req.body.email;
    const radio = req.body.radio;
    const dob = req.body.date;
    const num = req.body.num;
    const address = req.body.address;
    const dist = req.body.dist;
    const aadhar = req.body.aadhar;
    const shop = req.body.shop;
    const shopAd = req.body.shopAd;
    const desi = req.body.desi;
    const image = req.file;

    const errors = validationResult(req)

    if(!image){
        console.log("Attached file is not an image")
        return res.status(422).render('apply',
          {
          info: {
            name: name,
            email: email,
            num : num,
            address: address,
            dist: dist,
            aadhar: aadhar,
            shop: shop,
            desi: desi,
            shopAd: shopAd
          },
          errorMessage: "Attached file is not an image",
          validationErrors: errors.array()
        });
    }
    // const errors = validationResult(req)

    if(!errors.isEmpty()){
        console.log("Something went wrong")
        return res.status(422).render('apply',
          {pageTitle:'Apply',
          info: {
            name: name,
            email: email,
            num : num,
            address: address,
            dist: dist,
            aadhar: aadhar,
            shop: shop,
            desi: desi,
            shopAd: shopAd
          },
          errorMessage: errors.array()[0].msg,
          validationErrors: errors.array()
        });
    }
    const imageUrl = image.path;
    
    const form = new Form({
        name: name,
        email: email,
        radio: radio,
        imageUrl: imageUrl,
        dob:dob,
        num : num,
        address: address,
        district: dist,
        aadhar: aadhar,
        shop: shop,
        shopAd: shopAd,
        desi: desi,
        amt : "unpaid"
    })


    form.save()
        .then(result=>{
            console.log(result)
            console.log("Table created and Form added successfully");
            res.render('payment/payment',{
                id:result._id
            });
        })
        .catch(err=>{
            console.log(err)
        })
    // console.log(dist)
    // console.log("Success -" + name+"-"+email+"-"+radio+"-"+dob+"-"+num+"-"+address+"-"+aadhar+"-"+dist+"-"+shop+"-"+shopAd+"-"+desi+"-"+imageUrl);
    // res.redirect('/')
}

exports.success = (req,res,next)=>{
    res.render('payment/success');
}