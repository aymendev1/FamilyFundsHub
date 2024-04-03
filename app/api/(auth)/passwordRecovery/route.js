import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const nodemailer = require("nodemailer");
import crypto from "crypto";
const prisma = new PrismaClient();

// Function to send the password reset email
const sendPasswordResetEmail = (recipientEmail, resetLink) => {
  // Customize the email subject and body as needed
  const body = `
    <!DOCTYPE html>
<html>
<head>

  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Password Reset</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
  /**
   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
   */
  @media screen {
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 400;
      src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
    }
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 700;
      src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
    }
  }
  body,
  table,
  td,
  a {
    -ms-text-size-adjust: 100%; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }
  
  table,
  td {
    mso-table-rspace: 0pt;
    mso-table-lspace: 0pt;
  }
  
  img {
    -ms-interpolation-mode: bicubic;
  }
  
  a[x-apple-data-detectors] {
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    text-decoration: none !important;
  }
  
  div[style*="margin: 16px 0;"] {
    margin: 0 !important;
  }
  body {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  
  table {
    border-collapse: collapse !important;
  }
  a {
    color: #1a82e2;
  }
  img {
    height: auto;
    line-height: 100%;
    text-decoration: none;
    border: 0;
    outline: none;
  }
  </style>

</head>
<body style="background-color: #e9ecef;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%">

    
    <tr>
      <td align="center" bgcolor="#e9ecef">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" valign="top" style="padding: 36px 24px;">
              <a href="" target="_blank" style="display: inline-block;">
                <img src="https://github.com/aymendev1/aymendev1/blob/master-branch/assets/myLogo.png?raw=true" alt="Logo" border="0" width="300" style="display: block; width: 300px; max-width: 300px; min-width: 250px;">
              </a>
            </td>
          </tr>
        </table>
       
        </td>
        </tr>
        </table>
     
      </td>
    </tr>
    <tr>
      <td align="center" bgcolor="#e9ecef">
      
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
      
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Reset your password</h1>
            </td>
          </tr>
        </table>
        </td>
        </tr>
        </table>
       
      </td>
    </tr>
  
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

        
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">Tap the button below to reset your password. If you didn't request a password reset for your account, you can safely delete this email and secure your account .</p>
            </td>
          </tr>
        

          
          <tr>
            <td align="left" bgcolor="#ffffff">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                          <a href="${resetLink}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Reset password</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
              <p style="margin: 0;"><a href="${resetLink}" target="_blank">${resetLink}</a></p>
            </td>
          </tr>         
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
              <p style="margin: 0;">Cheers,<br> FamilyFundsHub</p>
            </td>
          </tr>
        </table>
        </td>
        </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
        <td align="center" valign="top" width="600">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;">You received this email because we received a request for password reset for your account. If you didn't request it  you can safely delete this email.</p>
            </td>
          </tr>   
        </table>
        </td>
        </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  // SEND EMAIL
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASS,
    },
  });

  var mailOptions = {
    from: process.env.MAILER_EMAIL,
    to: recipientEmail,
    subject: "Password Reset for your FamilyFundsHub Account",
    html: body,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return NextResponse.json({ message: error }, { status: 500 });
    } else {
      return NextResponse.json({ message: "email sent " }, { status: 200 });
    }
  });
};

async function SendRecoveryEmail(req) {
  const body = await req.json();
  const { email } = body;
  if (!email) {
    return NextResponse.json(
      { error: "Please fill out all required fields." },
      {
        status: 400,
      }
    );
  }
  try {
    // Checking if email address / username exists in the DB
    const userExist = await prisma.users.findFirst({ where: { email: email } });
    // If user Exists
    if (!userExist) {
      return NextResponse.json(
        {
          error: "Email not found ! ",
        },
        {
          status: 404,
        }
      );
    }
    // We create the token
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
    const resetToken = crypto.randomBytes(20).toString("hex");
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const UpdateUser = await prisma.users.update({
      where: { id: userExist.id },
      data: {
        reset_token: passwordResetToken,
        reset_token_expiry: tomorrow,
        date_updated: new Date(),
      },
    });
    const resetLink = `${process.env.NEXTAUTH_URL}/passwordRecovery/${passwordResetToken}`;

    sendPasswordResetEmail(email, resetLink);
    return NextResponse.json({ message: "email sent " }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Oops! Something went wrong on our end. Please try again later",
        info: error.message,
      },
      {
        status: 500,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export { SendRecoveryEmail as POST };
