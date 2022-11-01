
const express=require('express');
const nodemailer=require('nodemailer');
const cors=require('cors');
// const sgMail=require('@sendgrid/mail');
// const API_KEY="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";
// sgMail.setApiKey(API_KEY);
// const msg={
// to : 'govind6616singh@gmail.com',
// from : 'govind810singh@gmail.com',
// subject : 'hello from govind',
// text : 'hello',
// html : '<h1>hello from govind side</h1>',
// };
// sgMail.send(msg)
// .then((response)=>console.log("e-mail sent"))
// .catch((error)=>console.log(error.message));
const app=express();
app.use(express.json());
app.use(cors());
// connecting to Database
require('./db/conn');

// Definning Schema for Collection
const Student=require('./model/Schema');

app.post('/insertData',async (req,res)=>{
    // console.log(req.body);
    // const newStudent=new Student(req.body);
    // newStudent.save();
    // newStudent.save().then(()=>{
    //     res.send("Data Save");
    // })
    // .catch((e)=>{
    //     console.log(e);
    // })
    try{  
        console.log(req.body);
        const newStudent=await new Student(req.body);
        newStudent.save();
        res.send("Data Save");
         console.log('data save');
    }
    catch(err){
        console.log(e);
        res.send(e);
    }
    console.log('hello from server side');
})
app.get('/showData/:rank/:sub',async (req,res)=>{
    try{
        const rank=req.params.rank;
        const sub=req.params.sub;
// const data=await Student.find({name});
// const data=await Student.findById({_id:name}).sort({"name":1});
const data=await Student.find({"rank":rank,
"subject":sub});
res.send(data);
    }
    catch(e){
        console.log(e);
        res.send(e);
    }
})
app.get('/showdata/:id', async (req,res)=>{
    try{
const _id=req.params.id;
const data=await Student.findById({_id:_id});
res.send(data);
    }
    catch(e){
        console.log(e);
        res.send(e);
    }
})
app.get('/showdata/:name', async (req,res)=>{
    try{
const name=req.params.name;
const data=await Student.findOne({"name":name});
res.send(data);
    }
    catch(e){
        console.log(e);
        res.send(e);
    }
})
app.get('/showdata/', async (req,res)=>{
    try{
// const _id=req.params.id;  
const data=await Student.find({});
res.send(data);
    }
    catch(e){
        console.log(e);
        res.send(e);
    }
})

app.post(`/sendData`,async(req,res)=>{
    try {
        const data=req.body.field;
        console.log(data);
        const std=await new Student({field:data});
   std.save();
   res.send("data save");
   console.log(std);
    } catch (e) {
        console.log(e);
    }
})
app.get(`/getMy`,async(req,res)=>{
try {
    const resp=await Student.find({});
    res.send(resp);
} catch (e) {
    console.log(e);
}
})

app.patch('/update/:id',async (req,res)=>{
    try{
        const _id=req.params.id;
        // const name=req.body.name;
        // const email=req.body.email;
        // const subject=req.body.subject;
        // const rank=req.body.rank;
        // const classv=req.body.class;
        const List=req.body.List;

const data=await Student.findByIdAndUpdate({
    _id,
    // name,
    // email,
    // subject,
    // rank,
    // class:classv
},
    {
        $addToSet:{
            List:List
        }
    }
);
res.send(data);
    }
    catch(e){
        console.log(e);
        res.status(500).send(e);
    }
})
app.get(`/history/:vales`,async(req,res)=>{
    try{
const vales=req.params.vales;
const data=await Student.find({List:vales});
res.send(data);

    }
    catch(e){
        console.log(e);
        res.send(e);
    }
})

// app.patch('/update/:id',async (req,res)=>{
//     try{
//         const _id=req.params.id;
// const data=await Student.findByIdAndUpdate(_id,req.body,{
//     new:true
// });
// res.send(data);
//     }
//     catch(e){
//         console.log(e);
//         res.status(500).send(e);
//     }
// })

app.delete('/delete/:id' ,async (req,res)=>{
    try{
        // const _id=req.params.id;
const data=await Student.findByIdAndDelete(req.params.id);
// const data=await Student.deleteOne({"name":req.params.name});
res.send(data);
    }
    catch(e){
        console.log(e);
        res.status(500).send(e);
    }
});
const port=process.env.PORT || 8000;
app.listen(port,()=>{
    console.log('server running at 8000')
   
});