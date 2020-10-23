const userModel = require('../../models/user')
const authService = require('../../services/authService')
const userRoles = require('../../models/user/userRoles')
exports.showLogin = (req,res) =>{
    res.authRender('auth/index')
}

exports.doLogin =async (req,res) =>{
    const {email , password} = req.body;    
    const user = await authService.login(email , password)    
    if(! user){
        req.flash('errors' , 'یوزر یا پسوورد اشتباه است')
        return res.redirect('/auth/login')
    }
    req.session.user = user;
    const pathToRedirect = user.role === userRoles.roles().MANAGER ? '/admin/dashboard' : '/';    
    return res.redirect(pathToRedirect)
}

exports.showRegister = (req,res) =>{
    res.authRender('auth/register')
}

exports.doRegister =async (req,res) =>{
    const {email , password , password_confirm} = req.body;    
    const createUser = await authService.register(email,password)    
    if(createUser){
        return res.redirect('/auth/login')
    }
    req.flash('errors' , 'در حال حاضر امکان ثبت نام وجود ندارد')
    return res.redirect('/auth/register')
}

exports.logout = async (req,res)=>{
    req.session.destroy(error =>{
       res.redirect('/auth/login')
    })
}