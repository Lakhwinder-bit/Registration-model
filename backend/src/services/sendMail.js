import { Resend } from "resend";
import config from "../config/config.js";

const resend = new Resend(config.EMAIL_API);

export const sendEmail = async (to, subject, html) => {
  try {

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to:"singhlakhiwinder3@gmail.com" ,
      subject,
      html
    });
  

    console.log("Email sent Successfully..");

  } catch (error) {

    console.log("Email Error:", error);

  }
};