const userModel = require('../../models/user')
const authService = require('../../services/authService')
const userRoles = require('../../models/user/userRoles')
const postModel = require('../../models/posts/index')
const settingModel = require('../../models/settings/index')
const PostPresenter = require('../../presenters/post')
exports.index = async (req,res) =>{
    const page = 'page' in req.query ? req.query.page : 1;
    const perPage = await settingModel.get('content_number')
    const title = await settingModel.get('title_blog')

    console.log(perPage)
    const totalpost = await postModel.totalPost()
    const totalPage = Math.ceil(totalpost/perPage);
    const posts = await postModel.findAll(page , perPage);

    const pagination = {
        page,
        totalPage,        
        nextPage : page < totalPage ? parseInt(page) + 1  : totalPage,
        prevPage : page > 1 ? parseInt(page) - 1 : 1,
        hasNextPage : page < totalPage,
        hasPrevPage : page > 1
    }

    
    const postsForPresent = posts.map(post =>{
        const PostPresenterInstance = new PostPresenter(post);
        post.jalali_date = PostPresenterInstance.jalaliCreatedAt();
        post.excerpt = PostPresenterInstance.excerpt();
        return post
    })
    res.frontRender('front/home/index' , {posts: postsForPresent , pagination , helpers : {
        showDisabled : function(isDisabled,options){
            return !isDisabled ? 'disabled' : ''
        }
    }})
}

