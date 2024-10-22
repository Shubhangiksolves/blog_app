/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("blogs").del();
  await knex("blogs").insert([
    { title: "rowValue1", preview: "acsc", post: "sdsa" },
  ]);
};