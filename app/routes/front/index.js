const express = require('express')
const router = express.Router();

//routes
const postsRouter = require('./post')
const homeRouter = require('./home')
const commentRouter = require('./comments')
router.use('/' , homeRouter)
router.use('/' , postsRouter)
router.use('/' , commentRouter)

module.exports = router