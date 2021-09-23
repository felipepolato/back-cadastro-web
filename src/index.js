require("dotenv/config")
require("./database/connection")
const express = require("express");
const cors = require("cors");
const userRouter = require("./router/userRouter");


const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);


const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address();
    console.log(`Server is running in http://localhost: ${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});