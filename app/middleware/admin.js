const userRoles = require('../models/user/userRoles')
module.exports = (req , res, next) =>{   

    if(req.session.user.role !== userRoles.roles().MANAGER){
        return res.redirect('/')
    }
    next()
}