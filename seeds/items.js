/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {user_id: 1, item_name: 'macbook air', description: 'macbook air laptop', quantity: '5'},
    {user_id: 2, item_name: 'samsung galaxy 21', description: 'samsung cellphone', quantity: '10'},
  ]);
};
