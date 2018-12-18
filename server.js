const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const server = express();
const port = process.env.PORT || 3003;

const userRouter = require('./routes/userRouter')

const db = mongoose.connect('mongodb://localhost/teste')

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.use('/api/users', userRouter)

server.listen(port, () => {
    console.log(`http://localhost:${port}`)
});