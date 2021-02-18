const jwt=require('jsonwebtoken');

function auth(req,res,next) 
{
    const token = req.header('auth_token');

    if(!token) return res.json({"msg":"Access Denied","description":"unAuthorized request!"});

    try
    {
        const verify=jwt.verify(token,process.env.secret_Key);
        req.user=verify;
        next(); //TOKEN verified :: continue with the req
    }
    catch(err)
    {
        console.log(err);
        return res.json({"msg":"error","err":err});
    }
}

module.exports=auth;