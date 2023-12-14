import User from "../models/User";

export async function createUserController (req:any, res:any) {
  const newUser = new User({
    id: req.body.id,
    password: req.body.password,
    nickname: req.body.nickname,
    introduce: req.body.introduce,
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
    docs.comparePassword(req.body.password, (err:any, isMatch:any) => {
      (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 다릅니다."
        });
    })
    docs.generateToken((err:any, user:any) => {
      if(err) return res.status(400).send(err);
      res.cookie("x_auth", user.token).status(200).json({loginSuccess: true, useId: user._id})
    })
  })
}