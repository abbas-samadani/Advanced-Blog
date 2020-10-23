const express = require('express')
const router = express.Router()
const settingController=require('../../controllers/admin/settingController.js')

router.get('/' , settingController.index)
router.post('/store' , settingController.store)

module.exports = router;