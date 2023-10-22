const { response, request } = require("express");

const userGet = (req = request, res = response) => {
  const { q, name = "No name", apikey } = req.query;

  res.json({
    ok: true,
    msg: "get- API - Controller ",
    q,
    name,
    apikey,
  });
};

const userPut = (req, res) => {
  const { id } = req.params;

  res.json({
    ok: true,
    msg: "get PUT",
    id,
  });
};

const userPost = (req, res) => {
  const { name, id } = req.body;

  res.status(201).json({
    ok: true,
    msg: "get POST",
    name,
    id,
  });
};

const userDelete = (req, res) => {
  res.json({
    ok: true,
    msg: "get DELETE",
  });
};

module.exports = {
  userGet,
  userPut,
  userPost,
  userDelete,
};
