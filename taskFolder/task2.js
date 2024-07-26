const express = require('express');
const app =express();
app.use(express.json());

const port = 4500;

let users = {};

app.get('/info',(req,res)=>{
   res.send({
    language:"javascript",
    description:"javascript is a high level programming language"
   })
})

app.post('/submit',(req,res)=>{
    const{title,description}=req.body
    res.status(200).json({
        success:true,
        message:'The title and description submitted successfully'
    })
})

app.listen(port,()=>{
    console.log('server is running on port'+port)
});