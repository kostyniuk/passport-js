const mongoose = require('mongoose');

require('dotenv').config();

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.zirup.mongodb.net/test?retryWrites=true&w=majority`;

const connectDb = async () => {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('connected')
};

module.exports = connectDb;
