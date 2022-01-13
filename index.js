//import express
const { application } = require('express')
const express = require('express')
const dataServices = require('./services/data.services')
// create app using express
const app = express()

//RESOLVING http path
// get Request - to fetch data
app.get('/',(req,res)=>{
    res.status(401).send("get request")
})
// post Request - to create data

app.post('/',(req,res)=>{
    res.send("post request")
})
// put request - to modify entirely
app.put('/',(req,res)=>{
    res.send("put request")
})
//patch- to modify partially
app.patch('/',(req,res)=>{
    res.send("patch request")
})

app.delete('/',(req,res)=>{
    res.send("delete request")
})
//parse

app.use(express.json())
//REGISTER
app.post('/register',(req,res)=>{
    console.log(req.body.acno);
    const result = dataServices.register(req.body.acno,req.body.password,req.body.uname)
    res.status(result.statusCode).send(result)
})

app.post('/login',(req,res)=>{
    console.log(req.body.acno);
    const result = dataServices.login(req.body.acno,req.body.password)
    res.status(result.statusCode).json(result)
})
app.post('/deposit',(req,res)=>{
    console.log(req.body.acno);
    const result = dataServices.deposit(req.body.acno,req.body.password,req.body.amt)
    res.status(result.statusCode).send(result)
})

app.post('/withdraw',(req,res)=>{
    console.log(req.body.acno);
    const result = dataServices.deposit(req.body.acno,req.body.password,req.body.amt)
    res.status(result.statusCode).send(result)
})

app.post('/getTransaction',(req,res)=>{
    console.log(req.body.acno);
    const result = dataServices.getTransaction(req.body.acno)
    res.status(result.statusCode).json(result)
})
//set port to server

app.listen(3000,()=>{
    console.log("server started at 3000");
})