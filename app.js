const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
// const List = require('./database/models/list')
const User = require('./database/models/User')
// const Task = require('../backend/database/models/task')

app.use(cors());

app.post('/register', (req,res)=>{
    let userData = req.body;
    let user = new User(userData);
    user.save((err, registeredUser)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("User registration Succesful")
            res.send(registeredUser);
        }
    })

})
app.post('/login', (req,res)=>{
    let userData = req.body;
    // let user = new User(userData);

    User.findOne({email : userData.email}, (err, user)=>{
        if(err){
            console.log(err);
        }
        else {
            if(!user){
                res.status(401).send('Invalid Email');
            }
            if(user.password !== userData.password){
                res.send(401).send('Invalid Password')
            }
            else{
                res.status(200).send(user);
            }
        }
    })
    
})

app.get('/events', (req,res) => {
    let events = [
      {
        "_id": "1",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json(events)
  })

  app.get('/special', (req,res) => {
    let events = [
      {
        "_id": "1",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json(events)
  })
  
  
  

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
app.listen(3000, () => console.log('This will connect node to port number 3000'));