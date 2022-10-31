const express = require('express');
const app = express();
const cors =require('cors');
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('server running on localhost')
})

const users =[
    {"id" : 1, "name": "Sabila Nur", "email" : "sabilanur@gmail.com"},
    {"id" : 2, "name": "Bidya Sinha Saha", "email" : "bidyasinhasaha@gmail.com"},
    {"id" : 3, "name": "Mehazabien Chowdhury", "email" : "mehazabienchowdhury@gmail.com"},
    {"id" : 4, "name": "Mahiya Mahi", "email" : "mahiyamahi@gmail.com"},
    {"id" : 5, "name": "Tanjin Tisha", "email" : "tanjintisha@gmail.com"},
];

app.get( "/users" ,(req,res) => {
    res.send(users)
})

app.post( '/users', (req,res) => {
    console.log('post api called');
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    console.log(user);
    res.send(user)
})


app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
})