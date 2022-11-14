const mongoose = require('mongoose');
const fs = require('fs');

const url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/voyce-assignment';

  mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true,

  });