
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require('../services/Mailer')
const template = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model("surveys");

module.exports = (app) => {
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(',').map(email => ({ email: email.trim() })),
        _user:req.user.id,
        dateSent:Date.now()
    });
    const mailer = new Mailer(survey,template(survey));
    try{
      await mailer.send();
      await survey.save();
      req.user.credits -=1;
      const user = await req.user.save();
  
      res.send(user);
    }catch(e){
      res.status(422).send(e)
    }
   

  });
};
