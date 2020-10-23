const adminRouter = require('./admin')
const authRouter = require('./auth')
const frontRouter = require('./front')
const authMiddleware = require('../middleware/auth')
const adminMiddleware = require('../middleware/admin')
const guestMiddleware = require('../middleware/guest')
const authController = require('../controllers/auth/authController')
module.exports = app =>{
    app.use('/',frontRouter)
    app.use('/admin' ,[authMiddleware,adminMiddleware], adminRouter)
    app.use('/auth' ,guestMiddleware, authRouter)
    app.get('/logout' , authController.logout)
}