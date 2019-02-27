const router = require('express').Router();

const {
  authentication,
} = require('../middleware');

const {
  signUp,
  signIn,
} = require('../controller');

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server is live !',
  });
});

router.post('/sign-up', signUp);
router.post('/sign-in', authentication, signIn);

module.exports = router;
