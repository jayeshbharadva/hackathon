const hackschema = require('./hackathon.mongo');

async function hacklist(){
    return await hackschema.find({},{'_id': 0, '__v': 0});
}

async function addhack(hack){
    console.log("addhack is called");
    try{
        await hackschema.create(hack);
        return{
            ok: true,
        }
    }
    catch(err){
        console.log('some error in posting the data'+" "+err);
        return{
            ok:false,
            err:err,
        }
    }
}

async function hackbyparamid(id){
    return await hackschema.findOne({hid: id},{'_id': 0, '__v': 0});
}

async function httphackbycid(id){
    return await hackschema.find({cid: id},{'_id': 0, '__v': 0});
}
// it returns the hackathon which has already this id
async function checkifhackexist(hid,cid){
    return await hackschema.find(
        {cid:cid,hid:hid},{'_id': 0, '__v': 0},
    )
}

module.exports = {
    hacklist,
    addhack,
    hackbyparamid,
    httphackbycid,
    checkifhackexist
}