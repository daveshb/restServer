const Rol = require("../models/rol");
const User = require("../models/user");
const { response } = require("express");

const validateRols = async (rol = "") => {
  const validRoles = await Rol.findOne({ rol });
  if (!validRoles) {
    throw new Error(`The role ${rol} is not valid`);
  }
};

const validateEmail = async (email = '') => {
  const existEmail = await User.findOne({ email });

  if (existEmail){
   throw new Error(`The email ${email} already exists`);
 }
}

const validateId = async (id = '') => {
  const existId = await User.findById(id);

  if (!existId){
   throw new Error(`The id ${id} does not exist`);
  }
}

module.exports = {
  validateRols,
  validateEmail,
  validateId
};
