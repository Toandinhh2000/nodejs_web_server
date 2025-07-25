const whitelist = [
  'http://localhost:3500',
  'http://127.0.0.1:5500',
  'http://www.yoursite.com',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200, // For legacy browser support
};

module.export = corsOptions;