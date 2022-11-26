const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000;

// middlewares
app.use(cors())
app.use(express.json())








  const uri = `mongodb+srv://${process.env.REACT_APP_USER_NAME}:${process.env.REACT_APP_USER_PASSWORD}@cluster0.egpfflf.mongodb.net/?retryWrites=true&w=majority`;
// const urI = "mongodb+srv://Assignment-12:cdUxsIkSdK86aLuY@cluster0.egpfflf.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });









async function run() {
  try {
    // const Assignment = client.db('Assignment').collection('service')
    const userCollection = client.db('Assignment').collection('user')
    const allUserCollection = client.db('Assignment').collection('allUser')
    const catagories = client.db('Assignment-12').collection('phoneCatagories')
    const Iphone = client.db('Iphone').collection('service')
    // const Samsung = client.db('Samsung').collection('service')
    // const Xaomi = client.db('Xaomi').collection('service')




    // log in all user 


            app.post('/allUsers', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await allUserCollection.insertOne(user)
            res.send(result);
        });








    app.get('/catagories', async (req, res) => {


      const query = {};
      const cursor = catagories.find(query);


      const users = await cursor.toArray();

      res.send(users);
    });


    // iphone service 



    app.get('/iphone/:id', async (req, res) => {
      const id = req.params.id;


      const query = { id: id };



      const user = await Iphone.find(query).toArray();




      res.send(user);
    })



    app.get('/jwt', async(req, res) =>{
      const email = req.query.email;
      const query = {email: email}
      const user = await allUserCollection.findOne(query)
      if(user){
        const token = jwt.sign({email}, process.env.REACT_APP_ACCESS_TOKEN, {expiresIn: '1h'} )
        return res.send({accessToken: token})
      }
      console.log(user)
      res.status(403).send({accessToken: ''})

    })

    // user booking 


    app.post('/bookings', async (req, res) => {
      const user = req.body;
  
      const result = await userCollection.insertOne(user)
      res.send(result);
    });







    // app.put('/user/:email', async(req, res)=>{
    //   const email = req.params.email

    //   const user = req.body
    //   const filter = {email:email}
    //   const options = {upsert: true}
    //   const updateDoc ={
    //       $set: user,
    //   }
    //   const result = await Assignment.updateOne(filter, updateDoc, options)
    //   console.log(result)

    //   const token = jwt.sign(user, process.env.REACT_APP_ACCESS_TOKEN, {
    //     expiresIn: '4D',
    //   })
    //   res.send({result, token})
    // })




    console.log('Database Connected...')
  } finally {
  }
}

run().catch(err => console.error(err))

app.get('/', (req, res) => {
  res.send('Server is running...')
})

app.listen(port, () => {
  console.log(`Server is running...on ${port}`)
})


  //  app.get('/users', async (req, res) => {
  //           const query = {};
  //           const cursor = userCollection.find(query);
  //           const users = await cursor.toArray();
  //           res.send(users);
  //       });

  //       app.get('/users/:id', async (req, res) => {
  //           const id = req.params.id;
  //           const query = { _id: ObjectId(id) };
  //           const user = await userCollection.findOne(query);
  //           res.send(user);
  //       })

  //       app.post('/users', async (req, res) => {
  //           const user = req.body;
  //           console.log(user);
  //           const result = await userCollection.insertOne(user)
  //           res.send(result);
  //       });

  //       app.put('/users/:id', async (req, res) => {
  //           const id = req.params.id;
  //           const filter = { _id: ObjectId(id) };
  //           const user = req.body;
  //           const option = {upsert: true};
  //           const updatedUser = {
  //               $set: {
  //                   name: user.name,
  //                   address: user.address,
  //                   email: user.email
  //               }
  //           }
  //           const result = await userCollection.updateOne(filter, updatedUser, option);
  //           res.send(result);
  //       })

  //       app.delete('/users/:id', async (req, res) => {
  //           const id = req.params.id;
  //           // console.log('trying to delete', id);
  //           const query = { _id: ObjectId(id) }
  //           const result = await userCollection.deleteOne(query);
  //           console.log(result);
  //           res.send(result);
  //       });