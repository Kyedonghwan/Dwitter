import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema<IUser>({
  id: { type: String, required:true },
  password: { type: String, required:true },
  nickname: { type: String },
  introduce: { type: String },
  token: { type: String }
});

export interface IUser extends Document {
  id: string;
  password: string
  nickname: string;
  introduce: string;
  token: string;
  comparePassword : (password: string, next: (err: Error | undefined, isMatch: boolean) => void ) => void;
  generateToken : (callback: (err: any| undefined, success: any) => void ) => void;
}

const saltRounds = 10;

userSchema.pre("save", function(next) {
  const user = this;
  if(this.isModified("password")) {
    bcrypt.genSalt(saltRounds, function(err,salt) {
      if(err) return next(err);
      bcrypt.hash(user.password, salt, function(err,hash){
        if(err) return next(err);
        user.password = hash;
        next();
      })
    })
  }
})
//비밀번호 암호화

userSchema.methods.comparePassword = function (plainPassword:string, callback: any ) {
  const user = this;
  bcrypt.compare(plainPassword, user.password, function(err, isMatch) {
    if(err) return callback(err);
    callback(null, isMatch);
  });
}

userSchema.methods.generateToken = function (callback :any) {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  
  user.save(function(err:any, user:any){
    if(err) return callback(err);
    callback(null, user);
  })
}

export default mongoose.model('User', userSchema);