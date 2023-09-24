const express = require('express')
const server = express()
const port = 8080;

server.get('/', (request, response) => {
  response.send("ok");
});

server.listen(
  port,
   () => console.log(`Server listening on port ${port}.`));