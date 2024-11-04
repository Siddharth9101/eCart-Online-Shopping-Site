const { Router } = require("express");

const router = Router();
const userRouter = require("./user.route.js");
const productRouter = require("./product.route.js");

router.use("/user", userRouter);
router.use("/product", productRouter);

module.exports = router;
