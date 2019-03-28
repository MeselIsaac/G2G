"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));



//-------------GET REQUESTS------------

//brows index/root 
app.get("/", (req, res) => {
  res.render("root");
});

//browse create page
app.get("/create", (req, res) => {
  res.render(/* create ejs goes here */);
});

//browse a map
app.get("users/maps/:mapid", (req, res) => {
  res.render("maps/:mapid");
});

//browse user profile
app.get("users/:id", (req, res) => {
  res.render("users/:id");
});

//view point data
app.get("maps/:mapid/:point", (req, res) => {
  res.render(/*maps id where point is*/)
})



//------------POST REQUEST--------------

//login taken from https://web.compass.lighthouselabs.ca/activities/352/lectures/2381 a get masquerading as a post
app.get('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  resonse.redirect('/');
});

//logout
app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/login/");
});

//create a new map
app.post("/map", (req, res) => {
  /* user selects a ceterpoint, generating a new map */
  res.redirect("/maps/:id")
});

//create a point on a map
app.post("/maps/:mapid/:point", (req, res) => {
  /*post a point to a map here*/
})

//----------- PUT REQUESTS---------------

//edit a point on a map
app.put("/maps/:mapid/:point", (req, res) => {
  /* some edity stuff this will relate closely to the create point route */
})



//------------ DELETE REQUESTS ---------

//delete map!
app.delete("/maps/:id", (req, res) => {
  const mapToDelete = req.param("id");
  /* query with mapToDelete and knex remove the mapid from db */
  res.redirect("root");
})

//delete point
app.delete("/maps/:id/:point", (req, res) => {
  const pointToDelete = req.param("point");
  /* query point in db and knex remove the pointid from db */
})





app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
