const companyschema = require('./company.mongo');
const mongoose = require("mongoose");

async function httpcompanylist(){
    return await companyschema.find({},{'_id': 0, '__v': 0});
}

async function httpaddcompany(company){
    return await companyschema.create(company);
}

async function httpchecklogin(id){
    try{
        return await companyschema.findOne({cid:id},{
            '_id': 0,
            '__v': 0,
        }).exec();
    }
    catch(err){
        console.log("data not found");
        return{
            ok:false,
        }
    }
}

module.exports = {
    httpcompanylist,
    httpaddcompany,
    httpchecklogin,
}
