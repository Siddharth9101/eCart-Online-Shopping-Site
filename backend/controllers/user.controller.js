const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models.js");
const salt = bcrypt.genSaltSync(10);

const signupHandler = async (req, res) => {
  const userInfo = req.body;

  const userAlreadyExists = await User.findOne({ email: userInfo.email });

  if (userAlreadyExists) {
    return res.status(404).json({ message: "User already exists" });
  }

  const hashedPassword = bcrypt.hashSync(userInfo.password, salt);

  try {
    const newUser = await User.create({
      email: userInfo.email,
      name: userInfo.name,
      password: hashedPassword,
      wishlist: [],
      cart: [],
    });

    const token = jwt.sign(
      {
        id: newUser._id,
        name: newUser.name,
        wishlist: newUser.wishlist,
        cart: newUser.cart,
      },
      process.env.JWT_SECRET
    );

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to connect to the database" });
  }
};

const signinHandler = async (req, res) => {
  const userInfo = req.body;

  const userAlreadyExists = await User.findOne({ email: userInfo.email });

  if (!userAlreadyExists) {
    return res.status(409).json({ message: "User not found" });
  }

  const isPasswordValid = bcrypt.compareSync(
    userInfo.password,
    userAlreadyExists.password
  );

  if (!isPasswordValid) {
    return res.status(403).json({ message: "Wrong password" });
  }

  const token = jwt.sign(
    {
      id: userAlreadyExists._id,
      name: userAlreadyExists.name,
      wishlist: userAlreadyExists.wishlist,
      cart: userAlreadyExists.cart,
    },
    process.env.JWT_SECRET
  );

  res.status(200).json({ token });
};

module.exports = { signinHandler, signupHandler };
