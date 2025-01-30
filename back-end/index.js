const express = require("express");
require("dotenv").config();
const server = express();
const cors = require("cors");
var cookieParser = require("cookie-parser");
require("./DB/config");
const user_router = require("./router/user");

//Cors middleware
server.use(
  cors({
    origin: process.env.FRONTEND_HOST, // allow requests from the frontend
    credentials: true, // allow sending cookies
  })
);

server.use(express.json());
server.use(cookieParser());

//Routes Middleware
server.use("/user", user_router);



server.listen(process.env.Port, () => {
  console.log("Server is running on port 8080");
});
