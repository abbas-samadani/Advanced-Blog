const db = require('../../../database/mysql')
const commentStatus = require('./commentStatus')
exports.findAll = async () =>{
    const[rows , fields] = await db.query(`
        SELECT c.*,p.title
        FROM comments c        
        JOIN post p ON c.post_id=p.id  
        ORDER BY c.create_at DESC      
    `)
    return rows
}

exports.create = async (messageData) =>{
    
    const[result] = await db.query(`INSERT INTO comments SET ?` , [messageData])    
    console.log(result)
    return result.insertId
}
exports.find = async (postID) =>{
    const[result] = await db.query(`
        SELECT c.*,p.full_name
        FROM comments c        
        JOIN post p ON c.post_id=p.id 
        WHERE c.post_id=? LIMIT 1
    `,[postID])
    return result.length > 0 ? result[0] : false
}
exports.findById = async (postID , status = commentStatus.APPROVED) =>{
    const[result] = await db.query(`
        SELECT *
        FROM comments                
        WHERE comments.post_id=?
        AND status=?
    `,[postID , status])
    return result
}



exports.approve = async (commentID)=>{
    const [result] = await db.query(`UPDATE comments SET status=? WHERE id=? `, [commentStatus.APPROVED , commentID])     
    return result
}

exports.reject = async (commentID)=>{
    const [result] = await db.query(`UPDATE comments SET status=? WHERE id=? `, [commentStatus.REJECTED , commentID]) 
    return result
}

exports.delete = async (commentID)=>{
    const [result] = await db.query(`DELETE FROM comments WHERE id=? `, [commentID]) 
    return result
}