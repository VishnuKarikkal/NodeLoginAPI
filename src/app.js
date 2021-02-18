const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const  router  = require('./routes/index');

const app = new express();

app.use(bodyParser.json());
app.use(cors());

app.use('/',router);

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.DB_NAME,{useNewUrlParser:true, useUnifiedTopology: true})
                .then(
                    ()=>
                    {
                        console.log("DB Connected!");
                        const server = app.listen(8080 ,()=>
                        {
                            console.log(`Server Ready At http://localhost/${server.address().port}`);
                        });
                    })
                .catch(err=>console.log("error in DB conncetion",err));