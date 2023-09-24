const express = require('express')
const server = express()
const port = 8080;


server.get('/', (request, response) => {
  response.send("ok");
});

server.get('/test', (request, response) => {
  response.json({status:200, message:"ok"});
});

server.get('/time', (request, response) => {
  const dateTime = new Date();
  response.json({status:200, message:`${dateTime.getHours()}:${dateTime.getMinutes()}`});
});

server.listen( port,() =>  {
console.log(`Server listening on port ${port}.`);});