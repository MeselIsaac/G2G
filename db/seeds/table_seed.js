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
        id: 1,
        password: '12345',
        email: 'matt@email.com',
        photo: 'https://www.fillmurray.com/284/196',
        bio: 'I am a really cool baby',
      },
      {
        id: 2,
        password: '12345',
        email: 'mesel@email.com',
        photo: 'https://www.fillmurray.com/284/196',
        bio: 'I love east york'
      },
      {
        id: 3,
        password: '12345',
        email: 'amita@email.com',
        photo: 'https://www.fillmurray.com/284/196',
        bio: 'I am a map genius'
      },
      {
        id: 4,
        password: '12345',
        email: 'alex@email.com',
        photo: 'https://www.fillmurray.com/284/196',
        bio: 'I love plank club and miss Michael'
      },
    ]).returning('*');
  }

  function insertCuratedArea(users) {
    return knex('curated_area').insert([
      {
        id: 1,
        title: 'My new Toronto map',
        description: 'Toronto empty map',
        date_created: '2018-03-11',
        date_updated: '2019-04-12',
        user_id: users[0].id,
        long: -79.387,
        lat: 43.652
      },
      {
        id: 2,
        title: 'My new Vancouver map',
        description: 'This map is Vancouver with 1 point',
        date_created: '2018-05-11',
        date_updated: '2019-03-03',
        user_id: users[1].id,
        long: -123.132,
        lat: 49.273
      },
      {
        id: 3,
        title: 'My popular Toronto map',
        description: 'Toronto map with 2 points',
        date_created: '2017-03-10',
        date_updated: '2018-05-08',
        user_id: users[2].id,
        long: -79.387,
        lat: 43.652
      },
      {
        id: 4,
        title: 'My unpopular Toronto map',
        description: 'Toronto map with 1 point',
        date_created: '2018-01-01',
        date_updated: '2019-01-02',
        user_id: users[3].id,
        long: -79.387,
        lat: 43.652
      }
    ]).returning('*')
      .then(areas => [users, areas]);
  }

  function insertFollows(values) {
    let [users, area] = values;
    return knex('follows').insert([
      { user_id: users[0].id, curated_area_id: area[0].id },
      { user_id: users[1].id, curated_area_id: area[1].id },
      { user_id: users[2].id, curated_area_id: area[2].id },
      { user_id: users[3].id, curated_area_id: area[3].id },
    ]).returning('*')
      .then(areas => [users, areas]);
  }

  function insertPoints() {
    return knex('points').insert([
      {
        id: 1,
        curated_area_id: 2,
        title: 'Vancouver\'s best bathroom',
        description: 'The cleanest in town!',
        photo: 'http://placekitten.com/200/138',
        long: -123.134,
        lat: 49.279
      },
      {
        id: 2,
        curated_area_id: 3,
        title: 'OCAD bathroom',
        description: 'The artiest in town!',
        photo: 'http://placekitten.com/200/138',
        long: -79.392,
        lat: 43.652
      },
      {
        id: 3,
        curated_area_id: 3,
        title: 'Lighthouse bathroom',
        description: 'Enjoy the saloon doors!',
        photo: 'http://placekitten.com/200/138',
        long: -79.401,
        lat: 43.644
      },
      {
        id: 4,
        curated_area_id: 4,
        title: 'Skydome urinals',
        description: 'The urinal cakes smell like twinkies!',
        photo: 'http://placekitten.com/200/138',
        long: -79.389,
        lat: 43.461
      },
    ])

  }

  function insertRatings() {
    return knex('ratings').insert([
      { user_id: 1, points_id: 1, rating: 4 },
      { user_id: 2, points_id: 2, rating: 3 },
      { user_id: 3, points_id: 3, rating: 5 },
      { user_id: 4, points_id: 4, rating: 1 },
    ])
  }

  return deleteRatings()
    .then(deletePoints)
    .then(deleteFollows)
    .then(deleteCuratedArea)
    .then(deleteUsers)
    .then(insertUsers)
    .then(insertCuratedArea)
    .then(insertFollows)
    .then(insertPoints)
    .then(users => insertRatings(users))
}