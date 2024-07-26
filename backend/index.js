// create an http server that runs on port of my localhost.
// Do this using http & Express Js

// library in node js

// http is toooo old!

const http = require('http'); // inbuilt node js package --> when you download nodejs, http module came with it

// industry standard for choosing
// 3000 -->ui
// 8080 -->http1 server
// 8082 -->http2 server
// 5432 -->postgres server
// ...

// ip address - 32 bit address of the server - 192.168.123.123
// ip address of localhost -127.0.0.1

const hostname = '127.0.0.1';

const port = 8080;

const server = http.createServer((req,res) =>{
    res.statusCode =200
    res.setHeader('content-Type','text/plain');
    res.end("Hello World!")
})
server.listen(port,hostname ,()=>{
    console.log('my server is running on' +port);
})