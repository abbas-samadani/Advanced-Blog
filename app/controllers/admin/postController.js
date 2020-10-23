const path = require('path')
const dataService = require('../../services/dataService')
const postModel = require('../../models/posts')
const userModel = require('../../models/user/index')
const postValidator = require('../../validation/postValidator')
const { v4: uuidv4 } = require('uuid');
//const sessionController = require('../../controllers/session/controller')
const {statuses} = require('../../models/posts/postStatus')


exports.index=async (req,res)=>{    
    const findAll = await postModel.findAll();  
    console.log(findAll.length)     
    const toPersian = findAll.map(data =>{    
         
       data.create_ad_persian = dataService.toPersian(data.create_at);
       data.updated_ad_persian = dataService.toPersian(data.updated_at);             
       return data
    })

    res.adminRender('admin/posts/index' , { findAll : toPersian})
}

exports.create = async (req,res) =>{
    errors = req.session.errors;
    const dataUser = await userModel.findAll(['id' , 'full_name']);
    res.adminRender('admin/posts/create' , { dataUser}) 
}

exports.store = async (req,res) =>{
    
    const fileExt = req.files.thumbnail.name.split('.')[1];
    const newFileName = `${uuidv4()}.${fileExt}`;
    
    postData = {
        title : req.body.title,
        author_id : req.body.author,
        slug : req.body.slug,
        content : req.body.content,        
        status: req.body.status,
        thumbnail: newFileName
    }
    const errors = await postValidator.create(postData)
    
    if(errors.length >0){   
        req.flash('errors' , errors)         
        res.redirect('/admin/posts/create')
    } else {
        const insertId = await postModel.create(postData)
        console.log(insertId)
        console.log(req.files.thumbnail)
        if(insertId){
            
            if(req.files.thumbnail) {
                const fileNewPath = `${path.join(__dirname , '../../../public/upload/thumbnails/')}${newFileName}`;      
                console.log(fileNewPath)          
                req.files.thumbnail.mv(fileNewPath, err =>{
                    console.log(err)
                })
                
            }
            req.flash('success' , 'پست با موفقیت ثبت شد')
            res.redirect('/admin/posts')
        }        
    } 
}

exports.remove = async (req,res) =>{
    const postID = req.params.postID;
    if(parseInt(postID) === 0){
        res.redirect('/admin/posts')
    }
    const result = await postModel.delete(postID)
    res.redirect('/admin/posts')
}

exports.edit = async (req,res) =>{
    const postID = req.params.postID;
    if(parseInt(postID) === 0){
        res.redirect('/admin/posts')
    }
    const post = await postModel.find(postID)
    const dataUser = await userModel.findAll(['id' , 'full_name']);    
    res.adminRender('admin/posts/edit' , {layout : 'admin' , dataUser , post ,statuses, helpers : {
        isPostAuthor : function(userID,options){
            return post.author_id === userID ? options.fn(this) : options.inverse(this)
        },
        isSelectedStatus : function(status,options){
            return post.status === status ? options.fn(this) : options.inverse(this)
        }
    }})
}

exports.update = async (req,res) =>{
    const postID = req.params.postID;
    if(parseInt(postID) === 0){
        res.redirect('/admin/posts')
    }
    postData = {
        title : req.body.title,
        author_id : req.body.author,
        slug : req.body.slug,
        content : req.body.content,        
        status: req.body.status
    }
    const updatePost = await postModel.update(postID , postData)
    res.redirect('/admin/posts')
    
}