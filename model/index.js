const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const validateEmail = (email) => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/;
  console.log('password: ', password);
  console.log('re.test(password): ', re.test(password));
  return re.test(password);
};

const schema = new mongoose.Schema({
  userName: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: [validateEmail, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    default: null,
    required: true,
    validate: [validatePassword, 'Your password minimum eight characters, at least one letter and one number'],
  },
});

schema.pre('save', function before(next) {
  const hash = bcryptjs.hashSync(this.password, bcryptjs.genSaltSync(10));
  this.password = hash;
  next();
});

const Dummy = mongoose.model('dummys', schema);

module.exports = Dummy;
