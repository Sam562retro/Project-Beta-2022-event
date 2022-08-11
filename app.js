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
    await toppers.set('arrays', {
        arra: []
    })

    let z = await toppers.get('arrays')

    for(i=0; i<=10; i++){
        z.props.arra.push(crypto.randomBytes(3*4).toString('base64'));
    }

    await toppers.set('arrays', {
        arra: z.props.arra
    })
    console.log(z.props.arra)
    for(i = 0; i<z.props.arra.length; i++){
        await toppers.set(z.props.arra[i],{
            name: `${i}`,
            clas: `${i}`,
            section: `${i}`,
            marks: `${i}`,
            pic: `${i}`
        })
        console.log(await toppers.get(z.props.arra[i]))
    }
}
start()

app.get('/', (req, res) => {
    res.render('home')
})
app.get('/toppers',  async(req, res) =>{
    let topperList = []
    let to = await toppers.get('arrays')
    let top = to.props.arra
    console.log(top)
    for(i = 0; i<top.length; i++){
        let h = await toppers.get(top[i])
        console.log(h)
        // topperList.push(h.props)
    }
    res.render('toppers', {toppers:topperList})
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