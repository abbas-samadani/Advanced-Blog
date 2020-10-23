const db = require('../../../database/mysql')
exports.find = async (postID) =>{
    const[result] = await db.query(`
        SELECT p.*,u.full_name
        FROM post p        
        JOIN users u ON p.author_id=u.id
        WHERE p.id=? LIMIT 1
    `,[postID])
    return result.length > 0 ? result[0] : false
}
exports.findAll = async (page = 1 , perPage = 5) =>{
    const offset = (page-1)*perPage;
    const[result] = await db.query(`
        SELECT p.*,u.full_name
        FROM post p
        LEFT JOIN users u ON p.author_id=u.id
        ORDER BY p.create_at DESC
        LIMIT ${offset} , ${perPage}
    `)
    
    return result
}

exports.totalPost = async () =>{    
    const[result] = await db.query(`
        SELECT COUNT(id) as postCount FROM post
    `)     
    return result[0].postCount
}

exports.create = async (postData) =>{
    const[result] = await db.query(`INSERT INTO post SET ?` , [postData])    
    return result.insertId
}

exports.delete = async (postID) =>{
    const[result] = await db.query(` DELETE FROM post WHERE id=?` , [postID])
    return result.affectedRows >0 
}

exports.update = async (postID , updateFields) =>{
    const[result] = await db.query(` UPDATE post SET ? WHERE id=? LIMIT 1` ,[updateFields , postID])
    return result.affectedRows >0 
}

exports.findPostBySlug = async (postSlug ) =>{
    const[result] = await db.query(` SELECT * FROM post WHERE slug=? LIMIT 1`,[postSlug])
    
    return result[0]
}