import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express()
const port = 3001

app.use('/', express.static("build"));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get("/api/get", (req, res) => {
  res.send("donghwan");
});

app.post("/api/post", (req,res) => {
  const content = req.body.content;
  res.send(content);
  console.log(req);
})