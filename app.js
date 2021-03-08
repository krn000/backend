const express = require('express');
const jwt = require('jsonwebtoken')
const app = express();
app.use(express.json());

const cors = require('cors');
// const List = require('./database/models/list')
const User = require('./database/models/User')
const Event = require('../backend/database/models/event')

app.use(cors());

app.post('/register', (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  user.save((err, registeredUser) => {
    if (err) {
      console.log(err);
    }
    else {
      let payload = { subject: registeredUser._id }
      let token = jwt.sign(payload, 'string')
      console.log("User registration Succesful")
      res.send({ token });
    }
  })

})
app.post('/login', (req, res) => {
  let userData = req.body;
  // let user = new User(userData);

  User.findOne({ email: userData.email }, (err, user) => {
    if (err) {
      console.log(err);
    }
    else {
      if (!user) {
        res.status(401).send('Invalid Email');
      }
      if (user.password !== userData.password) {
        res.send(401).send('Invalid Password')
      }
      else {
        let payload = { subject: user._id }
        let token = jwt.sign(payload, "secretKey")
        res.status(200).send({ token });
      }
    }
  })

})

app.get('/events', (req, res) => {
  Event.find({})
    .then((events) => { res.send(events) })
    .catch((err) => console.log(err))
})

app.post('/events', (req, res) => {
  let eventData = req.body
  let event = new Event(eventData)
  event.save((err, postEvent) => {
    if (err) {
      console.log(err)
    } else {
      postEvent = event
      res.send(postEvent)
    }
  })
})

app.get('/special', (req, res) => {
  Event.find({})
    .then((special) => { res.send(special) })
    .catch((err) => console.log(err))
})

app.post('/special', (req, res) => {
  let eventData = req.body
  let event = new Event(eventData)
  event.save((err, postEvent) => {
    if (err) {
      console.log(err)
    } else {
      postEvent = event
      res.send(postEvent)
    }
  })
})


function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('unauthorized Request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if (token === null) {
    return res.status(401).send('unauthorized Request')
  }
  let payload = jwt.verify(token, 'secretKey')
  if (!payload) {
    return res.status(401).send('unauthorized Request')
  }
  req.userId = payload.subject
  next()
}


// app.get('/events', (req, res) => {
//   let events = [
//     {
//       "_id": "1",
//       "name": "Auto Expo",
//       "description": "lorem ipsum",
//       "date": "2012-04-23T18:25:43.511Z"
//     },
//     {
//       "_id": "2",
//       "name": "Auto Expo",
//       "description": "lorem ipsum",
//       "date": "2012-04-23T18:25:43.511Z"
//     },
//     {
//       "_id": "3",
//       "name": "Auto Expo",
//       "description": "lorem ipsum",
//       "date": "2012-04-23T18:25:43.511Z"
//     },
//     {
//       "_id": "4",
//       "name": "Auto Expo",
//       "description": "lorem ipsum",
//       "date": "2012-04-23T18:25:43.511Z"
//     },
//     {
//       "_id": "5",
//       "name": "Auto Expo",
//       "description": "lorem ipsum",
//       "date": "2012-04-23T18:25:43.511Z"
//     },
//     {
//       "_id": "6",
//       "name": "Auto Expo",
//       "description": "lorem ipsum",
//       "date": "2012-04-23T18:25:43.511Z"
//     }
//   ]
//   res.json(events)
// })

// app.get('/special', verifyToken, (req, res) => {
//   let events = [
//     {
//       "_id": "1",
//       "name": "Special Expo",
//       "description": "lorem ipsum",
//       "date": "2012-04-23T18:25:43.511Z"
//     },
//     {
//       "_id": "2",
//       "name": "Auto Expo",
//       "description": "lorem ipsum",
//       "date": "2012-04-23T18:25:43.511Z"
//     },
//     {
//       "_id": "3",
//       "name": "Auto Expo",
//       "description": "lorem ipsum",
//       "date": "2012-04-23T18:25:43.511Z"
//     },
//     {
//       "_id": "4",
//       "name": "Auto Expo",
//       "description": "lorem ipsum",
//       "date": "2012-04-23T18:25:43.511Z"
//     },
//     {
//       "_id": "5",
//       "name": "Auto Expo",
//       "description": "lorem ipsum",
//       "date": "2012-04-23T18:25:43.511Z"
//     },
//     {
//       "_id": "6",
//       "name": "Auto Expo",
//       "description": "lorem ipsum",
//       "date": "2012-04-23T18:25:43.511Z"
//     }
//   ]
//   res.json(events)
// })




// app.get('/lists', (req, res) => {
//     List.find({})
//         .then((lists) => { res.send(lists) })
//         .catch((error) => { console.log(error) })

// });

// app.get('/lists/:listId', (req, res) => {
//     List.find({ _id: req.params.listId })
//         .then((list) => { res.send(list) })
//         .catch((error) => { console.log(error) })
// });

// app.post('/lists', (req, res) => {
//     (new List({ 'title': req.body.title }))
//         .save()
//         .then((list) => { res.send(list) })
//         .catch((error) => { console.log(error) })

// });

// app.delete('/lists/:listId', (req, res) => {
//     List.findByIdAndDelete(req.params.listId)
//         .then((list) => { res.send(list) })
//         .catch((error) => { console.log(error) })

// });

// app.patch('/lists/:listId', (req, res) => {
//     List.findOneAndUpdate({ '_id': req.params.listId }, { $set: req.body })
//         .then((lists) => { res.send(lists) })

//         .catch((error) => { console.log(error) })

// });

// app.get('/lists/:listId/tasks', (req, res) => {
//     Task.find({ _listId: req.params.listId })
//         .then((tasks) => { res.send(tasks) })
//         .catch((error) => { console.log(error) })

//     const a = Task.find({ _listId: req.params.listId })
//     a;
// });

// app.post('/lists/:_listId/tasks', (req, res) => {
//     Task.create({ 'title': req.body.title, '_listId': req.params._listId })
//         .then((task) => { res.send(task) })
//         .catch((error) => { console.log(error) })
// });

const mongoose = require('./database/mongoose');
const Events = require('./database/models/event');
app.listen(3000, () => console.log('This will connect node to port number 3000'));