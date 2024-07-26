// express.js which nothing by a mordern javascript library to create node js server

//GET API endpoint -->Fetch data from server
//POST API endpoint -->Insert data into server
//PUT API endpoint-->update data into server

const express = require('express'); // npm install express

const app =express();

let users ={};// a database

// my user object will have id,name,age attributes {id:1,name:'Narendra',age:24}

// middleware 
app.use(express.json())

//POST API create a new user

app.post('/users',(req,res)=>{
    //this function will get triggered with the server calls 127.0.0.1:3000/users
    
    //every request has a header and body. The body of the request is basically the json object coming into the request.

    //object destructring

    const{id,name,age}=req.body;
    users[id] = {name,age};
    res.status(201).json({
        success:true,
        data:users
    })
});

//PUT edit an existing user from the user id

app.put('/update/:id',(req,res)=>{

    // this function will get triggerred when the user calls 127.0.0.1:3000/update/id
    const{id} = req.params;
    const{name,age}=req.body;
    users[id] = {name,age};
    res.status(201).json({
        success:true,
        data:users
    })

});

// Get HTTP call to my server which sends my name and age as response
app.get('/data',(req,res)=>{

    // this function will trigger the moment this api is hit

    // add any logic here to send data from my server
    // res.send({
    //     name:"Narendra",
    //     age:"21"
    // })
    try{
        res.status(201).json({
            success:true,
            data:users
        })
    }catch(err){
        res.status(500).json({
            success:false  
    })

});
const port =5000;

//listen on port 3000 and start my server
app.listen(port,()=>{
    console.log('Server is running on'+port);
});

// discuss about response status

// request is nothing but object of paramas,headers,body,authorization ....

// response is nothing but of an object of status code,body ....

//status code - industry adapted code for explaing the response of API
//200-ok
//201-created Successfully
//500-internal Server
//404-Not found
//401-Unauthorized
