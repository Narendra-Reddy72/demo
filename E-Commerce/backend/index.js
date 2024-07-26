const express = require('express'); 
const mongoose = require('mongoose')

const app =express();

app.use(express.json());

const mongoUrl = "mongodb+srv://narendrareddy3211:test321@cluster1.cpzp3j5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"

mongoose.connect(mongoUrl,{});

mongoose.connection.on('connected',()=>{
    try{
        console.log('MongoDB is connected successfully')
    }catch(err){
        console.log('MongoDB is not Connected Successfully')
    }
});

const userRoutes = require('./routes/User-routes');
app.use('/api',userRoutes);

const port = 5700;

app.listen(port,()=>{
    console.log(`my server is running on ${port}`)
});