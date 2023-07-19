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
app.get('/users', async (req, res) => {
  try {
    const user = await knex('users').select();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred retrieving users.' });
  }
});


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

// Create a new user
app.post('/users', async (req, res) => {
  const { first_name, last_name, username } = req.body;
  // const hashedPass = await bcrypt.hashsync(password, 10)
    try{
      const newUser = {
        // id: BigInt(id),
        first_name: first_name,
        last_name: last_name,
        username: username
        // role_id: role_id
        // password: hashedPass
      };

      let [addedUser] = await knex('users')
      .insert(newUser)
      .returning('*');

      // addedUser = addedUser.map(user => {
      //   delete user.password;
      //   return user;last_name;
      // })
      res.status(201).json(addedUser);
    } catch (err) {
      res.status(500).json({ message: "Error adding new user"});
    }
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, username } = req.body;

  try {
    const updatedUser = await knex('users')
      .where({ id: BigInt(id) })
      .update({ first_name, last_name, username })
      .returning('*');

    if (updatedUser.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred updating the user.' });
  }
});

// Delete an item by ID
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await knex('users').where({ id }).del();
    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred deleting user.' });
  }
});

// Retrieve all items
app.get('/items', async (req, res) => {
  try {
    const items = await knex('items').select();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred retrieving items.' });
  }
});

app.get('/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const items = await knex('items')
      .select('*')
      .where('id', parseInt(id)); // Update the where clause
    res.json(items);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error retrieving item data' });
  }
});

// Create a new item
app.post('/items', async (req, res) => {
  const { id, user_id, item_name, description, quantity } = req.body; // Add "id" to the destructured variables
  try {
    const newItem = {
      id: parseInt(id), // Make sure id is present in the request body
      user_id: user_id,
      item_name: item_name,
      description: description,
      quantity: quantity,
    };

    let [addedItem] = await knex('items').insert(newItem).returning('*');

    res.status(201).json(addedItem);
  } catch (err) {
    res.status(500).json({ message: 'Error adding new item' });
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
