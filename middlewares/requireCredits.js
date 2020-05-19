module.exports = async (req,res,next) =>{
    if(req.user.credits < 1){
        return await res.status(403).send({error:'Not enought credits!'});
    }
    next();
}