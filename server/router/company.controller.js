    const jwt = require('jsonwebtoken');
    const bcrypt = require("bcrypt");

const {httpcompanylist,httpaddcompany,httpchecklogin} = require('../model/company.model'); 

const {httphackbycid} = require('../model/hackathon.model');

async function companylist(req,res){
    return res.status(200).json(await httpcompanylist());
}

async function addcompany(req,res){
    const companyd = req.body;
    if(!companyd.cid || !companyd.cemail || !companyd.cpassword || !companyd.cname){
        return res.status(400).json({
            msg: "please enter all the mendetory details",
        })
    }
    companyd.cpassword = await bcrypt.hash(companyd.cpassword, 10);
    httpaddcompany(companyd);
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

module.exports ={
    companylist,
    addcompany,
    companylogin,
    hackbycid,
}