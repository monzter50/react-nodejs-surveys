const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail{
    constructor({subject,recipients},content){
        super();
        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('josemonzter50@gmail.com');
        this.subject = subject;
        this.body = new helper.Content('text/html',content);
        this.recipients= this.formatAdresses(recipients);
        
        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }
    formatAdresses(recipients){
        return recipients.map(({email})=>{
            return new helper.Email(email);
        });
    }
    addClickTracking(){
        const trackingsSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true,true);
        trackingsSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingsSettings);
    }
    addRecipients(){
        const personalize = new helper.Personalization();
        this.recipients.forEach( recipient=>{
            personalize.addTo(recipient);
        })
        this.addPersonalization(personalize);
    }
    async send(){
        const request = this.sgApi.emptyRequest({
            method:'POST',
            path:'/v3/mail/send',
            body:this.toJSON()
        });
       let response = await this.sgApi.API(request);
       return response;
    }
}

module.exports = Mailer;