const db = require('../../../database/mysql')
const hashPassword = require('../../services/hashPassword')
exports.findAll = async (columns = []) =>{
    const sqlColumns = columns.length>0 ? columns.join(',') : '*'
    const[result] = await db.query(`
        SELECT ${sqlColumns}
        FROM setting
    `)
    return result
}

exports.update = async (updateFields) =>{ //setting_name[field]  //
    Object.keys(updateFields).forEach(field =>{               
        db.query(`UPDATE setting SET setting_value=? WHERE setting_name=?` ,[updateFields[field] , field] )
    })      
}

exports.get = async (key ) =>{
    const[result] = await db.query(` SELECT setting_value FROM setting WHERE setting_name=? LIMIT 1`,[key])
    
    return result.length > 0 ? result[0].setting_value : null
}