const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json())

const MONGO_URL = 'mongodb+srv://plass:123@nasa-cluster.exsxa.mongodb.net/nasaDatabase?retryWrites=true&w=majority'

mongoose.connect(MONGO_URL, {
  useNewUrlParser:true,
  useUnifiedTopology:true
})
.then(() => console.log("Sucessfull Connexion to MongoDB"))
.catch(() => console.log("Unsuccessfull connexion"))


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'Get, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message:'Object Created'
    });
});






app.use('/api/stuff', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(stuff);
  });
module.exports = app;