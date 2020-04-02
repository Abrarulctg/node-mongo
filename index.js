const express = require('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;


const app = express();

app.use(cors());
app.use(bodyParser.json());


const user = "dbUser";
const password = "@abc123@";
const uri = "mongodb+srv://dbUser:@abc123@@cluster0-tdttw.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true });
const users = ["Abrar", "Nasim", "Lubs", "Shadin", "Sakib"]


app.get('/users/:id', (req, res)=> {
    const id = req.params.id;
    const name = users[id];
    res.send({id, name});
})

//Post
app.post('/addProduct', (req, res) => {
    const product = req.body;
    console.log(product);
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.insertOne(product, (err, result) => {
            if (err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(result.ops[0]);
            }
        });
        client.close();
      });
});



app.listen(3100, () => console.log('Listening to port 3100'))