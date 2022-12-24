const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }
  
      const dataObject = JSON.parse(data);
      res.send(dataObject);
    });
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});