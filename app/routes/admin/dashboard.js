const express = require('express')
const router = express.Router()
const adminController=require('../../controllers/admin/dashboard')

router.get('/' , adminController.index)

module.exports = router;
