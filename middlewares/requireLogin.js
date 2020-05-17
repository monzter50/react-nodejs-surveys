module.exports = async (req,res,next) =>{
    if(!req.user){
        return await res.status(401).send({error:'You must log in!'});
    }
    next();
}