const { status } = require("express/lib/response")

users = {
    1000: { acno: 1000, uname: "Ram", password: "1000", balance: 5000,transaction:[] },
    1001: { acno: 1001, uname: "Ravi", password: "1001", balance: 5000,transaction:[] },
    1002: { acno: 1002, uname: "John", password: "1002", balance: 5000,transaction:[] }
  }
  
  const register=(acno, password, uname)=> {


    if (acno in users) {
      return {
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
        status:true,
        message:"Account sucessfully created"
    }

    }

  }
  module.exports={
      register
  }