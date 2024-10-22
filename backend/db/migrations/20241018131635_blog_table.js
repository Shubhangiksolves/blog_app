/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('blogs', (table) => {
    table.increments();
    table.string('title').notNullable();
    table.string('preview').notNullable();
    table.string('post').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.hasTable('blogs').then(function(exists) {
    if (exists) {
      return knex.schema.dropTable('blogs');
    }
  })
};
