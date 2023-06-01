exports.isLoggedIn = (req, res, next) => {
  // req.isAuthenticated() = true ? 로그인한 상태
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("로그인이 필요합니다");
  }
};
exports.isNotLoggedIn = (req, res, next) => {  
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("로그인이 필요합니다");
  }
};
