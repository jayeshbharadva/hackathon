const {hacklist,addhack,hackbyparamid} = require('../model/hackathon.model')

async function httphacklist(req,res){
    return res.status(200).json(await hacklist());
}

async function httpaddhack(req,res){
    const hackd = req.body;
    hackd.cid = res.user.cid;
    addhack(hackd);
    return res.json(hackd);
}

async function httphackbyparamid(req,res){
    const hackid = Number(req.params.id);
    const hack = await hackbyparamid(hackid);
    if(!hack){
        return res.status(404).json({
            msg: "hackathon not found",
        });
    }
    if(!hack.hid || !hack.hname || !hack.cid){
        return res.status(404).json({
            msg : "hackathon not found",
        });
    }
    return res.status(200).json(hack);
}

module.exports = {
    httphacklist,
    httpaddhack,
    httphackbyparamid,
}