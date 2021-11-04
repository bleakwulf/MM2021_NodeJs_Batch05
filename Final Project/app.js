const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const dotenv = require('dotenv');
const express = require('express');

const eventsRouter = require('./routers/eventRouter');
const memberRouter = require('./routers/memberRouter');
const attendanceRouter = require('./routers/attendanceRouter');

dotenv.config({ path: './config/config.env' });
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use('/api/events', eventsRouter);
app.use('/api/members', memberRouter);
app.use('/api/attendance', attendanceRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
      result: 'Internal Error',
      errorMessage: err.message
  });
});

app.listen(port, () => {
  console.log(chalk.yellowBright.bold(`Welcome to Node JS Batch 5 | FInal Project : Events API!`));
  console.log(chalk.yellowBright.bold(`Server is running in ${process.env.NODE_ENV} mode on port: ${port}`));
});