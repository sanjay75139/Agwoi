const express = require('express');
const client = require('../controllers/controller')

// const isPayment = require('../middleware/payment')

const isMember = require('../middleware/isMember')
const {body, check} = require('express-validator') //Use to validate user input
const router = express.Router();

router.get('/',client.getIndex);
// router.post('/send',client.postSend)
router.get('/contact',client.contact);
// router.get('/blog',client.blog);
router.get('/event',client.event);
router.get('/apply',client.apply);
router.get('/about',client.about);
router.get('/success',client.success);

router.post('/postSubmit',[
    body('name','Your name has atleast 3char')
        .isString()
        .isLength({min:3})
        .trim(),
    // body('date')
    //     .withMessage('Please enter a valid dob number')
    //     .custom((value,{req})=>{
    //         const date = new Date().getFullYear()
    //         if(value.toString().split("-", 1) <= date){
    //             throw new Error('Password confirmation is incorrect');
    //         }
    //     // return true
    //     }),
    body('num','Please enter a valid mob number')
        .isLength({min:10,max:10}),
    check('email')
        .isEmail()
        .trim()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),
    body('aadhar','Please enter a valid aadhar number')
        .isLength({ min: 12,max:12 })
    ],client.postSubmit);

router.post('/members',isMember,client.viewMembers)

module.exports = router;