const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const {logger} = require('./middleware/logEvents');
const errorHandle = require('./middleware/errorHandle');
const PORT = process.env.PORT || 3500;

// Custom middleware for logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Built-in middleware to handle urlencoded data
app.use(express.urlencoded({ extended: false }));