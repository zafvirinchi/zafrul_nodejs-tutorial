const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    //console.log("authHeader",authHeader);
      const token = authHeader && authHeader.split(" ")[1];
       console.log("token-->",token);
    

    if(!token){
        console.log("inside authHeader",authHeader);
        res.status(401).json({
            succees: false,
            message: "Access denied! No token provided, Please login to continue",
        });
    }
    try{
       const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
       req.userInfo = decodedToken;
       console.log(decodedToken);
       next();
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Access denied. No token provided. Please login to continue",
          });
    }
   
};

module.exports = authMiddleware;