const express = require('express'); //npm install express
const http = require('http');

const app =express()

const server = http.createServer(app);

app.get('/home',(req,res)=>{
    res.send("Welcome to the Home Page!")
});
app.get('/about',(req,res)=>{
    res.send("This is the About Page.")
});

const port =3500;
server.listen(port, () =>{
    console.log(`my server is running on ${port}`);
})