const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('server running on localhost');
});

const uri =
  'mongodb+srv://simple-user1:mbcQdLUIMmBFz0QP@cluster0.vtstx9a.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// send data to mongodb server

async function run() {
  try {
    const userCollection = client.db('UserNode').collection('Users');
    // const user = {name: 'Asif', email: 'mah@gmail.com'}
    // const result = await userCollection.insertOne(user);
    app.post('/users', async(req, res) => {
        console.log('post api called');
        const user = req.body;
        user._id = users.insertedId;
        const result = await userCollection.insertOne(user);
        console.log(result);
        res.send(user);
      });
    
  } finally {
  }
}

// run().catch(console.dir);
run().catch((error) => console.log(error));

/* client.connect((err) => {
  const collection = client.db('simpleNode').collection('users');
  // perform actions on the collection object
  console.log('database connected');
  client.close();
}); */

const users = [
  { id: 1, name: 'Sabila Nur', email: 'sabilanur@gmail.com' },
  { id: 2, name: 'Bidya Sinha Saha', email: 'bidyasinhasaha@gmail.com' },
  { id: 3, name: 'Mehazabien Chowdhury', email: 'mehazabienchowdhury@gmail.com' },
  { id: 4, name: 'Mahiya Mahi', email: 'mahiyamahi@gmail.com' },
  { id: 5, name: 'Tanjin Tisha', email: 'tanjintisha@gmail.com' },
];

app.get('/users', (req, res) => {
  // filter search by query
  if (req.query.name) {
    const search = req.query.name;
    const filteredUsers = users.filter((fUser) => fUser.name.toLowerCase().indexOf(search) >= 0);
    res.send(filteredUsers);
  } else {
    res.send(users);
    console.log(req.query);
  }
});

/* app.post('/users', (req, res) => {
  console.log('post api called');
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  console.log(user);
  res.send(user);
}); */

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
