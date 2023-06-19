const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const postRouter = require("./routes/post");
const hashtagRouter = require("./routes/hashtag");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const db = require("./models");
const passportConfig = require("./passport");
const hpp = require('hpp')
const helmet = require('helmet')
 
dotenv.config();
const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);
app.use(
  cors({
    origin: ["http://localhost:3000", `react-twittie.com`],
    credentials: true,
  })
);

passportConfig();
// dirname join으로 경로 합쳐주기
if(process.env.NODE_ENV === 'production'){
  app.use(morgan('combined'))
  app.use(hpp())
  app.use(helmet());
}else{
  app.use(morgan('dev'))
}
app.use("/", express.static(path.join(__dirname, "uploads")));
app.use(morgan("dev"));
// front에서 받을 데이터의 형식
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    cookie:{
      httpOnly:true,
      secure: false,
      domain: process.env.NODE_ENV === 'production' && '.react-twittie.com'
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
  res.send("hello express");
});
app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/hashtag", hashtagRouter);
app.use("/posts", postsRouter);

// 에러처리 미들웨어
// app.use((err, req, res, next) => {});

app.listen(80, () => {
  console.log("서버 실행 중!");
});
