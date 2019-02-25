const chalk = require('chalk');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Model = require('../model');

module.exports = {
  signUp(req, res) {
    const { password } = req.body;
    const hash = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
    const newData = {
      ...req.body,
      password: hash,
    };
    const newModel = new Model(newData);
    newModel.save()
      .then((data) => {
        console.log(chalk.blue('[API]: '), chalk.green(req.path));
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
          errorMessage: err.message.split(':')[2].trim(),
        });
      });
  },

  logIn(req, res) {
    Model.find()
      .then((data) => {
        console.log(chalk.blue('[API]: '), chalk.green(req.path));
        if (data.length > 0) {
          res.status(200).json({
            message: 'Data found !',
            data,
          });
        } else {
          res.status(200).json({
            message: 'There is no data !',
            data,
          });
        }
      })
      .catch((err) => {
        console.log(chalk.red('[ERROR]: '), err.message);
        res.status(400).json({
          message: 'Can\'t find data',
          errorMessage: err.message.split(':')[2].trim(),
        });
      });
  },
};
