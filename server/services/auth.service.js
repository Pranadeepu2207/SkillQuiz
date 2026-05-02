const { User } = require("../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createError = require("http-errors");
// const { where } = require("sequelize");
// console.log(user)

const SECRET_TOKEN = process.env.JWT_SECRET

exports.register = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ where: email });

  if (existingUser) {
    throw createError(409, "user already existed");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return await User.create({
    name,
    email,
    password: hashedPassword,
  });
};

exports.login = async ({email, password}) => {
    const user = await User.findOne({where : email})

    if(!user){
        throw createError(401, "Invalid email or password");
    }

    const matchedPassword = await bcrypt.compare(password, user.password)

    if(!matchedPassword){
        throw createError(401, "Invalid email or password");
    }

    const token = jwt.sign({id : user.id}, SECRET_TOKEN, {expiresIn: '24h'})

    return ({user, token})

}
