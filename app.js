const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const sessions = require('express-session');
const cookieParser = require("cookie-parser");
const CyclicDb = require("cyclic-dynamodb")
const crypto = require("crypto");


const db = CyclicDb("hilarious-erin-spacesuitCyclicDB")

const oneDay = 1000 * 60 * 60 * 4;
app.use(sessions({
    secret: crypto.randomBytes(16).toString("hex"),
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

const toppers = db.collection("toppers")

async function start(){
    let q = await toppers.get('arrays')
    for(i = 0; i<q.props.arra.length; i++){
        await toppers.set(q.props.arra[i], {
            
        })
    }
    await toppers.set('arrays', {
        arra: []
    })
}
start()

app.get('/', (req, res) => {
    res.render('home')
})
app.get('/toppers',  async(req, res) =>{
    let topperList = []
    let to = await toppers.get('arrays')
    let top = to.props.arra
    for(i = 0; i<top.length; i++){
        let h = await toppers.get(top[i])
        console.log(h.props)
        console.log('------------------------------------------------------------------------------------')
        // topperList.push(h.props)
    }
    res.render('toppers', {toppers:topperList})
})


app.get('/login', (req, res) => {
    res.render('login')
})
app.post('/login', (req, res) => {
    let username, password;
    username = req.body.username === 'Admin';
    password = req.body.password === 'highgate';
    if(username && password){
        sessionNow=req.session;
        sessionNow.userid=username;
        res.redirect('/edit')
    }else{
        res.redirect('/')
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
app.post('/add', async (req, res) => {
    sessionNow=req.session;
    if(sessionNow.userid){


        let z = await toppers.get('arrays')
        z.props.arra.push(crypto.randomBytes(3*4).toString('base64'));
        
        await toppers.set('arrays', {
            arra: z.props.arra
        })
        console.log('#######################################################')
        console.log(z.props.arra)
        console.log('#######################################################')
        await toppers.set(z.props.arra[z.props.arra.length-1],{
            name: req.body.name,
            clas: req.body.clas,
            section: req.body.section,
            marks: req.body.marks,
            pic: req.body.pic
        })
        res.redirect('/toppers')
    }else{
      res.redirect('/')  
    }
})

app.listen(8000);