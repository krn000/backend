const express = require('express');

const app = express();
app.use(express.json());


const Campaign = require('../backend/database/models/campaign')

app.use(cors());



app.get('/edit-camp/:id', (req, res) => {
  Campaign.find({_id : req.params.id})
    .then((events) => { res.send(events) })
    .catch((err) => console.log(err))
})

app.get('/campaign', (req, res) => {
  Campaign.find({})
    .then((events) => { res.send(events) })
    .catch((err) => console.log(err))
})

app.post('/campaign', (req, res) => {
  let eventData = req.body
  let event = new Campaign(eventData)
  event.save((err, postEvent) => {
    if (err) {
      console.log(err)
    } else {
      postEvent = event
      res.send(postEvent)
    }
  })
})

app.patch('/campaign/:id', (req, res) => {
  Campaign.findOneAndUpdate({ '_id': req.params.id }, { $set: req.body })
    .then((lists) => { res.send(lists) })
    .catch((error) => { console.log(error) })
});


app.delete('/campaign/:id', (req, res) => {
  Campaign.findByIdAndDelete(req.params.id)
        .then((list) => { res.send(list) })
        .catch((error) => { console.log(error) })

});



const mongoose = require('./database/mongoose');
const Events = require('./database/models/event');
app.listen(3000, () => console.log('This will connect node to port number 3000'));