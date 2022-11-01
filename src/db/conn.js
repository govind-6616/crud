const mongoose=require('mongoose');
// const DB="mongodb://localhost:27017/crud";
const DB='mongodb+srv://govind:govind@cluster0.heq3q.mongodb.net/crud?retryWrites=true&w=majority';
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,

}).then(()=>{
    console.log('connection successful');
}).catch((e)=>{
   console.error(e);
    console.log('no connection');
})