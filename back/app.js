const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const db = require("./models");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const app = express();
const dotenv = require("dotenv");
const morgan = require('morgan')

dotenv.config();
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);
const passportConfig = require("./passport");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
passportConfig();
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
  res.send("hello express");
});

app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/posts", postsRouter);

// 에러처리 미들웨어
// app.use((err, req, res, next) => {});

app.listen(3065, () => {
  console.log("서버 실행 중!");
});
