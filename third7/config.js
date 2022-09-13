const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const con = mysql.createConnection({
    connectionLimit: 20,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements:true
    
  });
  
  con.connect((err)=>{
    if (err) {
        console.log('error occured while connecting :: ' + err);
    } else {
        console.log('connection created with Mysql successfully');
    }
    return con;
  })


  module.exports = con;


  