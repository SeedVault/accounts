
exports.up = (knex) => {
  return knex.schema.createTable('users', (t) => {
    t.increments('user_id').primary().unsigned()
    t.string('username', 50).notNullable().unique().index()
    t.string('email', 100).notNullable().unique().index()
    t.string('firstname', 100).notNullable()
    t.string('lastname', 100).notNullable()
    t.integer('country_id').notNullable().references('countries.country_id').unsigned().index().onDelete('RESTRICT')
    t.string('wallet_address').notNullable()
    t.string('password_hash', 100).notNullable()
    t.string('password_reset_code', 10).nullable()
    t.integer('status').notNullable().defaultTo(1)
    t.timestamp('created_at').defaultTo(knex.fn.now())
    t.timestamp('updated_at').defaultTo(knex.fn.now())
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('users')
};
