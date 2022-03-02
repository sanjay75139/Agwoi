const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
// const cookieSession = require('cookie-session')
const mongoose = require('mongoose')
const session = require('express-session');
const mongoStore = require('connect-mongodb-session')(session)
const multer = require('multer')

const flash = require('connect-flash') 

//Import database cloud link
require('dotenv').config()

const app = express()

app.set('view engine', 'ejs');
app.use(express.static("public"));

// const MongoURI = ("mongodb+srv://agwoi:Agwoi0727@cluster0.efkuq.mongodb.net/agwoi",{
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true
// })

const clientRoute = require('./routes/routes')
const adminRoute = require('./routes/admin')

app.use(bodyParser.urlencoded({extended :true}));

// const mongo = process.env.MONGO_URI
const mongo = "mongodb+srv://agwoi:Agwoi0727@cluster0.efkuq.mongodb.net/agwoi"

//To store admin authentication
const store = new mongoStore({
    uri: mongo,
    collection: 'sessions'
})

app.use('/images',express.static(path.join(__dirname,'images')));

app.use(
    session({
        secret: 'hash keyword',
        resave: false, 
        saveUninitialized: false,
        store: store
    })
);
// app.use(cookieSession({
//     secret: "Autenticate",
//     resave: true,
//     saveUninitialized: true,
// }))

// const fileStorage = multer.diskStorage({
//       destination: (req, file, cb) => {
//         cb(null,__dirname + '/images');
//       },
//       filename: (req, file, cb) => {
//         cb(null, new Date().toISOString() + '-' + file.originalname);
//       }
//     });

const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
app.use(
    multer({ dest: 'images' , fileFilter: fileFilter }).single('image')
  );//Multer use to parse files from user input

app.use(flash()) //To catch and display error message

app.use('/admin',adminRoute);
app.use(clientRoute);

mongoose.connect("mongodb+srv://agwoi:Agwoi0727@cluster0.efkuq.mongodb.net/agwoi?retryWrites=true&w=majority",{
  useNewUrlParser: true
})
    .then(result=>{
        app.listen(3000)
        console.log("Database connected and Server started successfully");
    })
    .catch(err=>console.log(err)) 