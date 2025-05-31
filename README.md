User Management Dashboard
A simple admin dashboard built with Next.js and TypeScript that allows you to view a list of users, filter them by name or city, and add new users using a multi-step form. This project demonstrates API integration, state management, conditional rendering, and form validation in a modern React framework.

Features
User List (/dashboard)

Fetch users from a public API: https://jsonplaceholder.typicode.com/users

Display user details: name, email, phone, and city

Search bar to filter users by name or city

Loading and error handling states

Add User (/dashboard/add)

Multi-step form with 3 steps:

Basic Info: name, email

Address: street, city, zip code

Review & Confirm

Form validation: required fields and email format

Navigation between form steps with “Back” and “Next” buttons

Logs submitted user data to the console

“Back to Dashboard” button to return to user list

Technologies Used
Next.js (React framework)

TypeScript

React hooks (useState and Context API for state management)

Fetch API for data fetching
