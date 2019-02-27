const chalk = require('chalk');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const Model = require('../model');

module.exports = {
  signUp(req, res) {
    console.log(chalk.yellow('[PATH]:'), chalk.cyanBright(req.path));
    const newModel = new Model(req.body);
    newModel.save()
      .then((data) => {
        const responseData = {
          id: data.id,
          userName: data.userName,
          email: data.email,
        };
        const token = jwt.sign(responseData, process.env.USER_SECRET);
        res.status(200).json({
          message: 'Account Created !',
          data: responseData,
          token,
        });
      })
      .catch((err) => {
        console.log(chalk.red('[ERROR]: '), err.message);
        res.status(400).json({
          message: 'Can\'t create account',
        });
      });
  },

  signIn(req, res) {
    console.log(chalk.yellow('[PATH]:'), chalk.cyanBright(req.path));
    const { email, password } = req.body;
    Model.findOne({ email })
      .then((data) => {
        const isMatch = bcryptjs.compareSync(password, data.password);
        if (isMatch) {
          const responseData = {
            id: data.id,
            userName: data.userName,
            email: data.email,
            role: data.role,
          };
          const token = jwt.sign(responseData, process.env.USER_SECRET);
          res.status(200).json({
            message: 'Loging in !',
            data: responseData,
            token,
          });
        } else {
          res.status(200).json({
            message: 'Wrong password !',
          });
        }
      })
      .catch((err) => {
        console.log(chalk.red('[ERROR]: '), err.message);
        res.status(400).json({
          message: 'Email wrong !',
        });
      });
  },
};
