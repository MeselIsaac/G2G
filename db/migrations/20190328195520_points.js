
exports.up = function(knex, Promise) {
  return knex.schema.createTable('points', function (table) {
    table.increments('id').primary();
    table.integer('curated_area_id').unsigned();
    table.foreign('curated_area_id').references('curated_area.id').onDelete('CASCADE');
    table.text('title');
    table.text('location');
    table.text('description');
    table.text('photo');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('points');
};


