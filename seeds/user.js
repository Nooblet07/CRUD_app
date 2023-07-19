/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: BigInt(1) ,first_name: 'mike', last_name: 'green', username: 'mgreen'},
    {id: BigInt(2) , first_name: 'samantha', last_name: 'shine', username: 'sshine'}
  ]);
};
