
exports.up = function(knex, Promise) {
  return knex.schema.createTable('ratings', function (table) {
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
    table.integer('points_id').unsigned();
    table.foreign('points_id').references('points.id').onDelete('CASCADE');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ratings');
};
