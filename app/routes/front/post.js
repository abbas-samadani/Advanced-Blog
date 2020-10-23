const express = require('express')
const router = express.Router()
const postController=require('../../controllers/front/post')

router.get('/p/:postSlug' , postController.index)


module.exports = router;