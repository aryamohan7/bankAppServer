const req = require("express/lib/request")
const { status } = require("express/lib/response")
const jwt = require("jsonwebtoken")
const db = require("./mongoosse_db")
users = {
  1000: { acno: 1000, uname: "Ram", password: "1000", balance: 5000, transaction: [] },
  1001: { acno: 1001, uname: "Ravi", password: "1001", balance: 5000, transaction: [] },
  1002: { acno: 1002, uname: "John", password: "1002", balance: 5000, transaction: [] }
}

const register = (acno, password, uname) => {
  // asyn

  return db.User.findOne({
    acno
  }).then(users => {
    console.log(users);
    if (users) {
      return {
        statusCode: 401,
        status: false,
        message: "Account already exist"
      }
    }
    else {
      const newUser = new db.User({
        acno,
        uname,
        password,
        balance: 0,
        transaction: []
      })
      newUser.save()
      return {
        statusCode: 200,

        status: true,
        message: "Account sucessfully created"
      }
    }
  })

}

const login = (acno, password) => {

  return db.User.findOne({
    acno, password
  }).then(user => {
    if (user) {

      currentAccno = acno
      currentUserName = user.uname

      const jwTtoken = jwt.sign({
        currentAcno: acno
      }, "secretkeyofacno")
      return {
        statusCode: 200,
        status: true,
        message: "sucessfully login",
        currentAccno,
        currentUserName,
        jwTtoken
      }
    }

    return {
      statusCode: 401,

      status: false,
      message: "incorrect password"


    }

  })

}
const withdraw = (req, acno, password, amt) => {

  var amount = parseInt(amt)


  return db.User.findOne({
    acno, password
  }).then(user => {
    if (req.currentacno != acno) {
      return {
        statusCode: 401,

        status: false,
        message: "permission denied!!"
      }
    }
    if (user) {
      if (user.balance > amount) {
        user.balance = user.balance - amount
        user.transaction.push({
          amount: amount,
          type: "debit"
        })
        user.save()
        return {
          statusCode: 200,

          status: true,
          message: amount + " debited... New Balance is :" + user.balance
        }
      }
      return {
        statusCode: 401,

        status: false,
        message: "insuffient balance!!"
      }
    }
    return {
      statusCode: 401,

      status: false,
      message: "account doesnt exist!!"
    }
  })
}

const deposit = (acno, password, amt) => {

  var amount = parseInt(amt)


  return db.User.findOne({
    acno, password
  }).then(user => {
    if (user) {
      user.balance = user.balance + amount
      user.transaction.push({
        amount: amount,
        type: "credit"
      })
      user.save()
      return {
        statusCode: 200,

        status: true,
        message: amount + " credited... New Balance is :" + user.balance
      }
    }
    return {
      statusCode: 401,

      status: false,
      message: "account doesnt exist!!"
    }
  })
}

const getTransaction = (req) => {
  acno = req.currentacno
  return db.User.findOne({
    acno
  }).then(user => {
    if (user) {
      return {
        statusCode: 200,
        status: true,
        transaction: user.transaction
      }
    }

    else {
      return {
        statusCode: 401,

        status: false,
        message: "account doesnt exist!!"
      }
    }
  })
}


//     const withdraw=(acno, password, amt) =>{

//   var amount = parseInt(amt)
//   return db.User.findOne({
//     acno,password
//   }).then(user=>{
//     if(user){
//       user.balance=user.balance+amount
//       user.transaction.push({
//         amount:amount,
//         type:"credit"
//       })
//       user.save()

//   let db = users

//   if (acno in db) {
//     if (password == db[acno]["password"]) {
//       if (db[acno]["balance"]>=amount) {

//         db[acno]["balance"] = db[acno]["balance"] - amount
//         db[acno].transaction.push({
//           amount:amount,
//           type:"Debit"
//         })

//         return  {
//           statusCode:200,

//           status:true,
//           message:amount + " debited... New Balance is :" +   db[acno]["balance"]
//       }


//        //db[acno]["balance"] 
//       }
//     }
//     else {
//       alert("")
//       return  {
//           statusCode:401,

//           status:false,
//           message:"Incorrect Password!!"
//       }
//     }

//   }
//   else {
//     alert("")
//     return  {
//       statusCode:401,

//       status:false,
//       message:"account doesnt exist!!"
//   }
//   }
// }

//     if (acno in db) {
//       if (password == db[acno]["password"]) {

//         db[acno]["balance"] = db[acno]["balance"] + amount
//         db[acno].transaction.push({
//           amount:amount,
//           type:"Credit"
//         })








//       }
//       else {
//                 return  {
//             statusCode:401,

//             status:false,
//             message:"Incorrect Password!!"
//         }
//       }

//     }
//     else {
//      // alert("account doesnt exist!!")

//     }
//   }
// }

//REGISTER

//   if (acno in users) {
//     return {
//       statusCode:401,
//         status:false,
//         message:"Account already exist"
//     }
//   }
//   else {
//     users[acno] = {
//       acno,
//       uname,
//       password,
//       balance: 0,
//       transaction:[] 
//     }


//     return  {
//       statusCode:200,

//       status:true,
//       message:"Account sucessfully created"
//   }

//   }

// }

//   const login=(acno, password)=> {
//     let database = users

//     if (acno in database) {
//       if (password == database[acno]["password"]) {
//        currentAccno=acno
//         currentUserName=database[acno]["uname"]

//         const jwTtoken = jwt.sign({
//           currentAcno:acno
//         },"secretkey of acno")
//         return {
//             statusCode:200,
//             status:true,
//             message:"sucessfully login",
//             currentAccno,
//             currentUserName,
//             jwTtoken
//         }

//         // this.router.navigateByUrl('dashboard')

//       }
//       else {
//        // alert("")
//         return  {
//             statusCode:401,

//             status:false,
//             message:"incorrect password"
//         }
//       }

//     }
//     else {
//      // alert("")
//       return  {
//         statusCode:401,

//         status:false,
//         message:"incorrect account number"
//     }
//     }

//   }

//  

//  

//  const  getTransaction=(acno)=>{
// if(acno in users){
//   return{
//     statusCode:200,
//       status:true,
//       transaction:users[acno].transaction
//   }
// }
// else{
//   return  {
//     statusCode:401,

//     status:false,
//     message:"account doesnt exist!!"
// }
// }
//   }





module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransaction
}

