const express = require('express')
const app = express();

require('./bootstrap')(app);
require('./middleware')(app);
require('./routes')(app)

module.exports = () =>{
    app.listen(3000 , () =>{
        console.log('app is running on port 3000')
    })
}