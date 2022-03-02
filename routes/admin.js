const express = require('express');
const admin = require('../controllers/admin')
const auth = require('../middleware/auth')
const router = express.Router();

//Login Pages Route
router.get('/login',admin.getLogin);
router.post('/login',admin.postLogin);
router.post('/logout',auth,admin.postLogout);
// router.get('/admin',auth,admin.adminPage);

//Admin Pages Routes
router.get('/dashboard',auth,admin.dashboard);
router.get('/index',auth,admin.index);
router.get('/tables',auth,admin.tables);
router.get('/forms/:formId',auth,admin.forms);
router.post('/adform',admin.adminForm);

router.get('/adForm/:id',auth,admin.adForm);
router.get('/mail/:id',auth,admin.mail);//Mail route

router.get('/addEvents',auth,admin.addEvents);
router.post('/postEvent',admin.postEvent)

router.post('/delete/:id',admin.delete);
router.post('/ad-delete/:id',admin.ad_delete);
router.post('/save',admin.save);

module.exports = router;