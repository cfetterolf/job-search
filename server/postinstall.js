// Create directory for mongoDB
const fs = require('fs');

const dir = './data';

if (process.env.NODE_ENV === 'development' && !fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
