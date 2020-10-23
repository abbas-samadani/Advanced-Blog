const express = require('express')
const hbs = require('express-handlebars')
const handlebars = require('handlebars')
const bodyParser = require('body-parser')
const flash =require('connect-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')
const fileUpload = require('express-fileupload')
const sessionStore = require('./session/mysql')(session)
module.exports = (app) =>{
    app.engine('handlebars', hbs());
    app.set('view engine', 'handlebars');
    app.set('views' , path.join(__dirname, '../../views'))
    app.use(express.static('public'))

    //bodyParser
    app.use(bodyParser.urlencoded({ extended: false }))    
    app.use(bodyParser.json())


    // express-session
    app.use(cookieParser())    
    app.use(session({        
        store: sessionStore,
        secret: 'nbkjhjjjo;jiojl;kl;klt',
        resave: true,
        saveUninitialized: true, 
        cookie: { secure: false ,  maxAge: 60000 ,httpOnly: false },      
        unset : "destroy" 
        
    }))
    app.use(flash())

    //upload file
    app.use(fileUpload({
      useTempFiles : true,
      createParentPath : true
    }));

    //
    handlebars.registerHelper('ifCond', function(v1, v2, options) {
        if(v1 === v2) {
          return options.fn(this);
        }
        return options.inverse(this);
      });
}