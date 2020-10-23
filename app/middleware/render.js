const userService = require('../services/userService')
const settingModel = require('../models/settings')

module.exports = app =>{

    app.use(async (req,res,next) =>{
        const errors = req.flash('errors')
        const success = req.flash('success')
        const hasError = errors.length > 0 ;
        let user = null;
        if('user' in req.session){
            user = req.session.user;
            user.avatar = userService.gravatar(user.email)
        }
        const title = await settingModel.get('title_blog')
        const permitRegister = await settingModel.get('someone_can_register')
        const permitComment = await settingModel.get('users_can_enter_comments')
        let permitForRegister = true;
        let permitForComment = true;
        if(permitRegister == 0){
            permitForRegister = false
        }

        if(permitComment == 0){
            permitForComment= false
        }

        const content = await settingModel.get('content_blog')
        res.frontRender = (template , options) =>{
            options = {layout : 'front', bodyClass : 'bg-gray' ,permitForComment,title , content, ...options}
            res.render(template , options)
        }
        res.adminRender = (template , options) =>{
            options = {...options, layout : 'admin' , hasError , errors ,title , content, success , user}
            res.render(template , options)
        }
        res.authRender = (template , options) =>{
            options = {...options, layout : 'auth' ,permitForRegister,title , content, hasError , errors , success}
            res.render(template , options)
        }
        
        next();
    }) 

}