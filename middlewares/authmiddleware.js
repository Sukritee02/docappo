const jwt = require("jsonwebtoken");
// first validate with jwt  request body as we will be having the token then will call the next token will only call the next token only if its valid
module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Authentication Failed",
          success: false,
        });
      } else {
        // if token is not there then we will not call the next function
        req.body.userId = decoded.id;
        next();
      }
    });
  } catch (error) {
    return res.status(401).send({
      message: "Authentication Failed",
      success: false,
    });
  }
};
