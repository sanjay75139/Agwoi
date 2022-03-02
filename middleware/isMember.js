const Adminform = require('../models/admin-form')

module.exports = (req,res,next)=>{
    const serial = req.body.serial

    Adminform.findOne({serial:serial})
        .then(isMember=>{
            if(!isMember){
                console.log("Not a member")
                return res.redirect('/');
            }
            next();
        })
        .catch(err=>{
            console.log(err)
            console.log("Something went wrong..")
        })
    }