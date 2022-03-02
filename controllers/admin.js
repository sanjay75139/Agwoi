const Form = require('../models/auth')
const User = require('../models/user')
const Adminform = require('../models/admin-form')
const Event = require('../models/event')

const fileHelper = require('../util/file')

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'infoagwoi@gmail.com',
        pass: 'Agwoi@2022'
    }
})

exports.getLogin = (req,res,next)=>{
    res.render('auth/login')
}

exports.postLogin = (req,res,next)=>{
    const name = req.body.username;
    const pass = req.body.password;

//     const auth = new Form({
//         username: name,
//         password: pass
//     })
//     auth.save()
//         .then(()=>{
//             res.render('admin/dashboard')
//         })
//         .catch(err=>console.log(err))
    Form.findOne({username:name, password:pass})
        .then(user=>{
            if(!user){
                console.log("user not found")
                return res.status(422).redirect('/admin/login')
                
            }
            console.log("Done")
            req.session.isLoggedIn = true
            res.redirect('/admin/dashboard')
        })
}

exports.postLogout = (req,res,next)=>{
    // req.session.isLoggedIn = null
    // res.redirect('/admin/login')
    req.session.destroy((err)=>{
        console.log(err)
        res.redirect('/')
    })
}


//Admin Pages
exports.dashboard = (req,res,next)=>{
    res.render('admin/dashboard')
}

exports.forms = (req,res,next)=>{
    const id = req.params.formId;
    console.log(id)
    User.findById(id)
        .then(user=>{
            res.render('admin/forms',{
                user:user
            })
        })
        .catch(err=>{
            console.log(err+"Id not found");
        })
}

exports.index = (req,res,next)=>{
    Adminform.find()
        .then(form=>{
            res.render('admin/index',{
                form:form
            })
        })
        .catch(err=>{
            console.log("Something went wrong")
        })
}

exports.tables = (req,res,next)=>{
    User.find()
        .then(user=>{
            res.render('admin/tables',{
                user: user
            })
        })
        .catch(err=>{
            console.log(err+"error")
        })
}

exports.adminForm = (req,res,next)=>{
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
    const image = req.body.imageUrl;

    const serial = req.body.serial;
    const usname = req.body.usname;
    const cname = req.body.cname;
    const udesi = req.body.udesi;
    const state = req.body.state;
    const udistrict = req.body.district;
    const amt = req.body.amt
    const valid = req.body.valid

    const userId = req.body.id
    
    const admin = new Adminform({
        name: name,
        email: email,
        radio: radio,
        imageUrl: image,
        dob:dob,
        num : num,
        address: address,
        district: dist,
        aadhar: aadhar,
        shop: shop,
        shopAd: shopAd,
        desi: desi,
        serial: serial,
        usname: usname,
        cname: cname,
        udesi: udesi,
        state: state,
        udistrict: udistrict,
        amt: amt,
        validity: valid
    })

    admin.save()
        .then((result)=>{
            console.log(result)
            return User.deleteOne({_id: userId})
        })
        .then((result)=>{
            console.log(result)
            console.log("Sucessfully added");
            res.redirect('/admin/tables')
        })
        .catch(err=>{
            console.log(err)
            console.log("Something went wrong")
        })
    // console.log("Success -" + name+"-"+email+"-"+radio+"-"+dob+"-"+num+"-"+address+"-"+aadhar+"-"+dist+"-"+shop+"-"+shopAd+"-"+desi+"-"+image);
    // console.log("Success -" +serial+"-"+usname+"-"+cname+"-"+udesi+"-"+state+"-"+udistrict+"-"+userId)

    // res.redirect('/admin/tables')
}

exports.adForm = (req,res,next)=>{
    const id = req.params.id;
    console.log(id)
    Adminform.findById(id)
        .then(user=>{
            res.render('admin/adForm',{
                user: user
            })
        })
        .catch(err=>{
            console.log(err+"error")
        })
}

exports.save = (req,res,next)=>{
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
    const image = req.body.imageUrl;

    const serial = req.body.serial;
    const usname = req.body.usname;
    const cname = req.body.cname;
    const udesi = req.body.udesi;
    const state = req.body.state;
    const udistrict = req.body.district;
    const amt = req.body.amt
    const valid = req.body.valid

    const userId = req.body.id

    Adminform.findById(userId)
        .then(user=>{
            user.name = name;
            user.email = email;
            user.radio = radio;
            user.dob = dob;
            user.num = num;
            user.address = address;
            user.district = dist;
            user.aadhar = aadhar;
            user.shop = shop;
            user.shopAd = shopAd;
            user.desi = desi;
            user.imageUrl = image;

            user.serial = serial;
            user.usname = usname;
            user.cname = cname;
            user.udesi = udesi;
            user.state = state;
            user.udistrict = udistrict;
            user.amt = amt
            user.validity = valid

            user.save()
                .then(result=>{
                    console.log(result)
                    console.log("Member Update successfull")
                    res.redirect('/admin/index')
                })
            })
            .catch(err=>{
                console.log(err+"error")
            })

    // console.log("Success -" + name+"-"+email+"-"+radio+"-"+dob+"-"+num+"-"+address+"-"+aadhar+"-"+dist+"-"+shop+"-"+shopAd+"-"+desi+"-"+image);
    // console.log("Success -" +serial+"-"+usname+"-"+cname+"-"+udesi+"-"+state+"-"+udistrict+"-"+userId)

    // res.redirect('/admin/index')
}

exports.mail = (req,res,next)=>{
    const id = req.params.id;
    Adminform.findById(id)
        .then(user=>{
            const serial = user.serial;
            const mail = user.email;
            console.log(serial+"-"+mail)

            return transporter.sendMail({
                from: 'no-reply@agwoi.com',
                to: mail,
                subject: 'Serial number!',
                html: `<h1>Your private serial number is ${serial}</h1>`
            })
        })
        .then(()=>{
            res.render('admin/admin');
        })
        .catch(err=>{
            console.log("Mail Didn't sent");
        })
}

exports.delete = (req,res,next)=>{
    const id = req.params.id;
    User.findById({_id: id})
        .then((member)=>{
            fileHelper.deleteFile(member.imageUrl)
            return User.deleteOne({_id: id})
        })
        .then(()=>{
            console.log(id +" - deleted successfully")
            res.redirect("/admin/tables")
        })
        .catch((err)=>{
            console.log(err)
        })
}

exports.ad_delete = (req,res,next)=>{
    const id = req.params.id;
    Adminform.findById({_id: id})
        .then((member)=>{
            fileHelper.deleteFile(member.imageUrl)
            return Adminform.deleteOne({_id: id})
        })
        .then(()=>{
            console.log(id +" - deleted successfully")
            res.redirect("/admin/index")
        })
        .catch((err)=>{
            console.log(err)
        })
}

exports.addEvents = (req,res,next)=>{
    let message = req.flash('error');
    if(message.length>0){
        message = message[0];
    } else{
        message = null;
    }
    res.render('admin/addEvent',{
        info: {
            title: '',
            desc : ''
          },
        errorMessage: message
    })
}

exports.postEvent = (req,res,next)=>{
    const image = req.file
    const title = req.body.title
    const desc = req.body.desc
   

    if(!image){
        console.log("Attached file is not an image")
        return res.status(422).render('admin/addEvent',
          {
          info: {
            title: title,
            desc : desc
          },
          errorMessage: "Attached file is not an image",
        });
    }

    const imageUrl = image.path

    const event = new Event({
        image: imageUrl,
        title: title,
        desc: desc
    })

    event.save()
        .then(result=>{
            console.log(result)
            res.render('admin/success')
        })
        .catch(err=>{
            console.log(err+" - Something went wrong")
        })

    // console.log(image.path+"-"+title+"-"+desc)
}