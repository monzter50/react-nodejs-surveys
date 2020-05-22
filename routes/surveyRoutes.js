const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const template = require("../services/emailTemplates/surveyTemplate");
const Survey = mongoose.model("surveys");

module.exports = (app) => {
   function stringToBoolean(string){
    switch(string.toLowerCase().trim()){
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return Boolean(string);
    }
}
app.get('/api/surveys', requireLogin, async (req, res) => {
  try{
    const surveys = await Survey.find({ _user: req.user.id })
    .select({
      recipients:false
    });

    res.send(surveys);
    res.status(200).send({message:'Find to surveys'});
  }catch(e){
    res.status(422).send(e);
    console.error(e)
  }
 
});
  app.get("/api/surveys/:surveyId/:choice", async (req, res) => {
    res.send("Thanks for voting");
  });
  app.post("/api/surveys/webhooks", async (req, res) => {
    try {
      const p = new Path("/api/surveys/:surveyId/:choice");

      const events = _.chain(req.body)
        .map(({ email, url }) => {
          const match = p.test(new URL(url).pathname);
          if (match) {
            return { email, surveyId: match.surveyId, choice:match.choice };
          }
        })
        .compact()
        .uniqBy("email", "surveyId")
        .each(({ surveyId, email, choice }) => {
          Survey.updateOne(
            {
              _id: surveyId,
              recipients: {
                $elemMatch: { email: email, responded: false }
              }
            },
            {
              $inc: {[choice]:1 },
              $set: { 'recipients.$.responded': true },
              lastResponded: new Date()
            }
          ).exec();
        })
        .value()
      console.log(events);
      res.send({});
    } catch (e) {
      console.error(e);
    }
  });
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map((email) => ({ email })),
      _user: req.user.id,
      dateSent: Date.now(),
    });
    const mailer = new Mailer(survey, template(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (e) {
      res.status(422).send(e);
    }
  });
};
