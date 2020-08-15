const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || 'development';
const dbURI = process.env.MONGODB_URI || `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@places.mhonq.mongodb.net/${process.env.DB_NAME}-${env}?retryWrites=true&w=majority`;
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };
const clientURL = process.env.CLIENT_URL || 'http://localhost:3000';

module.exports = {
  port,
  env,
  dbURI,
  dbOptions,
  clientURL
};