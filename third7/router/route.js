const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");




// signup routes
router.post("/signup", controller.register);
// login routes
router.post("/login", controller.login);
//find customer route
router.get("/find",requiredtoken,controller.find);

// requiredtoken
function requiredtoken(req, res, next) {
  let headers = req.headers["token"];
  console.log(headers, "token##");
  if (typeof headers !== undefined && headers !== "") {
    req.token = headers;
    next();
  } else {
    res.send({
      status: false,
      msg: "token required ...",
    });
  }
}

module.exports = router;

