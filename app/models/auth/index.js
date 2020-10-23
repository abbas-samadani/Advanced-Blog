const db = require('../../../database/mysql')
const hashPassword = require('../../services/hashPassword')
exports.getUsers = async (email) =>{    
    const[result] = await db.query(`
        SELECT *
        FROM users
        WHERE email=?
        LIMIT 1
    `,[email])
    return result
}



