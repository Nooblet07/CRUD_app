/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE roles CASCADE')
  await knex('roles').del()
  await knex('roles').insert([
    {id: 1, role: 'Inventory-Manager'},
    {id: 2, role: 'Visitor'},
  ]);
};
