const multer = require("multer");
const fs = require("fs");
const { google } = require('googleapis');

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


const {hacklist,addhack,hackbyparamid} = require('../model/hackathon.model')

async function httphacklist(req,res){
    console.log("hacklist funcyion called");
    return res.status(200).json(await hacklist());
}

async function httpaddhack(req,res){
    const hackd = req.body;
    const file = req.file;
    hackd.cid = res.user.cid;
    console.log(hackd);
    const filename = res.user.cid +"_"+hackd.hid;
    console.log(file);

    // //code to upload file to google drive
    const auth = authenticateGoogle();
    const {webViewLink} = await uploadToGoogleDrive(file,auth,filename);
    // const url = responsefromdrive.webViewLink;
    // hackd.hpfile = url;
    console.log(webViewLink);
    hackd.hpfile = webViewLink;
    const resp = await addhack(hackd);
    console.log(resp.ok);
    console.log("hey there this is nmy");
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

module.exports = {
    httphacklist,
    httpaddhack,
    httphackbyparamid,
}