exports.up = (knex) => {
  return knex.schema.createTable('countries', (t) => {
    t.increments('country_id').primary().unsigned();
    t.string('english_short_name', 100).notNullable().unique().index();
    t.string('iso_3166_1_alpha2_code', 2).notNullable().unique();
    t.string('iso_3166_1_alpha3_code', 3).notNullable().unique();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('countries');
};
