
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyparser = require("body-parser");
const userRouter = require("./router/route");


//jwt authentication


const app = express();
dotenv.config();

app.use(bodyparser.json());
app.use(
    bodyparser.urlencoded({ 
        extended: true,     
    })
);

app.use(cors()); 
app.use("/users/user",userRouter);


app.use((req, res, next) => {       
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});



const httpsPort = process.env.PORT;

app.listen(httpsPort, () => {
    console.log(`Server listening at port ${httpsPort}.`);
});
