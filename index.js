const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
var cors = require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ubereatclone:ubereatclone12345@cluster0.ensig.mongodb.net/ubereatcloneproject?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    console.log("Database ok");
    const rescollection = client.db("ubereatcloneproject").collection("restaurantdata");
    const orders = client.db("ubereatcloneproject").collection("orders");

    app.get('/', (req, res) => {
        res.send('Hello World Joy!')
    })

    app.post("/resdatapost", (req, res) => {
        const data = req.body
        rescollection.insertOne(data)
            .then(result => {
                res.json("Done Post")
            })
    })
    app.get("/resdatapost", (req, res) => {
        const data = req.query.country;
        // console.log(data)
        rescollection.find({ countryname: data })
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    app.post('/orders', (req, res) => {
        const data = req.body
        console.log(data);
        orders.insertOne(data)
            .then(result => {
                res.json(data)
            })
    })

    app.get('/orders', (req, res) => {
        orders.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})