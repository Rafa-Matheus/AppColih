const fs = require('fs');
const path = require('path');

const pgClientPath = path.resolve(__dirname, 'node_modules', 'pg', 'lib', 'native', 'client.js');

fs.readFile(pgClientPath, 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }

  const result = data.replace("var Native = require('pg-native')", 'var Native = null');

  fs.writeFile(pgClientPath, result, 'utf8', function(err) {
    if (err) return console.log(err);
  });
});