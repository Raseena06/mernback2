
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
dotenv.config();
const cors = require('cors');
const route = require('./Routes/Routing');
const ProductRouter = require('./Routes/ProductRouter');

const app = express();
require('./Models/db');

app.get("/ping", (req, res) => {
  res.send("hello")
})

app.use(cors());
app.use(express.json());
app.use('/auth', route);
 app.use('/products', ProductRouter);
app.use(bodyParser.json());


const PORT = process.env.PORT || 3001

app.listen(

  PORT,

  () => console.log("back end is running")

)




//   mongoose.connect('mongodb://127.0.0.1:27017/crudMern');








// app.get('/hy', (req, res) => {

//   res.send("Hello allll")

//     db.collection('users')

//         .find()

//         .toArray((err, res) => {

//             if (err) throw err

//             res.send(result);

//             console.log(res)

//         })

// })






// app.get(

//     '/users',

//     async (req, res) => {




// method 1 -- API developement using node.js

// userModel.find({name:"k",age:8}).

//     then(users => res.json(users))

//     .catch(err => res.json(err))




// method 2 -- API developement using axios

// const result = await axios.get('http://localhost:3001/users')

// res.send(result.data)

//     }

// )




// app.get(

//     "/test",

//     (req, res) => {

//         TestModel.find({})

//             .then(test => res.json(test))

//             .catch(err => res.json(err))




//     }

// )

// app.get('/getUser/:id', (req, res) => {

//     const id = req.params.id;

//     userModel.findById({ id })

//         .then(result => res.json(result))

//         .catch(err => res.json(err))

// })

// app.post('/createUser', (req, res) => {

//     userModel.create(req.body)

//         .then(result => res.json(result))

//         .catch(err => res.json(err))

// })




// app.put('/updateUser/:userId', (req, res) => {

//     const id = req.params.userId;

//     userModel.findByIdAndUpdate({ _id: id }, {

//         name: req.body.name,

//         mail: req.body.mail,

//         age: req.body.age

//     })

//         .then(result => res.json(result))

//         .catch(err => res.json(err))

// })




// app.delete('/deleteUser/:userId', (req, res) => {

//     const id = req.params.userId;

//     userModel.findByIdAndDelete({ _id: id })

//         .then(result => res.json(result))

//         .catch(err => res.json(err))

// })




// https.createServer({

//     key:fs.readFile('sshServer.key'),

//     cert:fs.readFile('sshServer.cert')

// },

// app

// ).listen(

//     PORT,

//     () => console.log("back end is running")

// )




// app.listen(

//     PORT,

//     () => console.log("back end is running")

// )

