const fs = require("fs");
const { google } = require('googleapis');


const {hacklist,addhack,hackbyparamid,checkifhackexist} = require('../model/hackathon.model');

const authenticateGoogle = require('../middleware/googledriveauth');


const uploadToGoogleDrive = async (file, auth,filename) => {
    const fileMetadata = {
      name: filename,
      parents: ["1XY7ETmo44ycEFUclwuUAXIgjEeE5VGL6"], // Change it according to your desired parent folder id
    };
  
    const media = {
      mimeType: file.mimetype,
      body: fs.createReadStream(file.path),
    };
  
    const driveService = google.drive({ version: "v3", auth });
  
    const response = await driveService.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id, webViewLink",
    });
    const {id,webViewLink} = response.data;
    return {id,webViewLink};
  };



async function httphacklist(req,res){
    return res.status(200).json(await hacklist());
}

async function httpaddhack(req,res){
    const hackd = req.body;
    const file = req.file;
    hackd.cid = res.user.cid;
    const hackinfo = await checkifhackexist(hackd.hid,hackd.cid);
    if(hackinfo){
        return res.status(400).json({
            msg:"Hack already exists, update in that hack or create with different ID",
        })
    }

    const filename = res.user.cid +"_"+hackd.hid;

    // //code to upload file to google drive
    const auth = authenticateGoogle();
    const {webViewLink} = await uploadToGoogleDrive(file,auth,filename);
    if(!webViewLink){
        return res.status(400).json({
            msg: "error occured!! try after some time or refresh the page"
        })
    }
    hackd.hpfile = webViewLink;
    const resp = await addhack(hackd);
    return res.json({
        msg: "uploaded successfully",
    });
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

async function httphackbyhid(req,res){
    const hackid = req.body.hid;
    console.log(hackid);
    const hack = await hackbyparamid(hackid);
    console.log(hack);
    if(!hack){
        return res.status(400).json({
            msg: "hackathon not found",
        })
    }
    return res.status(200).json(hack);
}

module.exports = {
    httphacklist,
    httpaddhack,
    httphackbyparamid,
    httphackbyhid,
}