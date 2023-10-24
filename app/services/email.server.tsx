import { renderToString } from "react-dom/server";
import type { SendEmailFunction } from "remix-auth-email-link";
import type { User } from "@prisma/client";
import nodemailer from "nodemailer";

type EmailOption = {
  emailAddress: string;
  subject: string;
  body: string;
};

export let sendMail = async (option: EmailOption) => {
  const mailTransport = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: "admin@luki.my.id",
      pass: "BLxtdDiuXKwT",
    },
  });

  const mailOptions = {
    from: '"Connectify" <admin@luki.my.id>',
    to: option.emailAddress,
    subject: option.subject,
    html: option.body,
  };

  await mailTransport.sendMail(mailOptions);
};

export let sendEmail: SendEmailFunction<User> = async (options) => {
  let subject = "Here's your Magic sign-in link";
  let body = renderToString(
    <p>
      Hi {options.user?.name || "there"},<br />
      <br />
      <a href={options.magicLink}>Click here to login on example.app</a>
    </p>
  );
  let option: EmailOption = {
    emailAddress: options.emailAddress,
    subject,
    body,
  };
  console.log(options.magicLink)
  await sendMail(option);
};
