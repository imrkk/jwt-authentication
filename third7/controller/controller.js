const con = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


//register/signup
const register = async (req, res) => {

    const {name,email,password} = req.body;
    con.query("select email from emp_details1 where email ='"+email+"'", async (err, result) => {
    if(err){

        console.log(err);
        res.status(403).json({status:false,data:err.detail});

    }else{

       
        if (result.length > 0) {
        res.send({status: false,messageg: "email id already exits"});
        }else {
        dcryptPassword = await bcrypt.hash(password, 10);
        con.query("insert into emp_details1(name,email,password)values('"+name+"','"+email+"','"+dcryptPassword+"')", (err, result) => {
        if(err){
            console.log(err);
            res.send({status: false,data:err.detail});
        }else{
            console.log(result);
            res.send({status: true,messageg: "user registered successfully",});  
        }
             });
         }
          
         }
      
    });
  };



//login by email
const login = (req, res) => {

    const {email,password} = req.body;
    con.query("select * from emp_details1 where email ='"+email+"'", async (err, result) => {
    if(err){
        console.log(err);
        res.status(403).json({status:false,data:err.detail});
    }else{

        if (result.length > 0) {
            let data = {
              name: result[0].name,
              email: result[0].email,
            };
        let checkPassword = await bcrypt.compare(password, result[0].password);
      
        if (checkPassword === true) {                                           //password matched
          const token = jwt.sign({ data }, "privatkey");
        //   console.log(token, "check token_By_Ravi");
          res.send({status: true,token: token,result: data,message: "user login successful"});
          // console.log(data);   

        } else {
          res.send({status: false,message: "invalid user"});   
        }


      } else {                                                                //email id not matched
        res.send({status: false,message: "invalid email id"});  
      }
    }
  
      
        
    });
  };



//login by id
// const login = (req, res) => {

//   const {id,password} = req.body;
//   con.query("select * from emp_details1 where id="+id+"", async (err, result) => {
//   if(err){
//       console.log(err);
//       res.status(403).json({status:false,data:err.detail});
//   }else{

      
//       if (result.length > 0) {                        
//           let data = {
//             id:result[0].id,
//             name: result[0].name,
//             email: result[0].email,
//           };
//       let checkPassword = await bcrypt.compare(password, result[0].password);
      
//       if (checkPassword === true) {                                           //password matched
//         const token = jwt.sign({ data }, "privatkey");
//         // console.log(token, "check token_By_Ravi");
//         res.send({status: true,token: token,result: data,message: "user login successful"});   

//       } else {
//         res.send({status: false,message: "invalid password"});   
//       }


//     } else {                                                                //email id not matched
//       res.send({status: false,message: "invalid customer id"});  
//     }
//   }

    
      
//   });
// };




//find customer details
const find = (req, res) => {
  let checkToken = verifyToken(req.token);

  if (checkToken.status == true) {                              //token matched
    con.query("select * from cus_details", (err, result) => {
      if(err){
          console.log(err);
          res.status(403).json({status:false,data:err.detail});
      }else{

        if (result.length > 0) {
          res.send({status: true,data: result});   
        } else {
          res.send({status: false,message: "data not found",});           
        }
    }
  });

  }else{                                                    // token not matched
    res.send({status: false,message: "token invalid"}); 
  }

};




//verifytokens
function verifyToken(token) {
  return jwt.verify(token, "privatkey", (err, result) => {
    if (err) {
      let a = { status: false };
      return a;
    } else {
      let b = { status: true };
      return b;
    }
  });
}

module.exports = {register,login,find}



