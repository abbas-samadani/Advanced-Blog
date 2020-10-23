
const dataService = require('../../services/dataService')
const commentsModel = require('../../models/comments/index')
const userService = require('../../services/userService')
const comStatus = require('../../models/comments/commentStatus')

exports.index=async (req,res)=>{    
    const comments = await commentsModel.findAll();
    const presentedComments = comments.map(data =>{       
        
       data.create_ad_persian = dataService.toPersian(data.create_at);
       data.gravatar = userService.gravatar(data.user_email , {s: '60'}) 
                  
       return data
    })   
    console.log(presentedComments)
   
    res.adminRender('admin/comments/comments' , {layout : 'admin' , comments : presentedComments})
}

exports.approve = async (req,res)=>{
    const commentID = req.params.commentID
    const result = await commentsModel.approve(commentID)   
    console.log(result)     
    return res.redirect('/admin/comments')
}

exports.reject = async (req,res)=>{
    const commentID = req.params.commentID
    const result = await commentsModel.reject(commentID)
    return res.redirect('/admin/comments')
}

exports.delete = async (req,res)=>{
    const commentID = req.params.commentID
    const result = await commentsModel.delete(commentID)  
    return res.redirect('/admin/comments')  
}

