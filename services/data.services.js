const { status } = require("express/lib/response")

users = {
    1000: { acno: 1000, uname: "Ram", password: "1000", balance: 5000,transaction:[] },
    1001: { acno: 1001, uname: "Ravi", password: "1001", balance: 5000,transaction:[] },
    1002: { acno: 1002, uname: "John", password: "1002", balance: 5000,transaction:[] }
  }
  
  const register=(acno, password, uname)=> {


    if (acno in users) {
      return {
        statusCode:401,
          status:false,
          message:"Account already exist"
      }
    }
    else {
      users[acno] = {
        acno,
        uname,
        password,
        balance: 0,
        transaction:[] 
      }
      

      return  {
        statusCode:200,

        status:true,
        message:"Account sucessfully created"
    }

    }

  }

  const login=(acno, password)=> {
    let database = users

    if (acno in database) {
      if (password == database[acno]["password"]) {
       currentAccno=acno
        currentUserName=database[acno]["uname"]
        
        return {
            statusCode:200,
            status:true,
            message:"sucessfully login",
            currentAccno,
            currentUserName
        }

        // this.router.navigateByUrl('dashboard')

      }
      else {
       // alert("")
        return  {
            statusCode:401,

            status:false,
            message:"incorrect password"
        }
      }

    }
    else {
     // alert("")
      return  {
        statusCode:401,

        status:false,
        message:"incorrect account number"
    }
    }

  }

  const deposit=(acno, password, amt)=> {

    var amount = parseInt(amt)


    let db = users

    if (acno in db) {
      if (password == db[acno]["password"]) {

        db[acno]["balance"] = db[acno]["balance"] + amount
        db[acno].transaction.push({
          amount:amount,
          type:"Credit"
        })
        

            return  {
            statusCode:200,
    
            status:true,
            message:amount + " credited... New Balance is :" +   db[acno]["balance"]
        }
        
      



      }
      else {
                return  {
            statusCode:401,

            status:false,
            message:"Incorrect Password!!"
        }
      }

    }
    else {
     // alert("account doesnt exist!!")
     return  {
        statusCode:401,

        status:false,
        message:"account doesnt exist!!"
    }
    }
  }

 const withdraw=(acno, password, amt) =>{

    var amount = parseInt(amt)

    let db = users
    
    if (acno in db) {
      if (password == db[acno]["password"]) {
        if (db[acno]["balance"]>=amount) {

          db[acno]["balance"] = db[acno]["balance"] - amount
          db[acno].transaction.push({
            amount:amount,
            type:"Debit"
          })
         
          return  {
            statusCode:200,
    
            status:true,
            message:amount + " debited... New Balance is :" +   db[acno]["balance"]
        }
        
        
         //db[acno]["balance"] 
        }
      }
      else {
        alert("")
        return  {
            statusCode:401,
    
            status:false,
            message:"Incorrect Password!!"
        }
      }

    }
    else {
      alert("")
      return  {
        statusCode:401,

        status:false,
        message:"account doesnt exist!!"
    }
    }
  }

 const  getTransaction=(acno)=>{
if(acno in users){
  return{
    statusCode:200,
      status:true,
      transaction:users[acno].transaction
  }
}
else{
  return  {
    statusCode:401,

    status:false,
    message:"account doesnt exist!!"
}
}
  }





  module.exports={
      register,
      login,
      deposit,
      withdraw,
      getTransaction
  }
  
