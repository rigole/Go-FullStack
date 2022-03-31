const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Thing = require('./models/thing');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const path = require('path');

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

app.use('api/stuff', stuffRoutes);
app.use('api/auth', userRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

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



  app.post('api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
      ...req.body
    });
    thing.save()
    .then(() => res.status(201).json({message: 'Saved Object'}))
    .catch(error => res.status(400).json({ error }))
  })

app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }))
})

app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id})
  .then(() => res.status(200).json({ message: "Updated Object" }))
  .catch(error => res.status(400).json({error}))
})

app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id})
  .then(() => res.status(200).json({message: "Deleted Object"}))
  .catch(error => res.status(400).json({error}))
})



  app.use('api/stuff', (req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }))
  })

module.exports = app;