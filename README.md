# Family Funds Hub

Family Funding Hub is a web application for money management in the households.

## Tech Stack

- [NextJS](https://nextjs.org/)
- [MySQL](https://www.mysql.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [NextAuth](https://next-auth.js.org/)
- [Redux](https://redux.js.org/)
- [Prisma](https://www.prisma.io/docs)
- [NodeMailer](nodemailer.com/)
- And more libraries.

## Environment variables Reference

To run this project, you will need to add the following environment variables to your .env file

#### Database Connection

| Variable       | Type     | Description                           |
| :------------- | :------- | :------------------------------------ |
| `DATABASE_URL` | `string` | **Required**. Your mySQL Database URL |

#### NextAuth variables

| Variable               | Type     | Description                                                                                                                                                    |
| :--------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXTAUTH_SECRET`      | `string` | **Required**. The default value for the secret option in NextAuth and Middleware. [Learn More](https://next-auth.js.org/configuration/options#nextauth_secret) |
| `GOOGLE_CLIENT_ID`     | `string` | **Required**. Google's OAuth Client id [Learn More](https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid)                          |
| `GOOGLE_CLIENT_SECRET` | `string` | **Required**. Google's OAuth Client Secret [Learn More](https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid)                      |
| `NEXTAUTH_URL`         | `string` | **Required**. NextAUth's Redirect URL [Learn More](https://next-auth.js.org/configuration/options#nextauth_url)                                                |

#### NodeMailer variables

NodeMailer is utilized for sending org invites and password recovery links.

| Variable       | Type     | Description                                                        |
| :------------- | :------- | :----------------------------------------------------------------- |
| `MAILER_EMAIL` | `string` | **Required**.Sender Email Address for the Google Gmail account     |
| `MAILER_PASS`  | `string` | **Required**. Sender Email's Password for the Google Gmail account |

## Screenshots

![App Screenshot](https://github.com/aymendev1/FamilyFundsHub/blob/master-branch/screenshots/loginPage.png?raw=true)
![App Screenshot](https://github.com/aymendev1/FamilyFundsHub/blob/master-branch/screenshots/dashboard.png?raw=true)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
