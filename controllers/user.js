const { response, request } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const userGet = async (req = request, res = response) => {
  const { limit = 100, from = 0 } = req.query;

  // const usuarios = await User.find({state: true})
  // // const usuarios = await User.find( )
  // .skip(Number(from))
  // .limit(Number(limit));
  // const total = await User.countDocuments({state: true});

  const [total, users] = await Promise.all([
    User.count({ state: true }),
    User.find({ state: true }).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    ok: true,
    total,
    users,
  });
};

const userPut = async (req, res) => {
  const { id } = req.params;

  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json({
    ok: true,
    user,
  });
};

const userPost = async (req, res) => {
  const { name, email, password, rol } = req.body;
  const user = new User({ name, email, password, rol });

  // Encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save in DB
  await user.save();

  res.status(201).json({
    ok: true,
    msg: "get POST",
    user,
  });
};

const userDelete = async (req, res) => {
  const { id } = req.params;

  // Delete user
  // const user = await User.findByIdAndDelete(id);
  const user = await User.findByIdAndUpdate(id, { state: false });

  res.json(user);
};

module.exports = {
  userGet,
  userPut,
  userPost,
  userDelete,
};
