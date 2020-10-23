const statictics = require('../../models/statictics')
exports.index=async (req,res)=>{ 
        const data = {
                totalUsers : await statictics.totalUsers(),
                totalComments : await statictics.totalComments(),
                totalPosts : await statictics.totalPosts(),
                totalViews : await statictics.totalViews()
        }
        
        res.adminRender('admin/dashboard/index' , {layout : 'admin' , ...data} )
}