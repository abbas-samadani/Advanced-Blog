const express = require('express')
const router = express.Router()
const postController=require('../../controllers/admin/postController')

router.get('/' , postController.index)
router.get('/create' , postController.create)
router.post('/store' , postController.store)
router.get('/delete/:postID' , postController.remove)
router.get('/edit/:postID' , postController.edit)
router.post('/update/:postID' , postController.update)

module.exports = router;