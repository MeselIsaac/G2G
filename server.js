
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
//
//You can leave the below convertDates function blanked out because it doesn't work when you add a new map to the DB
//function convertDates(results) {
//   return results.map(result => {
//     var day = result.date_updated.getDay();
//     var month = result.date_updated.getMonth();
//     var year = result.date_updated.getFullYear();
//     var date = day + "-" + month + "-" + year;
//     result.date_updated = date
//     return result
//   });
// }
//browse index/root
app.get("/", (req, res) => {
  let templateVars = {};
  return knex('curated_area')
    .select()
    .then(function (results) {
      res.render("root", { results: results });
    })
})

//browse create page
app.get("/create", (req, res) => {
  res.render("create_map");
});

//browse a map
app.get("/users/maps/:mapid", async (req, res) => {
  const [points, curatedArea] = await Promise.all([
    knex
      .select('*')
      .from('points')
      .where('curated_area_id', '=', req.params.mapid),
    knex
      .select('*')
      .from('curated_area')
      .where('curated_area.id', '=', req.params.mapid)
  ])
  //{coords: lat lng, content: h1whatever}
  const markers = points.map(function (point, index) {
    return {
      coords: { lat: point.lat, lng: point.long },
      content: point.title
    }
  })
  const templateVars = { ...curatedArea[0], markers: JSON.stringify(markers) }
  // console.log("these are the templatevars,", templateVars);

  res.render("map", templateVars)

});

//browse user profile
app.get("/users/:id/", async (req, res) => {
  const [users, curated_area] = await Promise.all([
    knex
      .select('*')
      .from('users')
      .where('id', '=', req.params.id),
    knex
      .select('*')
      .from('curated_area')
      .where('curated_area.user_id', '=', req.params.id)
  ])

  const maps = curated_area.map(function (map) {
    return {
      map
    }
  })

  const templateVars = { ...users[0], maps: JSON.stringify(maps) }
  console.log(templateVars);
  res.render("profile", templateVars)

  //Below is the old app.get request for getting user bio and photo solely from the users table using knex. We replaced it with the above
  //return knex('users')
  //   .select()
  //   .where({ id: req.params.id })
  //   .then(function (results) {
  //     console.log("Results", results);
  //     res.render("profile", { results: results });
  //   });
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
            // console.log('look', rows[0])
            req.session.user_id = rows[0]
            res.redirect('/')
          })
      } else {
        // console.log('here', rows[0].id)
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
      // console.log("GO HERE", goHere)

      res.redirect('/users/maps/' + goHere)
    })


  /* user selects a ceterpoint, generating a new map */
  // res.redirect("/maps/:id")
});

//create a point on a map
app.post("/newPoint", (req, res) => {
  console.log("REQ BODY ID ", req.body.id);
  knex('points').insert({ curated_area_id: req.body.id, title: req.body.title, description: req.body.description, long: req.body.long, lat: req.body.lat })
    .then(function (rows) {
      res.redirect('/')
    })
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
