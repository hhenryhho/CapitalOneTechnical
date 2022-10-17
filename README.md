## Getting Started

Install packages by running:

```
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Authentication

The app is secured using Firebase authentication. Accounts are not verified, but are only used to switch between data. You can create an account if you wish to save transaction information, or use the guest account.

The sample transactions listed in the problem can be viewed and accessed using the following credentials:

Email: presentation@capitalone.com
Password: 123123

## Project Details

The project is a full-stack single page web app that calculates the max reward points a user can obtain given a set of transactions.
Users can create an account which gives the ability to save transactions.

The main logic of the app can be found through: **`src > util > calculateMaxPoints.js`**.
The functional component takes a _Transaction_ object and an array of _Rules_ and uses
[Dynamic Programming](https://en.wikipedia.org/wiki/Dynamic_programming) to recursively go through all
the possible combinations of rules to determine the max possible points.

The _Transaction_ object is generated directly from the UI, so users can enter as many transactions as they wish.
The UI then formats the input into a _Transaction_ object using **`src > util > formatTransactions.js`**.
A sample _Transaction_ object is provided in **`src > constants > transactions.js`**. The Rules are static, and
are stored in **`src > constants > rules.js`**. There is no functionality to add new rules from the UI, however you
can simply add them into the file.

## Tools

Frontend Stack

- Javascript Library: [React.js](https://reactjs.org/)
- React Framework: [Next.js](https://nextjs.org/)
- UI Library: [ChakraUI](https://chakra-ui.com/)
- Cloud Platform: [Vercel](https://vercel.com/)

Backend Stack

- Database: [Firebase](https://firebase.google.com/)
- Auth Service: [Firebase](https://firebase.google.com/)
