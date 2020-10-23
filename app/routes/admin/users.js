const express = require('express')
const router = express.Router()
const userController=require('../../controllers/admin/userController.js')

router.get('/' , userController.index)
router.get('/create' , userController.create)
router.post('/store' , userController.store)
router.get('/delete/:userID' , userController.remove)
router.get('/edit/:userID' , userController.edit)
router.post('/update/:userID' , userController.update)

module.exports = router;