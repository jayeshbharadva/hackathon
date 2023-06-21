const upload = require('express-fileupload');

const {hacklist,addhack,hackbyparamid} = require('../model/hackathon.model')
async function httphacklist(req,res){
    return res.status(200).json(await hacklist());
}

async function httpaddhack(req,res){
    console.log(req);
    console.log(req.file);
    const hackd = req.body;
    const file = req.file;
    console.log(file);
    if (!file) {
        return res.status(400).send('No files were uploaded.');
    }
    const filename = res.user.cid +"_"+hackd.hid;
    file.mv(`../uploads/${filename}`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    });
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