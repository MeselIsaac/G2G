
exports.up = function(knex, Promise) {
  return knex.schema.createTable('follows', function (table) {
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
    table.integer('curated_area_id').unsigned();
    table.foreign('curated_area_id').references('curated_area.id').onDelete('CASCADE');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('follows');
};
