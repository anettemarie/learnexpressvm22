const express = require ("express");
const router = express.Router();
const fs = require("fs");    const {Sequelize, QueryTypes, DataTypes } = require('sequelize');
let sequelize =  new Sequelize('sqlite:db.sqlite');

const Movie = sequelize.define('Movie', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
name: {
    type: DataTypes.STRING,
    allowNull: false,
},
year: {
    type: DataTypes.STRING,
    allowNull: false,
},
description: {
    type: DataTypes.STRING,
}
}, {tableName: 'movies', timestamps:false});

router.get("/",async (req, res)=> {
    let movies = await Movie.findAll ();
    res.render('movies/index.njk', {movies: movies});
});

router.get('/add', (req, res) => {
    res.render('movies/add.njk');
 });
  
  
 router.post('/add', async (req, res) => {
    await Movie.create ({name:req.body.movie, year:req.body.year, description:req.body.description});
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
    let movie= await Movie.findOne({
        where: {
            id: req.query.id
        }
    });
res.render('movies/view.njk', {movie: movie});
 });

 router.get("/edit/:id", async(req, res) => {
   let movie= await Movie.findOne({
        where: {
            id: req.params.id
        }
    });
    res.render("movies/edit.njk", {movie: movie});
 });

 router.post('/edit/:id', async (req, res) => {
        await Movie.update ({
        name:req.body.movie,
        year:req.body.year,
        description:req.body.description
    } , {
            where: {
                id: req.params.id
            }
 });
     res.redirect('/movies/');
 });
 
 router.get("/delete/:id", async (req, res) => {
    let movie= await Movie.destroy({
        where: {
            id: req.params.id
        }
    });
   res.redirect('/movies/');
 });
module.exports = router;