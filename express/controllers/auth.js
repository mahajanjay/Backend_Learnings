const jwt = require("jsonwebtoken");
const model = require("../model/user");
const fs = require("fs");
const path = require("path");
const bcrypt  = require("bcrypt");
const User = model.User;

const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../private.key"),
  "utf-8"
);

exports.createUser = (req, res) => {
  const user = new User(req.body);
  const token = jwt.sign({ email: req.body.email }, privateKey, {
    algorithm: "RS256",
  });
  user.token = token;
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  user.password = hashedPassword;
  user.save().then(
    (doc) => {
      console.log(doc);
      res.status(201).json({token});
    },
    (err) => {
      console.log(err);
      res.status(400).json(err);
    }
  );
};

exports.login = async (req, res) => {
  try {    
    const user = await User.findOne({email: req.body.email});
    const isAuth = bcrypt.compareSync(req.body.password, user.password);
    if(isAuth) {
      const token = jwt.sign({email: req.body.email}, privateKey, {
        algorithm: "RS256",
      });
      user.token = token;
      user.save();
      res.json({token});
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(401).json(err);
  }
}
