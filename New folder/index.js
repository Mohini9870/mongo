const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();



dotenv.config({path:'config.env'})
const PORT = process.env.PORT||8080;

//log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}));

//set view engine
app.set("view engine", 'ejs');
//app.set("views",path.resolve(__dirname, "views/ejs"));

//load assests
app.use('/css', express.static(path.resolve(__dirname, "assest/css")));
app.use('/js', express.static(path.resolve(__dirname, "assest/js")));




// load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost: ${PORT}`);
})