
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('curated_area', function (table) {
            table.text('title');
        })
    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.table('curated_area', function (table) {
            table.dropColumn('title');
        })
    ])
};