
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('curated_area', function (table) {
            table.decimal('long');
            table.decimal('lat');
            table.dropColumn('centerpoint');
        })
    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.table('curated_area', function (table) {
            table.dropColumn('long');
            table.dropColumn('lat');
            table.text('centerpoint');
        })
    ])
};