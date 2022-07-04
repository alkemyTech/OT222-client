import axios from 'axios';

const EmailService = async emailData => {
  const { to, from, subject, text, html } = emailData;

  try {
    await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/mail`, {
      to,
      from,
      subject,
      text,
      html,
    });
  } catch (error) {
    alert(error);
  }
};

export default EmailService;
