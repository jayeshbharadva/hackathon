const studentschema = require('./student.mongo');
const submissionschema = require('./submission.mongo');

async function addstudent(student){
    return await studentschema.updateOne({
        sid:student.sid,
    },{
        $set : student,
    },{
        upsert : true,
    })
}

async function checklogin(id){
    try{
        return await studentschema.findOne({
            sid: id,
        },{
            '_id': 0,
            '__v': 0,
        }).exec();
    }
    catch(err){
        console.log("error in finding data");
        return{
            ok:false,
        }
    }
}

async function partinhackathon(hack){
    try{
        await submissionschema.create(hack);
        console.log("data entered successfully");
        return{
            ok:true,
        }
    }
    catch(err){
        console.log("error posting some data");
        return{
            ok:false,
        }
    }
}

async function studentinfo(id){
    try{
        return await submissionschema.find({
            hid:id,
        },{
            '_id': 0,
            '__v': 0,
        })
    }
    catch{
        console.log("error in finding student submission details. Check database connection");
        return{
            ok:false,
        }
    }
}

async function students(id){
    try{
        return await studentschema.findOne({
            sid:id,
        },{
            '_id': 0,
            '__v': 0,
        },)
    }
    catch{
        console.log('error in finding student details.check database connection');
        return{
            ok:false,
        }
    }
}

module.exports = {
    addstudent,
    checklogin,
    partinhackathon,
    studentinfo,
    students
}