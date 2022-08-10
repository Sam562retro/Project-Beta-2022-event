const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const sessions = require('express-session');
const cookieParser = require("cookie-parser");
const topper = require("toppers");

const oneDay = 1000 * 60 * 60 * 4;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));
app.use('/pics', express.static(path.resolve(__dirname, "assets/pics")));

app.use(bodyParser.urlencoded({extended: true}));

const mongo = require('mongoose');

const connectDB = ()=>{
    mongo.connect('mongodb+srv://highGateSchool1234:5qfCE4MklOz3glaI@toppers.du4ehpx.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    console.log('Connected without errors to mongo DB');
}
connectDB()



app.get('/', (req, res) => {
    res.render('home')
})
app.get('/toppers', (req, res) => {
    // topper.find().then(data => {
    //     res.render('toppers', {toppers: data})
    // }).catch(err => {
    //     res.render('toppers')
    // })
    res.render('toppers')
})


app.get('/login', (req, res) => {
    res.render('login')
})
app.post('/login', (req, res) => {
    let username, password;
    username = req.body.gender === 'Admin';
    password = req.body.status === 'highgate';
    if(username && password){
        sessionNow=req.session;
        sessionNow.userid=username;
    }
})


app.get('/edit', (req, res) => {
    // sessionNow=req.session;
    // if(sessionNow.userid){
    //     topper.find().then(data => {
    //         res.render('edit', {toppers: data})
    //     })
    // }else{
    //   res.redirect('/')  
    // }
    res.render('edit')
})
app.get('/add', (req, res) => {
    sessionNow=req.session;
    if(sessionNow.userid){
        res.render('add')
    }else{
      res.redirect('/')  
    }
})
app.post('/add', (req, res) => {
    sessionNow=req.session;
    if(sessionNow.userid){
        new topper({
            name: req.body.name,
            class: req.body.class,
            section: req.body.section,
            marks: req.body.marks
        })
    }else{
      res.redirect('/')  
    }
})

app.listen(8000);