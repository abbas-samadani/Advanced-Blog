
const userService = require('../../services/userService')
const dataService = require('../../services/dataService')
const postModel = require('../../models/posts')
const userModel = require('../../models/user/index')
const settingModel = require('../../models/settings')
const commentModel = require('../../models/comments/index')
const postValidator = require('../../validation/postValidator')
const _ = require('lodash')
//const sessionController = require('../../controllers/session/controller')
const {statuses} = require('../../models/posts/postStatus')

exports.index=async (req,res)=>{    
    const postSlug = await req.params.postSlug;
    const post = await postModel.findPostBySlug(postSlug);    
    const user = await userModel.find(post.author_id);    
    const comments = await commentModel.findById(post.id);     
    const presentedComments = comments.map(comment =>{       
        
        comment.created_ad_persian = dataService.toPersian(comment.create_at);
        comment.gravatar = userService.gravatar(comment.user_email , {s: '60'})                    
        return comment
     })
    
    
    user.avatar = userService.gravatar(user.email)
    post.user = user;    
    
    
    if(!post){
        res.redirect('/404')
    }
    const newComments = _.groupBy(presentedComments , 'parent');
    let pageTitle = await settingModel.get('title_blog')
    
    res.frontRender('front/post/single' , {post ,comments : newComments[0], bodyClass : 'single-post' ,title : `${pageTitle} || ${post.title}`, helpers : {
        hasChild : function(commentId , options){
            return commentId in newComments;
        },
        getChild : function(commentId , options){
            return newComments[commentId];
        }
    } 
    
    
})
}




