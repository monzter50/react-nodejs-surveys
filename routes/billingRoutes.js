const keys = require("../config/keys");
const stripe = require("stripe")(keys.stipeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
const mongoose = require("mongoose");
const Billings = mongoose.model("billings");

module.exports = (app) => {
  app.post("/api/stripe", requireLogin, async (req, res) => {

   const charge = await stripe.charges.create({
      amount: 500,
      currency:'usd',
      description:'$5 form 5 credits',
      source:req.body.id
    });
    
   req.user.credits +=5;
   const billings = new Billings({chargeID:req.body.id,credits: req.user.credits,name:req.user.name,email:req.body.email,googleID:req.user.googleID})

if (!billings) {
    return await res.status(400).json({ success: false, error: err })
}

   const bill =await billings.save();
   const user = await req.user.save();
    res.send(user);
    return await res.status(201).json({
            success: true,
            message: 'Charge credits',
        })
    
  });
};
