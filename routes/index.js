const router = require('express').Router();

const {
  authentication,
  authorization,
} = require('../middleware');

const {
  signUp,
  logIn,
} = require('../controller');

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server is live !',
  });
});

router.post('/signUp', signUp);
router.post('/logIn', authentication, authorization, logIn);

module.exports = router;
