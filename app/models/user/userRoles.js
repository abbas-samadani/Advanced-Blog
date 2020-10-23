const userRole= {
    USER : 0,
    ARTHOR : 1,
    MANAGER :2
}

const RoleAsText = {
    [userRole.USER] : 'کاربر',
    [userRole.ARTHOR] : 'نویسنده',
    [userRole.MANAGER] : 'مدیر'
}

exports.roles = () =>{
    return userRole
}

exports.readableRoles = (role = null) =>{
    return role ? RoleAsText(role) : rolesAsText;
}