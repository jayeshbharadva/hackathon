const hackschema = require('./hackathon.mongo');

async function hacklist(){
    return await hackschema.find({},{'_id': 0, '__v': 0});
}

async function addhack(hack){
    try{
        await hackschema.create(hack);
    }
    catch(err){
        console.log('some error in posting the data');
    }
}

async function hackbyparamid(id){
    return await hackschema.findOne({hid: id},{'_id': 0, '__v': 0});
}

async function httphackbycid(id){
    return await hackschema.find({cid: id},{'_id': 0, '__v': 0});
}

module.exports = {
    hacklist,
    addhack,
    hackbyparamid,
    httphackbycid
}