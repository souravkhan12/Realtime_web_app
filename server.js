require('dotenv').config();
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const favicon = require('serve-favicon');
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const  session = require('express-session');
const path = require('path')

const flash = require('express-flash')
const MongoDbStore = require('connect-mongo');


// Database Connection
const url = 'mongodb://localhost/pizza';
mongoose.connect(url,{ 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:true
});

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('Databse Connected...');
}).catch(err =>{
    console.log('connection failed...');
});

app.use(flash());

//Assests
app.use(express.static('public'));  
app.use(express.json())
app.use(favicon(__dirname + '/public/favicon.ico'));

const PORT = process.env.PORT || 3300


//Session configuration
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave : false,
    store : MongoDbStore.create(connection),
    saveUninitialized : false,
    cookie : { maxAge : 1000 * 60 * 60 * 24 } // 24 hours
}))

//Global middleware
app.use((req,res,next)=>{
    res.locals.session = req.session
    next()
})

// set Template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))

app.set('view engine','ejs')

require('./routes/web')(app);

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})