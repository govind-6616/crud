const mongoose=require('mongoose');
const studentSchema=new mongoose.Schema({
    name:{
type:String
    },
    year:{
        type:String
    },
    branch:{
        type:String
    },
    mobile_no:{
        type:Number
    },
    
});
const Student=new mongoose.model('STUDENT',studentSchema);
module.exports=Student;