import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
dotenv.config();

const  { PORT, MONGO_URI } = process.env;

app.use('/', express.static("build"));

//body parser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//mongoose setup
mongoose.Promise = global.Promise;
mongoose.connect( MONGO_URI!);

let db = mongoose.connection;

db.on('error', console.error);
db.once('open', () => {
  console.log("connected to mongod server");
})

mongoose.connect('mongodb://localhost/todos');

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

app.get("/api/get", (req, res) => {
  res.send("donghwan");
});

app.post("/api/post", (req,res) => {
  const content = req.body.content;
  res.send(content);
  console.log(req);
})