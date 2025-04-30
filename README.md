# Cleaning Service Management System Frontend (Next.js)

This is a modern, responsive frontend application built with **Next.js 14 (App Router)**. It provides a dashboard to display, edit, and delete booking records from an authenticated API.

## Features

-  Authentication via Bearer token
-  Fetch and display bookings
-  Edit and update bookings
-  Delete bookings with confirmation
-  Tailwind CSS styling
-  Framer Motion animations
-  React Icons for visuals
-  Toast notifications via `react-toastify`

## Tech Stack

- **Framework:** [Next.js 14+](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Notifications:** [React Toastify](https://fkhadra.github.io/react-toastify/)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started


### 1. Clone the repository

```bash
git clone https://github.com/faizansafwan/cleaning-service-frontend.git
cd cleaning-service-frontend
```
### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure environment variables
Create a .env file in the root of the project and add your API base URL:

NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/


### 4. run the development server

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



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
