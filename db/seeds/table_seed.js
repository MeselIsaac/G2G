exports.seed = function (knex, Promise) {

  function deleteUsers() {
    return knex('users').del();
  }

  function deleteCuratedArea() {
    return knex('curated_area').del();
  }
  function deleteFollows() {
    return knex('follows').del();
  }
  function deletePoints() {
    return knex('points').del();
  }
  function deleteRatings() {
    return knex('ratings').del();
  }

  function insertUsers() {
    return knex('users').insert([
      {
        password: '12345',
        email: 'matt@email.com',
        photo: 'https://www.fillmurray.com/284/196',
        bio: 'I am a really cool baby'
      },
      {
        password: '12345',
        email: 'mesel@email.com',
        photo: 'https://www.fillmurray.com/284/196',
        bio: 'I love east york'
      },
      {
        password: '12345',
        email: 'amita@email.com',
        photo: 'https://www.fillmurray.com/284/196',
        bio: 'I am a map genius'
      },
      {
        password: '12345',
        email: 'alex@email.com',
        photo: 'https://www.fillmurray.com/284/196',
        bio: 'I love plank club and miss Michael'
      },
    ]).returning('*');
  }

  function insertCuratedArea() {
    return knex('curated_areas').insert([
      {
        centerpoint: 'long , lat',
        description: 'This map is a map of best loos in london pip, pip',
        date_created: '2018-03-11',
        date_update: '2019-04-12',
        user_id: users[0].id
      },
      {
        centerpoint: 'long , lat',
        description: 'This map is a map of best toilets in churonna',
        date_created: '2018-05-11',
        date_update: '2019-03-03',
        user_id: users[1].id
      },
      {
        centerpoint: 'long , lat',
        description: 'This map is a map of best urinals in brampton',
        date_created: '2017-03-10',
        date_update: '2018-05-08',
        user_id: users[2].id
      },
      {
        centerpoint: 'long , lat',
        description: 'This map is a map of luxury bathrooms in york',
        date_created: '2018-01-01',
        date_update: '2019-01-02',
        user_id: users[3].id
      }
    ])
  }

  // function insertPoints() {
  //   return knex('points').insert([
  //     {/*what goes here?*/ },
  //     {/*what goes here?*/ },
  //     {/*what goes here?*/ },
  //     {/*what goes here?*/ },
  //   ])
  // }


  // function insertFollows() {
  //   return knex('follows').insert([
  //     {/*what goes here?*/ },
  //     {/*what goes here?*/ },
  //     {/*what goes here?*/ },
  //     {/*what goes here?*/ },
  //   ])
  // }

  // function insertRatings() {
  //   return knex('ratings').insert([
  //     {/*what goes here?*/ },
  //     {/*what goes here?*/ },
  //     {/*what goes here?*/ },
  //     {/*what goes here?*/ },
  //   ])
  // }

  return deleteCuratedArea()
    .then(deleteUsers)
    .then(insertUsers)
    .then(users => insertCuratedArea(users));



}