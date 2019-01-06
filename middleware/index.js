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

  authorization(req, res, next) {
    const { role } = req.headers;
    if (role === 'user') {
      next();
    } else {
      res.status(401).json({
        message: 'You not have access to do this action !',
      });
    }
  },
};
