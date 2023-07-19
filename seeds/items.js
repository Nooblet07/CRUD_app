/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {id: parseInt(1), user_id: 1, item_name: 'macbook air', description: 'macbook air laptop', quantity: '5'},
    {id: parseInt(2), user_id: 2, item_name: 'samsung galaxy 21', description: 'samsung cellphone', quantity: '10'},
  ]);
};
