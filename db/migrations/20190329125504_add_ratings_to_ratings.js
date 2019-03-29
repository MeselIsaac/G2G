
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('ratings', function (table) {
            table.integer('rating');
        })
    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.table('ratings', function (table) {
            table.dropColumn('rating');
        })
    ])
};
