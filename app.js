const express = require('express');
mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const routes = require('./app/routes');
const app = express();


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
}).then(data => {
    console.log('connected to DB');
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    
    app.use(bodyParser.json({ limit: '10mb', extended: true }))
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(routes)
    
    app.get('/', () => {
        res.send('[TODO - API - Online]');
    })
    
    app.listen(process.env.PORT || 3333, () => {
        console.log('App listening in port ', process.env.PORT);
    })
});