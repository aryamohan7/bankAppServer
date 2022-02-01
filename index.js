//import express
const { application } = require('express')
const express = require('express')
const dataServices = require('./services/data.services')
const jwt = require('jsonwebtoken')
const cors = require('cors')
// create app using express
const app = express()
app.use(cors({
    origin:'http://localhost:4200'
}))
app.use(express.json())

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

//using middleware
app.use((req,res,next)=>{
    console.log("appln running in middleware1");
    next()
})
//ANOTHER WAY MIDDLEWARE
const applnMiddleware = (req,res,next)=>{
    console.log("appln running on middleware2 ");
    next();
}
app.use(applnMiddleware)

//jwtMiddleware
const jwTMiddleware = (req,res,next)=>{
    try {
        //const token = req.body.token

        const token = req.headers["tocken-for-access"]
        const data =jwt.verify(token,"secretkeyofacno")
        req.currentacno = data.currentAcno
        next()
    } catch  {
        res.json({
            statusCode:401,
            status:false,
            message:"please login"
        })
    }
}
//app.use(jwTMiddleware)
//REGISTER
app.post('/register',(req,res)=>{
    console.log(req.body.acno);
    dataServices.register(req.body.acno,req.body.password,req.body.uname)
    .then(result=>{
        res.status(result.statusCode).send(result)
    })
})

app.post('/login',(req,res)=>{
    console.log(req.body.acno);
    dataServices.login(req.body.acno,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)

    })
})
app.post('/deposit',jwTMiddleware,(req,res)=>{
    console.log(req.body.acno);
    dataServices.deposit(req.body.acno,req.body.password,req.body.amt)
    .then(result=>{
        res.status(result.statusCode).json(result)

    })})

app.post('/withdraw',jwTMiddleware,(req,res)=>{
    console.log(req.body.acno);
    dataServices.withdraw(req,req.body.acno,req.body.password,req.body.amt)
    .then(result=>{
        res.status(result.statusCode).json(result)

    })})

app.post('/getTransaction',jwTMiddleware,(req,res)=>{
    console.log(req.body.acno);
    dataServices.getTransaction(req,req.body.acno)
    .then(result=>{
        res.status(result.statusCode).json(result)

    })})
//set port to server

app.listen(3000,()=>{
    console.log("server started at 3000");
})