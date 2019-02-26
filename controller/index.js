const chalk = require('chalk');
const jwt = require('jsonwebtoken');
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

  logIn(req, res) {
    console.log(chalk.yellow('[PATH]:'), chalk.cyanBright(req.path));
    Model.find()
      .then((data) => {
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
        });
      });
  },
};
