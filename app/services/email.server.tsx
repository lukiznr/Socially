import { renderToString } from "react-dom/server";
import type { SendEmailFunction } from "remix-auth-email-link";
import type { User } from "@prisma/client";

type EmailOption = {
  emailAddress: string;
  subject: string;
  body: string;
};

let sendMail = async (option: EmailOption) => {
  await fetch("https://nice-gray-shark-hose.cyclic.app/send-email", {
    body: JSON.stringify({
      email: option.emailAddress,
      subject: option.subject,
      html: option.body,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
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
  console.log(options.magicLink);
  await sendMail(option);
};
