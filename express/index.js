const express = require("express");
const postRouters = require("./routes/posts");
const userRouters = require("./routes/users");
const authRouters = require("./routes/auth");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const publicKey = fs.readFileSync(
  path.resolve(__dirname, "./public.key"),
  "utf-8"
);

//db connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  console.log("database connected");
}

const server = express();

// server.use((req, res, next) => {
//   console.log(req.method, req.ip, req.hostname, req.get("User-Agent"));
//   next();
// });
const auth = (req, res, next) => {
  try {
    const token = req.get("Authorization").split("Bearer ")[1];
    console.log(token);
    const decoded = jwt.verify(token, publicKey, { algorithm: "RS256" });
    console.log(decoded);
    if (decoded.email) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.sendStatus(401);
  }
};
server.use(cors());
server.use(express.json()); //this built in midleware used to read req.body
server.use("/api/v1", authRouters.authRouter);
server.use("/api/v1", auth, postRouters.postRouter);
server.use("/api/v1", auth, userRouters.userRouter);
// const auth = (req, res, next) => {

//     console.log(req.query);

//     if(req.body.password === '123') {
//         next();
//     } else {
//         res.status(401).send({status: 'failed'});
//     }
// }

// server.use(auth);

// server.get('/ram', (req, res) => {
//     res.status(200).send('<h1>Jai Shree Ram🚩</h1>');
// })

server.listen(3000, () => {
  console.log("server started");
});
