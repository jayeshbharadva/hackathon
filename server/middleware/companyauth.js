const jwt = require("jsonwebtoken");

const validatetoken = async function(req,res,next){
    var token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    console.log("companyauth");
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        if(token == undefined){
        return res.status(404).json({
            msg: "token is undefined",
        })
        }
        try{
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                if(decoded.role === "Company"){
                    res.user = decoded;
                    next();
                }
                else{
                    console.log("you are not authorized to this url");
                    return res.status(400).json({
                        msg:"you are not authorized to this url",
                    })
                }
            }
        catch(err){
            console.log(err);
            return res.status(404).json({
                msg: "user is not authorized",
            })
        }
        }
    }
    
module.exports = validatetoken;