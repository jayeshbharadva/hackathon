    const jwt = require('jsonwebtoken');
    const bcrypt = require("bcrypt");

const {httpcompanylist,httpaddcompany,httpchecklogin} = require('../model/company.model'); 

const {httphackbycid} = require('../model/hackathon.model');

async function companylist(req,res){
    return res.status(200).json(await httpcompanylist());
}

async function addcompany(req,res){
    const companyd = req.body;
    const resp = await httpchecklogin(companyd.cid);
    if(resp){
        return res.status(400).json({
            msg:"User already exists with same companyId!! please enter different companyId",
        })
    }
    if(!companyd.cid || !companyd.cemail || !companyd.cpassword || !companyd.cname){
        return res.status(400).json({
            msg: "please enter all the mendetory details",
        })
    }
    companyd.cpassword = await bcrypt.hash(companyd.cpassword, 10);
    await httpaddcompany(companyd);
    return res.status(201).json(companyd);
}

async function companylogin(req,res){
    const {cid,cpassword} = req.body;
    if(!cid || !cpassword){
        return res.status(400).json({
            msg: 'please enter some id and password',
        })
    }

    const company = await httpchecklogin(cid);

    if(!company){
        return res.status(404).json({
            msg: "UserId not registered",
        })
    }

    if(company && await bcrypt.compare(cpassword,company.cpassword)){
                
        const accesstoken = jwt.sign({
            cid: company.cid,
            cname: company.cname,
            role: "Company",
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"100m"},
        );

        return res.status(200).json({
            accesstoken,
        })
    }
    return res.status(404).json({
        msg: "please enter valid password",
    })
    
}

async function hackbycid(req,res){
    console.log("hackbycid function is called");
    const id = res.user.cid;
    const hack = await httphackbycid(id);
    if(hack.length == 0){
        return res.status(404).json({
            msg: "Please register some hackathons",
        })
    }
    return res.status(200).json({
        hack
    });
}

function httpreturnname(req,res){
    const cname = res.user.cname;
    return res.status(200).json(cname);
}

module.exports ={
    companylist,
    addcompany,
    companylogin,
    hackbycid,
    httpreturnname
}