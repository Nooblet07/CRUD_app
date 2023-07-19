const express = require('express');
const app = express();
const port = process.env.PORT || 3030;
const { Pool } = require('pg');
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);
const cors = require('cors');

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'inventory',
  password: 'docker',
  port: 5432,
});

app.use(express.json());
app.use(cors());

// app.listen(port, () => {
//   console.log('Your Knex and Express application are running successfully!')
// })

app.get('/', (req, res) => {
  res.send('Application is running')
})

// Retrieve all users
app.get('/users/:id', async (req, res) => {
  const {id} = req.params
  try {
    const user = await knex('users')
    .select('*')
    .where('id', BigInt(id))
    res.json(user)
  } catch (err){
    console.log(err)
    res.status(500).json({message:"Error retrieving user data"})
    }
})

// Retrieve all items
app.get('/items', async (req, res) => {
  try {
    const items = await knex('items').select();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred retrieving items.' });
  }
});

// Create a new user
app.post('/users', async (req, res) => {
  const { first_name, last_name, username } = req.body;
  try {
    const newUser = await knex('users').insert({ first_name, last_name, username }).returning('*');
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred creating a new user.' });
  }
});

// Create a new item
app.post('/items', async (req, res) => {
  const { user_id, item_name, description, quantity } = req.body;
  try {
    const newItem = await knex('items').insert({ user_id, item_name, description, quantity }).returning('*');
    res.status(200).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred creating a new item.' });
  }
});

// Update an item by ID
app.put('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { item_name, description, quantity } = req.body;
  try {
    const updatedItem = await knex('items')
      .where({ id })
      .update({ item_name, description, quantity })
      .returning('*');
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred updating the item.' });
  }
});

// Delete an item by ID
app.delete('/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await knex('items').where({ id }).del();
    res.status(200).json({ message: 'Item deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred deleting the item.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
