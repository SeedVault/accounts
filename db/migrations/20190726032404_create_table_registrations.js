exports.up = (knex) => {
  return knex.schema.createTable('registrations', (t) => {
    t.increments('registration_id').primary().unsigned()
    t.string('username', 50).notNullable().unique().index()
    t.string('email', 100).notNullable().unique().index()
    t.string('firstname', 100).notNullable()
    t.string('lastname', 100).notNullable()
    t.integer('country_id').notNullable().references('countries.country_id').unsigned().index().onDelete('RESTRICT')
    t.string('password_hash', 100).notNullable()
    t.timestamp('created_at').defaultTo(knex.fn.now())
    t.timestamp('updated_at').defaultTo(knex.fn.now())
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('registrations')
};
