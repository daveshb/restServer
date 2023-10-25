const { Schema, model } = require("mongoose");

const RolsSchema = Schema({
  rol: {
    type: String,
    required: [true, "The role is required"],
  },
});

module.exports = model("Rols", RolsSchema);
