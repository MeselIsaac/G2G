
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('points', function (table) {
            table.decimal('long');
            table.decimal('lat');
            table.dropColumn('location');
        })
    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.table('points', function (table) {
            table.dropColumn('long');
            table.dropColumn('lat');
            table.text('location');
        })
    ])
};