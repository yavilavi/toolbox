const jwt = require('jsonwebtoken');

const { TOKEN_SECRET } = process.env;
const isAuthorizedMiddleware = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (token && token !== '') {
      jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
        if (err) {
          res.status(401).json({
            isLoggedIn: false,
            authChecked: true,
          });
        }
        if (decoded.user_id) {
          req.user = {};
          req.user.id = decoded.user_id;
          next();
        }
      });
    } else {
      res.status(401).json({
        isLoggedIn: false,
        authChecked: true,
      });
    }
  } else {
    res.status(401).json({
      isLoggedIn: false,
      authChecked: true,
    });
  }
};
module.exports = {
  isAuthorizedMiddleware,
};
