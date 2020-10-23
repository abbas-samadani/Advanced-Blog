const db = require('../../../database/mysql')
const hashPassword = require('../../services/hashPassword')
exports.findAll = async (columns = []) =>{
    const sqlColumns = columns.length>0 ? columns.join(',') : '*'
    const[result] = await db.query(`
        SELECT ${sqlColumns}
        FROM users
    `)
    return result
}
exports.find = async (userId) =>{    
    const[result] = await db.query(`
        SELECT *
        FROM users
        WHERE id=?
        LIMIT 1
    `,[userId])
    return result.length === 1 ? result[0] : null
}

exports.findByEmail = async (email) =>{    
    const[result] = await db.query(`
        SELECT *
        FROM users
        WHERE email=?
        LIMIT 1
    `,[email])
    return result.length === 1 ? result[0] : null
}

exports.find = async (usersID) =>{
    const[result] = await db.query(`
        SELECT * FROM users         
        WHERE users.id=? LIMIT 1
    `,[usersID])
    return result.length > 0 ? result[0] : false
}

exports.create = async (usersData) =>{
    usersData.password = await hashPassword.hashPassword(usersData.password)
    const[result] = await db.query(`INSERT INTO users SET ?` , [usersData])    
    return result.insertId
}

exports.delete = async (usersID) =>{
    const[result] = await db.query(` DELETE FROM users WHERE id=?` , [usersID])
    return result.affectedRows >0 
}

exports.update = async (usersID , updateFields) =>{
    const[result] = await db.query(` UPDATE users SET ? WHERE id=? LIMIT 1` ,[updateFields , usersID])
    return result.affectedRows >0 
}