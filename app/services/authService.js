const userModel = require('../models/user')
const hashService = require('./hashPassword')
const userRoles = require('../models/user/userRoles')
exports.login = async (email , plainPassword) =>{
    const user = await userModel.findByEmail(email);    
    if (!user){
        return false
    }

    const {password} = user;
    
    const comparePassword = hashService.comparePassword(plainPassword , password)
    if(comparePassword){
        return user
    }
        return false
    
}

exports.register = async (email , password) =>{
    const insertId = await userModel.create({
        full_name : 'کاربر ناشناس',
        email,
        password,
        role: userRoles.roles().USER
    })
    return insertId

    
}