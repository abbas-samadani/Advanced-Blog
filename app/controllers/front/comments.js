const commentModel = require('../../models/comments')
const postModel = require('../../models/posts')
exports.store = async (req,res) =>{
    const postSlug = req.params.postSlug;
    const post = await postModel.findPostBySlug(postSlug);   
    const commentItems = {
        author_id : 'user' in req.session ? req.session.user.id : null , 
        post_id : post.id,
        user_name : req.body.name,
        user_email : req.body.email,
        user_url : req.body.website,
        comment : req.body.message,
        
    }        
    const result = await commentModel.create(commentItems)
    if(result){
        res.redirect(`/p/${postSlug}`)
    }
}