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

server.get(`/hello/:id?`,(request, response) => {
  const { id } = request.params; 
  response.json({status:200, message:`Hello, ${id? id : "anonymous"}`});
});

server.get(`/search`, (request, response) => {
  const {s} = request.query;

  if (s) {
    response.status(200).json({ status: 200, message: 'ok', data:s});
  } else {
    response.status(500).json({ status: 500, error: true, message: 'you have to provide a search' });
  }
});

server.listen( port,() =>  {
console.log(`Server listening on port ${port}.`);});