const { signinUserSchema, signupUserSchema } = require("./types");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: "Unauthorized" });
  }
};

const validateSignupBody = (req, res, next) => {
  const userInfo = req.body;
  const { success } = signupUserSchema.safeParse(userInfo);

  if (!success) {
    return res.status(403).json({ message: "Incorrect inputs" });
  } else {
    next();
  }
};

const validateSigninBody = (req, res, next) => {
  const userInfo = req.body;
  const { success } = signinUserSchema.safeParse({
    email: userInfo.email,
    password: userInfo.password,
  });

  if (!success) {
    return res.status(403).json({ message: "Incorrect inputs" });
  } else {
    next();
  }
};

module.exports = { authMiddleware, validateSignupBody, validateSigninBody };
