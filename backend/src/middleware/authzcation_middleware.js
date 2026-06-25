import jwt from "jsonwebtoken";
import config from "../config/config.js";

const verifyToken = (req, res, next) => {
// const token = req.cookies.accessToken
const token = req.cookies.accessToken;


if(!token){
    return res.status(400).json({
        message:"you are not authorized to acess the routes..."
    })
}
try {
    const decoded = jwt.verify(token, config.JWT_TOKEN)
    req.user = decoded;
    next()
} catch (error) {
    return res.status(500).json({
        message:error.message
    })
}


};

export default verifyToken;