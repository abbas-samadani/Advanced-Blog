
const dataService = require('../../services/dataService')
const userModel = require('../../models/user')
const userValidator = require('../../validation/userValidator')
//const sessionController = require('../../controllers/session/controller')
const {roles} = require('../../models/user/userRoles')

exports.index=async (req,res)=>{    
    const findAll = await userModel.findAll();    
    const toPersian = findAll.map(data =>{       
       data.create_ad_persian = dataService.toPersian(data.create_at);            
       return data
    })
    res.adminRender('admin/users/index' , {layout : 'admin' , findAll : toPersian})
}

exports.create = async (req,res) =>{
    errors = req.session.errors;
    const dataUser = await userModel.findAll(['id' , 'full_name']);
    if(errors) {
        res.adminRender('admin/users/create' , {layout : 'admin' , dataUser , errors , hasError : errors.length > 0})        
    } else {
        res.adminRender('admin/users/create' , {layout : 'admin' , dataUser })
    }
    delete req.session.errors;
}

exports.store = async (req,res) =>{
    
    userData = {
        full_name : req.body.name,
        email : req.body.email,
        password : req.body.password,     
        role: req.body.role
    }
    console.log(userData)
    const errors = await userValidator.create(userData)
    if(errors.length >0){    
        req.session.errors = errors;
        res.redirect('/admin/users/create')
    } else {
        const insertId = await userModel.create(userData)
        if(insertId){
            res.redirect('/admin/users')
        }
        
    } 
}

exports.remove = async (req,res) =>{
    const userID = req.params.userID;
    if(parseInt(userID) === 0){
        res.redirect('/admin/users')
    }
    const result = await userModel.delete(userID)
    res.redirect('/admin/users')
}

exports.edit = async (req,res) =>{
    const userID = req.params.userID;
    if(parseInt(userID) === 0){
        res.redirect('/admin/users')
    }
    const user = await userModel.find(userID)
    const dataUser = await userModel.findAll(['id' , 'full_name']);    
    res.adminRender('admin/users/edit' , {layout : 'admin' , dataUser , user, roles , helpers : {
        isuserAuthor : function(userID,options){
            return user.author_id === userID ? options.fn(this) : options.inverse(this)
        },
        isSelectedRole : function(role,options){
            return user.role === role ? options.fn(this) : options.inverse(this)
        }
    }})
}

exports.update = async (req,res) =>{
    const userID = req.params.userID;
    if(parseInt(userID) === 0){
        res.redirect('/admin/users')
    }
    userData = {
        full_name : req.body.name,
        email : req.body.email,
        password : req.body.password,     
        role: req.body.role
    }
    console.log(userData)
    const updateuser = await userModel.update(userID , userData)
    res.redirect('/admin/users')
    
}