
"use strict";
require('dotenv').config();
// require('./public/scripts/app.js');

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
var cookieSession = require('cookie-session');
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

app.use(cookieSession({
  name: 'session',
  keys: ['keyboard'],

  //Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

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

//browse index/root
app.get("/", (req, res) => {
  let templateVars = {};
  console.log("I AM HERE _____________");
  // in here, join the points entity so that we can use their coords as template vars.
  return knex('curated_area')
    .select()
    .then(function (result) {
      res.render("root", {results: result});
    })
})

//browse create page
app.get("/create", (req, res) => {
  res.render("create_map");
});

//browse a map
// app.get("/users/maps/:mapid", (req, res) => {
//   let templateVars = {};
//   return knex('curated_area')
//     .select()
//     .where({ id: req.params.mapid })
//     console.log("RETURN REQ PARAMIS==============", req.params.mapid)
//     .then(function (result) {
//       for (let key in result) {
//         templateVars = {
//           long: result[key].long,
//           lat: result[key].lat,
//           title: result[key].title,
//           description: result[key].description
//         }
//       }
//       console.log(templateVars);
//       res.render("map", templateVars);
//     })

// });

app.get("/users/maps/:mapid", async (req, res) => {
  const [points, curatedArea] = await Promise.all([
    knex('points')
      .select()
      .where('curated_area_id', '=', req.params.mapid),
    knex
      .select('*')
      .from('curated_area')
      .where('curated_area.id', '=', req.params.mapid)
  ])


  // let templateVars;
  // const curatedArea = await knex
  //   .select('*')
  //   .from('curated_area')
  //   // .join('points', 'curated_area.id', '=', 'points.curated_area_id')
  //   .where('curated_area.id', '=', req.params.mapid)

  //{coords: lat lng, content: h1whatever}
  const markers = points.map(function (point, index) {

    return {
      coords: { lat: point.lat, lng: point.long },
      content: point.title

    }
  })

  const templateVars = { ...curatedArea[0], markers: markers }
  console.log(templateVars);

  res.render("map", templateVars)
//---TO HERE__________________________________________________________

  // const pointsVars = await knex('points')
  //   .select()
  //   .where('curated_area_id', '=', req.params.mapid)
  // console.log(pointsVars);


  // res.render("map", { ...templateVars, pointsVars });
  // //   // res.render("map", templateVars);
  // })

//AND ALSO THIS BELOW___________
});
//ABOVE THIS ------------------
//browse user profile
app.get("/users/:id/", (req, res) => {
  res.render("profile");
});

//view point data
app.get("/maps/:mapid/:point", (req, res) => {
  res.render(/*maps id where point is*/)
})





//------------POST REQUEST--------------

//login taken from https://web.compass.lighthouselabs.ca/activities/352/lectures/2381 a get masquerading as a post

app.post('/', (req, res) => {

  knex('users').select('id').where({ email: req.body.email, password: req.body.password })
    .asCallback(function (err, rows) {
      if (err) {
        res.status(500).end()
        return
      } else if (rows[0] === undefined) {
        knex('users').insert({ password: req.body.password, email: req.body.email }).returning('id')
          .asCallback(function (rows) {
            if (err) {
              res.status(500).end()
              return
            }
            console.log('look', rows[0])
            req.session.user_id = rows[0]
            res.redirect('/')
          })
      } else {
        console.log('here', rows[0].id)
        req.session.user_id = rows[0].id
        res.redirect('/');
      }
    })

});

//logout
app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/login/");
});

//create a new map
app.post("/create", (req, res) => {

  knex('curated_area').insert({ user_id: req.session.user_id, title: req.body.title, description: req.body.description, long: req.body.long, lat: req.body.lat }).returning('id')
  .then(function (rows) {
    let goHere = rows[0]
    console.log("GO HERE", goHere)

      res.redirect('/users/maps/' + goHere)
    })


  /* user selects a ceterpoint, generating a new map */
  // res.redirect("/maps/:id")
});

//create a point on a map
app.post("/newPoint", (req, res) => {
var obj = JSON.parse(req.body.myArray)
console.log("DESC------------------------------------------>", req.body.description)
console.log(obj)


// console.log("CURATED MAP ID=====", req.body.id)
// console.log(window.location.pathname.slice(12))
// console.log(obj)
//   console.log("OBJECT", obj)
//   console.log("OBJECT[0]", obj[0])
//   console.log("OBJECT[0].LATTTTT", obj[0].lat)
//   console.log("OBJECT[0].LOOOOOOONNNG", obj[0].long)

// knex('points').insert({curated_area_id: req.params.id, title: req.body.title, description: req.body.description, long: req.body.long, lat: req.body.lat })
  for (var i = 0; i < obj.length; i++) {
    // console.log("OBJECt LOOP --------------------->", obj[i].long "         " obj[i].lat)
  knex('points').insert({curated_area_id: req.body.id, long: obj[i].long, lat: obj[i].lat, title: req.body.title, description: req.body.description})
  .then(function (rows) {

    console.log("ROWWWWWW -------->", rows)

      res.redirect('/')
    })
  /*post a point to a map here*/
}
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
