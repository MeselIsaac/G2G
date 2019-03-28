
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('password');
    table.string('email');
    table.text('photo');
    table.text('bio');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
