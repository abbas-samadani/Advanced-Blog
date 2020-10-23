const express = require('express')
const router = express.Router()
const commentController=require('../../controllers/front/comments')


router.post('/p/:postSlug/comment' , commentController.store)

module.exports = router;


