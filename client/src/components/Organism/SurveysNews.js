import React, { useState } from "react";
import SurveyForm from "../Molecules/SurveyForm";
import SurveyReview from "../Molecules/SurveyReview";
import validateEmail from "../../helpers/validateEmail";
import { connect } from "react-redux";
const SurveysNews = ({ match }) => {
  const [review, setReview] = useState(false);
  const [values, setValues] = useState({
    body: "",
    title: "",
    subject: "",
    recipients: "",
  });

  const [valid, setValid] = useState({
    body: true,
    messageBody: "",

    messageSubject: "",
    subject: true,

    messageTitle: "",
    title: true,

    messageRecipient: "",
    recipients: true,

    valid: false,
  });

  const handleChange = (prop) => (event) => {
    event.preventDefault();
    // store.dispatch(handleForm({ [prop]: event.target.value }));
    setValues({ ...values, [prop]: event.target.value });
    validateForm(prop, event);
  };

  const validateForm = (prop, event) => {
    let subject = { valid: true, message: "" };
    let body = { valid: true, message: "" };
    let title = { valid: true, message: "" };
    let recipients = { valid: true, message: "" };

    switch (prop) {
      case "body":
        if (event.target.value.length < 4) {
          body.valid = false;
          body.message = "Invalid body format";
        }
        break;
      case "subject":
        if (event.target.value.length < 4) {
          subject.valid = false;
          subject.message = "Password must be at least 4 characters long";
        }
        break;
      case "title":
        if (event.target.value.length < 4) {
          title.valid = false;
          title.message = "Password must be at least 4 characters long";
        }
        break;
      case "recipients":
        const { message, valid } = validateEmail(event.target.value);
        if (valid) {
            recipients.valid = false;
            recipients.message = message;
        }
        break;
      default:
        break;
    }
    setValid({
      ...valid,
      body: body.valid,
      subject: subject.valid,
      title: title.valid,
      recipients: recipients.valid,
      messageBody: body.message,
      messageSubject: subject.message,
      messageRecipient: recipients.message,
      messageTitle: title.message,
    });
  };

  return (
    <div>
      <SurveyReview
        values={values}
        onCancel={() => setReview(false)}
        review={review}
      />

      <SurveyForm
        handleChange={handleChange}
        valid={valid}
        values={values}
        onSurveyReview={() => setReview(true)}
        review={review}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  form: state.surveysReducer.form,
});
export default connect(mapStateToProps, {})(SurveysNews);
