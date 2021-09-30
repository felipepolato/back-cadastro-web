const { connect } = require("mongoose");

(async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await connect(process.env.MONGODB_URI, options);
    console.log("Conectado no Banco de Dados");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})();
