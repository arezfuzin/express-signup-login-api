require('dotenv').config();
const chalk = require('chalk');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes');

const app = express();
const port = process.env.PORT || 3000;
const db = mongoose.connection;

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

mongoose.connect(`${process.env.MONGO_DB_CONNECTION}`);
db.on('open', () => {
  console.log(chalk.blue('[API]: '), chalk.green('Connected to Database !!'));
});
db.on('error', () => {
  console.log(chalk.blue('[API]: '), chalk.red('Database not Connected !!'));
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

app.listen(port, console.log(chalk.blue('[API]: '), chalk.green('Connected to Port !!')));
