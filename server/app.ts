import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import 'dotenv/config';
import path from 'path';
import cors from 'cors';

import todos from "./models/todo";
import todo from './models/todo';

const app = express();

const  { PORT, MONGO_URI } = process.env;

app.use('/', express.static("build"));

//body parser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//mongoose setup
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017");
let db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log("connected to mongod server");
})

app.listen(3001, () => {
  console.log(`Example app listening on port 3001`)
})

app.get("/api/get", (req, res) => {
  res.send("donghwan");
});

app.post("/api/post", async (req,res) => {
  const content = req.body.content;
  const newTodos = new todos({
    content: content
  });

  try {
    await newTodos.save();
    console.log(todos.find());
    console.log(newTodos);
    console.log("complete");
  } catch(e) {
    console.log(e);
  }
})