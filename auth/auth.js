const jwt=require('jsonwebtoken')

const secret="Arunisnoob"


 
const verify=(req,res,next)=>{

    const token=req.headers['authorization'];
    
    if(!token) return res.status(401).json({error:"No token,auth failed"})

        try{

    req.user=jwt.verify(token,secret);
    console.log(req.user)
    

next();}

catch{

    res.status(401).json({error:"Invalid or expired token"})

}

}

module.exports=verify
