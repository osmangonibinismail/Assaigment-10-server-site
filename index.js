const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// jYZIaOVoYWUFotMz

// middleware
// app.use(cors());
const corsOptions = {
    origin: ['http://localhost:5173', 'https://assaigment-10-client-site.web.app'],
    credentials: true,
    optionSuccessStatus: 200,
  }
  app.use(cors(corsOptions))
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })
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
    // await client.connect();

    const artAndCraftCollection = client.db('artAndCraftDB').collection('artAndCraft');
    const userCollection = client.db('artAndCraftDB').collection('user');
    const craftCollection = client.db('artAndCraftDB').collection('carftCollection');
    const craftItemCollections = client.db('artAndCraftDB').collection('craftItemCollection');

    // my art
    app.get ('/add', async (req, res) =>{
        const cursor = artAndCraftCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    
    app.post('/add', async(req, res) =>{
        const newArtAndCraftAdd = req.body;
        console.log(newArtAndCraftAdd);
        const result = await artAndCraftCollection.insertOne(newArtAndCraftAdd);
        res.send(result);
    })

    app.delete('/add/:id', async (req, res) =>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await artAndCraftCollection.deleteOne(query);
        res.send(result);

    })

    // app.get('/myArt/:email', async (req, res) =>{
    //     console.log(req.params.email);
    //     const result = await artAndCraftCollection.find({email: req.params.email}).toArray();
    //     res.send(result);
    // })
    //   updated
    app.get('/add/:id', async (req, res) =>{
        const id = req.params.id;
        console.log(id)
        const query = {_id: new ObjectId(id)}
        const result = await artAndCraftCollection.findOne(query);
        res.send(result);
    })


    app.put('/add/:id', async(req, res) => {
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)}
        const options = {upsert : true };
        const artAndCraftUpdated = req.body
        const artAndCraft = {
            $set:{
                name: artAndCraftUpdated.name,
                Subcategory: artAndCraftUpdated.Subcategory,
                Price: artAndCraftUpdated.Price,
                Rating: artAndCraftUpdated.Rating,
                description: artAndCraftUpdated.description,
                processing_time: artAndCraftUpdated.processing_time,
                customization: artAndCraftUpdated.customization,
                stockStatus: artAndCraftUpdated.stockStatus,
                photoURL: artAndCraftUpdated.photoURL,
            }

            }
            const result = await artAndCraftCollection.updateOne(filter, artAndCraft, options);
            res.send(result);
    })
    // craft item     1111111111
    app.get('/craftItem', async(req, res) => {
        const cursor = craftCollection.find();
        
        console.log('hlw')
        const crafts = await cursor.toArray();
        res.send(crafts);
    })

    app.post('/craftItem', async(req, res) => {
        const craftItem = req.body;
        console.log(craftItem);
        const result = await craftCollection.insertOne(craftItem);
        res.send(result);
    });
    // craft item 22222222
    app.get('/craftItems', async(req, res) => {
        const cursor = craftItemCollections.find();
        
        console.log('hi')
        const crafts = await cursor.toArray();
        res.send(crafts);
    })

    app.post('/craftItems', async(req, res) => {
        const craftItems = req.body;
        console.log(craftItems);
        const result = await craftItemCollections.insertOne(craftItems);
        res.send(result);
    });

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