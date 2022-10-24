require("dotenv").config();
// const express = require("express");
import express from "express";
const app = express();

let cors = require("cors");
//Allowing CORS to FRONTEND reqs in another domain
app.use(cors());
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// const mongoose = require("mongoose");
// const userRouter = require("../routes/public/user");
// const boardRouter = require("../routes/private/board");
// const noteRouter = require("../routes/private/note");
// const bp = require("body-parser");
import mongoose from "mongoose";
import userRouter from "./routes/public/user";
import boardRouter from "./routes/private/board";
import noteRouter from "./routes/private/note";
import bp from "body-parser";

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(userRouter);
app.use(boardRouter);
app.use(noteRouter);

// db connection
const mongoDBconnection: string | undefined = process.env.MONGO_DB_URL;

if (mongoDBconnection) {
  mongoose.connect(mongoDBconnection);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("MongoDB Connected successfully");
  });
}

app.listen(process.env.PORT || 3001, () => {
  console.log("Alive");
});
