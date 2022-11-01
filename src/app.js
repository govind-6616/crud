const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// connecting to Database
require('./db/conn');

// Definning Schema for Collection
const Student = require('./model/Schema');

//Defining Get request for Read data
app.get('/read', async (req, res) => {
    try {
        const data = await Student.find({});
        res.send(data);
    }
    catch (e) {
        console.log(e);
        res.send(e);
    }
})

//Defining Post request for Insert data
app.post('/create', async (req, res) => {
    try {
        // console.log(req.body);
        const newStudent = await new Student(req.body);
        newStudent.save();
        res.send("Data Save");
        console.log(newStudent);
    }
    catch (err) {
        console.log(e);
        res.send(e);
    }
})

//Defining Get by Id for Read data
app.get('/read/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await Student.findById({ _id: _id });
        res.send(data);
    }
    catch (e) {
        console.log(e);
        res.send(e);
    }
})

//Defining Patch for update data
app.patch('/update/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await Student.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.send(data);
    }
    catch (e) {
        console.log(e);
        res.send(e);
    }
})

//Defining Delete for delete data
app.delete('/delete/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await Student.findByIdAndDelete(_id);
        res.send(data);
    }
    catch (e) {
        console.log(e);
        res.send(e);
    }
});


if(process.env.NODE_ENV="production"){
    app.use(express.static("frontend/build"));
     const path=require('path');
    app.get("*",(req,res)=>{
      res.sendFile(path.resolve(_dirname,"client","build","index.html"));
    })
     }

// Defining port number 
const port = process.env.PORT || 8000;

//creating server
app.listen(port, () => {
    console.log(`server running at port ${port}`);
})
