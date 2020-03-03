const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
let app = express();
let dataPath = path.join(__dirname, '/request.json')
let arr = [];

// app.get('/', (req, res) => {
//     res.send("Hello from the web server side...")
//     next()
// })

app.use((request, response, next) => {
    console.log(request.url);
    next();
})

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/post-route', (req, res, next) => {
    let obj = {
        email: req.body.email,
        password: req.body.password,
    }
    arr = [...arr, obj]
    fs.writeFile(dataPath, JSON.stringify(arr), (err) => {
        if (err) console.log(err)
    })

    res.send(arr)
    next()
})


app.use(express.static(path.join(__dirname, '../public')))

app.listen(3000)