const jwt = require('jsonwebtoken');

module.exports = {
  authentication(req, res, next) {
    const { token } = req.headers;
    jwt.verify(token, process.env.USER_SECRET, (err) => {
      if (err) {
        res.status(401).json({
          message: 'You not have permission to do this action !',
        });
      } else {
        next();
      }
    });
  },
};
