import jwt from 'jsonwebtoken';

const userAuth = async(req,res,next)=>{
    const {token} = req.headers;
    if(!token){
        return res.json({success:false,message:'Not authorized.Login Again'})

    }
    try {
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET)
        
        if(tokenDecode.id){
            req.UserId = tokenDecode.id;
            // req.userId = tokenDecode.id;

        }
        else{
            return res.json({success:false,message:'Not authorized.Login Again'})
        }
        next();
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export default userAuth;