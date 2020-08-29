const express = require('express');
const userCtrl = require('./server/controllers/user');
const { upload } = require('./server/middlewares/fileupload');

const router = express.Router();

router.get('/users', userCtrl.getAllUser);
router.get('/user/:id', userCtrl.getUser);
router.post('/user', upload, userCtrl.createUser);
router.put('/user/:id', upload, userCtrl.updateUser);
router.delete('/user/:id', userCtrl.deleteUser);

router.put('/uploadImage/:id', upload, userCtrl.uploadImage);

module.exports = router;




