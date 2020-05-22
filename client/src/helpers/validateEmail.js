const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default (emails) => {
  const invalidsEmails = emails
    .split(",")
    .map((email) => email.trim())
    .filter((email) => !regex.test(email));
    if(invalidsEmails.length){
        return {
            message:`These emails are invalid: ${invalidsEmails}`,
            valid:true
        }
    }
    return {
        message:``,
        valid:false
    }
};
