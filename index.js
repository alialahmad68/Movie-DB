const express = require('express')
const server = express()
const port = 8080;

const movies = [
  { title: 'Jaws', year: 1975, rating: 8 },
  { title: 'Avatar', year: 2009, rating: 7.8 },
  { title: 'Brazil', year: 1985, rating: 8 },
  { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]


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

server.get(`/movies/create`,(request, response) => {
  response.send("create movie");
});

server.get(`/movies/read/:sort?`,(request, response) => {

const{sort}=request.params;

  if(!sort){
  response.json({status:200, data:movies});
   
   }else if(sort==='by-date'){
    let sortedByYear=[...movies].sort((a, b) => a.year - b.year);
    response.json({status:200, data:sortedByYear});
   }
  else if(sort==='by-rating'){
    let sortedByRating=[...movies].sort((a, b) => b.rating-a.rating);
    response.json({status:200, data:sortedByRating});
  }
  else if(sort==='by-title'){
    let sortedByTitle=[...movies].sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
    response.json({status:200, data:sortedByTitle});
  }
  else{
    response.json({status:200, data:"ok"});
  }
});

server.get(`/movies/update`,(request, response) => {
  response.send("update movie");
});

server.get(`/movies/delete`,(request, response) => {
  response.send("delete movie");
});

server.get(`/movies/read/id/:id?`,(request, response) => {
  const { id } = request.params; 
  const movie = movies.find((movie) => movie.id === id);

  if (movie) {
    response.json({status:200, data:movie});
  } else {
    response.status(404).json({ status: 404, error: true, message: `Movie of this ID=${id} not found` });
  }
});

server.get('/movies/add', (request, response) => {
  const { title, year, rating } = request.query;

  if (!title || isNaN(year) || year.length !== 4) {
    response.status(403).json({status:403, error:true, message:'you cannot create a movie without providing a title and a year'});
    return;
  }
  const newRating = rating || 4;

  movies.push({ title: title, year: year, rating:parseFloat(newRating)});
  response.status(200).json({ status: 200, data: movies });
});

server.get(`/movies/delete/:id?`,(request, response) => {
  const { id } = request.params; 
  const Index = movies.findIndex((movie) => movie.id == id);

  if (Index !== -1) {
    movies.splice(Index, 1);
    response.json({ status: 200, data: movies });
  } else {
    response.status(404).json({ status: 404, error: true, message: `the movie ${id} does not exist` });
  }
});

server.listen( port,() =>  {
console.log(`Server listening on port ${port}.`);});