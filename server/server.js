const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');

const config = require('./config');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());

mongoose.connect(config.mongodb.uri, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api', require('./routes/home'));
app.use('/api', require('./routes/login'));
app.use('/api', require('./routes/notepad'));

app.listen(process.env.PORT || 8000);
