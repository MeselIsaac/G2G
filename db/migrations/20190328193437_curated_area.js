
exports.up = function(knex, Promise) {
  return knex.schema.createTable('curated_area', function (table) {
    table.increments('id').primary();
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
    table.text('centerpoint');
    table.text('description');
    table.date('date_created');
    table.date('date_updated');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('curated_area');
};

