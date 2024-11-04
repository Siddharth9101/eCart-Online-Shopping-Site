const zod = require("zod");

const signupUserSchema = zod.object({
  email: zod.string().email(),
  name: zod.string(),
  password: zod.string().min(6),
});

const signinUserSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
});

module.exports = { signupUserSchema, signinUserSchema };
