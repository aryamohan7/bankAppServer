//to connect mongodb
const mongoose = require('mongoose')
// connection string
mongoose.connect('mongodb://localhost:27017/bankServerData',{
    useNewUrlParser:true
})
// model creation
const User = mongoose.model('User',{
    acno:Number,
    uname:String,
    password:String,
    balance:Number,
    transaction:[]
})

module.exports={
    User
}