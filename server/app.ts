import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import 'dotenv/config';
import path from 'path';
import cors from 'cors';
import Todos from "./models/Todo";
import rootRouter from './routers/rootRouter';
import { createUserController, loginUserController } from './controllers/userController';
import cookies from "cookie-parser";

const app = express();

const  { PORT, MONGO_URI } = process.env;

app.use('/', express.static("build"));

//body parser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookies());

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

app.get("/api/get", async (req, res) => {
  const findTodos = await Todos.find();
  res.send(findTodos);
  console.log(findTodos);
});

app.post("/api/post", async (req,res) => {
  const content = req.body.content;
  const newTodos = new Todos({
    id: Date.now(),
    content: content
  });

  try {
    await newTodos.save();
    res.send("complete");
  } catch(e) {
    res.send(e);
  }
})

app.use("/api", rootRouter);

app.post("/api/user/create", createUserController);
app.post("/api/user/login", loginUserController);