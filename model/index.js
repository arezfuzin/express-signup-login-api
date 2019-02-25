const mongoose = require('mongoose');

const validateEmail = (email) => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  console.log(password)
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  console.log(re.test(password))
  return re.test(password);
};

const schema = new mongoose.Schema({
  role: {
    type: String,
    default: 'user',
  },
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
    validate: [validatePassword, "Your password minimum eight characters, at least one letter and one number"],
  },
});

const Dummy = mongoose.model('dummys', schema);

module.exports = Dummy;
