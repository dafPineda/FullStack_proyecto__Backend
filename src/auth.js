const jwt = require('jsonwebtoken')

const SECRET = process.env.JWT_SECRET || 'default_secret_key'

function sign(payload){
    return jwt.sign(payload, SECRET, {expiresIn:'24h'})
}

function authMiddleware(req, res, next){ 
    const header = req.headers.authorization 

    if(!header) return res.status(401).json({error:"You need authorization"})

    const [type, token] = header.split(' ');

    if(type !== 'Bearer' || !token) return res.status(401).json({error:'invalid format'})
    try{
        req.user = jwt.verify(token, SECRET)
        return next()
    }catch(error){
        console.log(error)
        return res.status(401).json({error:"invalid token"})
    }
}
function requireRole(...roles){
    return (req, res, next)=>{
        if(!roles.includes(req.user.role))return res.status(403).json({error:'Not Authorization '})
        next()
    }
}
module.exports = {sign, authMiddleware, requireRole}