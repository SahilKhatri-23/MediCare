const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

//helmet is a security middleware for express by setting various HTTP headers

app.use(helmet());

// morgan is an HTTP request logger middleware for node.js.

app.use(morgan("dev"));

app.use(
  cors({
    origin:
      (process.env.ALLOWED_ORIGINS || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean) || "*",

    credentials: true,
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/health",(req,res)=> res.cookie({time: new Date().toISOString()},'OK'))


const PORT = process.env.PORT || 8000;


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})