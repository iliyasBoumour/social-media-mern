const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ msg: "authorization denied ...!" });

  const secretKey = process.env.jwtKeySecret;
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'authorization denied ...!' });
  }
}

module.exports = auth;
