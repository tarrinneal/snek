const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;
const assetDir = path.resolve('public')

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(assetDir + '/puckman.html');
})

app.listen(port, () => {
  console.log('server listening port: ' + port)
});