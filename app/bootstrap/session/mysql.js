
module.exports = session =>{
    var MySQLStore = require('express-mysql-session')(session);
    const MysqlOptions = {
        host : "localhost",
        user: "root",    
        password: '',    
        database: "simple_blog",
        port: 3306,
    }
    return new MySQLStore(MysqlOptions);
}