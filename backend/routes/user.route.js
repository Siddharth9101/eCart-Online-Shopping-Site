const {
  signinHandler,
  signupHandler,
} = require("../controllers/user.controller");
const { validateSigninBody, validateSignupBody } = require("../middleware");

const { Router } = require("express");

const router = Router();

router.post("/signup", validateSignupBody, signupHandler);
router.post("/signin", validateSigninBody, signinHandler);

module.exports = router;
