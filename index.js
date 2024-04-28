const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// jYZIaOVoYWUFotMz

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cgjyhyw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const artAndCraftCollection = client.db('artAndCraftDB').collection('artAndCraft');


    app.get ('/add', async (req, res) =>{
        const cursor = artAndCraftCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.get('/add/:id', async (req, res) =>{
        const id = req.params.id;
        console.log(id)
        const query = {_id: new ObjectId(id)}
        const result = await artAndCraftCollection.findOne(query);
        res.send(result);
    })

    app.post('/add', async(req, res) =>{
        const newArtAndCraftAdd = req.body;
        console.log(newArtAndCraftAdd);
        const result = await artAndCraftCollection.insertOne(newArtAndCraftAdd);
        res.send(result);
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) =>{
    res.send('Assaigment 10 is running')
})

app.listen(port, () => {
    console.log(`Assaigment 10 is running on port: ${port}`)
})