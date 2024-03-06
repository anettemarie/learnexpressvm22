const express = require ("express");
const router = express.Router();
const fs = require("fs");
const {Sequelize, QueryTypes } = require('sequelize');
let sequelize =  new Sequelize('sqlite:db.sqlite');

router.get("/",async (req, res)=> {
    let movies = await sequelize.query('SELECT * FROM movies;', {type: QueryTypes.SELECT});
    res.render('movies/index.njk', {movies: movies});
});

router.get('/add', (req, res) => {
    res.render('movies/add.njk');
 });
  
  
 router.post('/add', async (req, res) => {
    await sequelize.query(`INSERT INTO movies (name, year, description)
                           VALUES ('${req.body.movie}', ${req.body.year}, '${req.body.description}');`,
     {type: QueryTypes.INSERT});
     res.redirect('/movies/');
 });

    
  router.post("/add", (req, res)=> {
    let movies = fs.readFileSync("movies.json", "utf-8");
    movies = JSON.parse(movies);
    movies.movies.push({
        id: movies.lastId++,
        name: req.body.movie,
        year: req.body.year,
        description: req.body.description
    });


    let json = JSON.stringify(movies);
  fs.writeFileSync("movies.json", json);
  res.redirect("/movies/")
  });


  router.get("/view", async(req, res)=> {
    let id = parseInt(req.query.id);
    let movies = await sequelize.query(`SELECT * FROM movies WHERE id=${id};`, {type: QueryTypes.SELECT}) ;
    let movie= movies [0];
    res.render("movies/view.njk", {movie: movie});

 });
 router.get("/edit/:id", async(req, res) => {
    let id = parseInt(req.params.id);
    console.log(id);
    let movies = await sequelize.query(`SELECT * FROM movies WHERE id=${id};`, {type: QueryTypes.SELECT}) ;
    let movie= movies [0];
    res.render("movies/edit.njk", {movie: movie});

 });

 router.post('/edit/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    await sequelize.query(`UPDATE movies
                           SET name='${req.body.movie}', 
                               year=${req.body.year}, 
                               description='${req.body.description}'
                           WHERE id= ${id};`,
         {type: QueryTypes.UPDATE});
     res.redirect('/movies/');
 });
 
 router.get("/delete/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    let movies = await sequelize.query(`DELETE FROM movies WHERE id=${id};`, {type: QueryTypes.SELECT}) ;
     res.redirect('/movies/');
 });
module.exports = router;