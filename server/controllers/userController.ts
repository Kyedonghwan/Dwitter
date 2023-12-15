import { NextFunction } from "express";
import User from "../models/User";

export async function createUserController (req:any, res:any) {
  const newUser = new User({
    id: req.body.id,
    password: req.body.password,
    nickname: req.body.nickname,
    introduce: req.body.introduce
  });

  try {
    await newUser.save();
    res.send("complete");
  } catch(e) {
    res.send(e);
  }
}

export async function loginUserController (req:any, res:any) {
  const { id, password } = req.body;
  User.findOne({
    id
  }).then(docs => {
    if(!docs) {
      return res.json({
        loginSuccess: false,
        message: "id와 일치하는 유저가 없습니다."
      })
    }
    docs.comparePassword(password, (err:any, isMatch:any) => {
      if(!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 다릅니다."
        });
        if(err){
          console.log(err);
        }
      const token = docs.generateToken();
      res.cookie("x_auth", token).status(200).json({loginSuccess: true});
    })
  })
}

export async function isLoginPossibleMiddleware (req: any, res: any, next:NextFunction) {
  console.log(req.cookies.x_auth);
  const token =req.cookies.x_auth;
  User.findByToken(token, (err, user) => {
    if(err) throw err;
    if(!user) return res.json({
      isAuth: false,
      error: true
    })
    req.user = user;
    next();
  });
}

export async function isLoginPossibleController (req: any, res: any) {
  res.send("인가 OK");
}