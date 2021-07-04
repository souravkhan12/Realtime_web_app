const express = require('express')
const app = express()

const path = require('path')

const favicon = require('serve-favicon');
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
app.use(express.static('public'));  
app.use(favicon(__dirname + '/public/favicon.ico'));


const PORT = process.env.PORT || 3300


app.get('/',(req,res)=>{
    res.render('home')
})


// set Template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))

app.set('view engine','ejs')

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})