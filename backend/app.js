// require('dotenv').config();
const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const { port, dbURI, dbOptions } = require('./config/environment');

const placesRoutes = require('./routes/places');
const usersRoutes = require('./routes/users');

// const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));
app.use(express.static(path.join('public')));

// CORS
// DISABLED => When serving both backend and front from the same host, we don't need cors headers.
// app.use((req, res, next) => {
//   // '*' ---> which domain should have access
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
//   next();
// });

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

// eslint-disable-next-line
app.use((req, res, next) => res.sendFile(path.resolve(__dirname, 'public', 'index.html')));

// app.use((req, res, next) => {
//   const error = new HttpError('Could not find this route.', 404);
//   throw error;
// });

app.use((err, req, res, next) => {
  if (req.file) fs.unlink(req.file.path, err => console.log(err));
  if (res.headerSent) return next(err);

  res.status(err.code || 500);
  res.json({ message: err.message || 'An unknown error occurred!' });
});

mongoose
  .connect(dbURI, dbOptions)
  .then(() => app.listen(port, () => console.log(`Express is listening to port ${port}`)))
  .catch((err) => console.log('Connection failed!', err));
