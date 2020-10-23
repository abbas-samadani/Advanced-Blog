const express = require('express')
const router = express.Router();

//routes
const dashboardRouter = require('../admin/dashboard')
const postRouter = require('../admin/posts')
const commentRouter = require('./comments')
const userRouter = require('./users')
const settingRouter = require('./settings')

router.use('/dashboard' , dashboardRouter)
router.use('/posts' , postRouter)
router.use('/comments' , commentRouter)
router.use('/users' , userRouter)
router.use('/settings' , settingRouter)

module.exports = router
