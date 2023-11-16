export type SendEmailBody = {
  email: string | string[];
  subject: string;
  html: string;
};

type AuthEmailOptions = {
  email: string;
  code: string;
  magicLink?: string | null;
};

export const sendEmail = async (body: SendEmailBody) => {
  return fetch("https://nice-gray-shark-hose.cyclic.app/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...body }),
  });
};

export const sendAuthEmail = async ({
  email,
  code,
  magicLink,
}: AuthEmailOptions) => {
  const subject = "Your verification code for Connectify TOTP";
  const html = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      </head>
      <body style="max-width: 50%; margin: 0 auto; text-align: center;">
        <h1>Code: ${code}</h1>
        ${
          magicLink &&
          `<p style="font-size: 16px;">
            Alternatively, you can click the Magic Link URL.
            <br />
            <a href="${magicLink}">${magicLink}</a>
          </p>`
        }
      </body>
    </html>
  `;

  await sendEmail({
    email,
    subject,
    html,
  });
};
