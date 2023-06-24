const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const mongoose = require('mongoose');
const heroRoutes = require('../api routes/heroes')
const roleRoutes = require('../api routes/roles')



app.use(morgan('dev'));

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use((req,res,next)=>{
    res.header("Access-Control_Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-TYPE, Accept, Authorization");

    if(req.method === "OPTIONS"){
        req.header("Access-Control-Allow-Methods", "POST, PUT, GET, PATCH, DELETE")
    }
    next();
});

app.get("/", (req,res,next) => {
    res.status(201).json({message: "Service is up", method: req.method})
});

app.use('/heroes', heroRoutes)
app.use('/roles', roleRoutes)

app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((req,res,next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
            status: error.status
        }
    })
});

mongoose.connect(process.env.mongoDBURI);

const db = mongoose.connection;
db.on('error', () => console.log('connection:'));
db.once('open', () => {
    console.log('Connected successfully to MongoDB!')
});


module.exports = app;