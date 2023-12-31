const mongoose = require("mongoose");

const dbConnection = async () => {
  try {

   await mongoose.connect(process.env.MONGODB_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   });

   console.log('DB Online');

  } catch (error) {
    console.log(error);
    throw new Error("Error en la base de datos - Hable con el administrador");
  }
};

module.exports = {
  dbConnection,
};
