const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const {addstudent,checklogin,partinhackathon,studentinfo,students,studenthackparticipated} = require("../model/student.model");
const { hacklist } = require('../model/hackathon.model');

async function httpaddstudent(req,res){
    const student = req.body;
    console.log(student);
    if(!student){
        return res.status(400).json({
            msg:'student details are not entered',
        })
    }
    student.spassword = await bcrypt.hash(student.spassword,10);
    const check = await checklogin(student.sid);
    if(check){
        return res.status(400).json({
            msg: 'student already exist please enter some other id',
        })
    }
    addstudent(student);
    return res.status(201).json(student);
}

async function httplogin(req,res){
    const {sid,spassword} = req.body;
    if(!sid || !spassword){
        console.log("enter id nad password");
        return res.status(400).json({
            msg: 'enter id and password',
        })
    }
    const student = await checklogin(sid);

    if(!student){
        console.log("student id not registered");
        return res.status(400).json({
            msg: 'StudentId is not registered'
        })
    }
    if(student && await bcrypt.compare(spassword,student.spassword)){
        const accesstoken = jwt.sign({
            sid: student.sid,
            sname: student.sname,
            role: "Student",
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"100m"},
        );

        return res.status(200).json({
            accesstoken,
        })
    }
    return res.status(400).json({
        msg: 'please enter valid password',
    })
}

async function httphacklist(req,res){
    return res.status(200).json(await hacklist());
}

async function httppartinhackathon(req,res){
    const submission = req.body;
    submission.sid = res.user.sid;
    const sub = await partinhackathon(submission);
    if(!sub.ok){
        return res.status(400).json({
            msg:'error in data entry or you already participated in a hackathon with this problem statement id',
        })
    }
    return res.status(201).json({
        msg:'you participated successfully',
    })
};

async function httpstudentinfo(req,res){
    const {hid} = req.body;
    const r = await studentinfo(hid);
    return res.status(200).json(r);
}

async function httpstudent(req,res){
    console.log("httpstudent");
    const sid = req.params.id;
    const response = await students(sid);
    return res.status(200).json(response);
}

async function httpstudenthackparticipated(req,res){
    const sid = res.user.sid;
    console.log(sid);
    const hacks = await studenthackparticipated(sid);
    return res.status(200).json(hacks);
}

module.exports = {
    httpaddstudent,
    httplogin,
    httphacklist,
    httppartinhackathon,
    httpstudentinfo,
    httpstudent,
    httpstudenthackparticipated
}