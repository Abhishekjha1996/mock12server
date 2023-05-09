const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    const decode = jwt.verify(token, "secretkey");
    if (decode) {
      req.body.userId = decode.userId;
      next();
    } else {
      res.status(404).send({ msg: "Please login first!" });
    }
  } else {
    res.status(404).send({ msg: "Please login first! No token fourn" });
  }
};

module.exports = {
  auth,
};
