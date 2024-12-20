# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# Shopping List Application

## About
The **Shopping List Application** is a simple React-based project that allows users to create, manage, and organize shopping lists. Users can:
- Add, edit, and delete shopping lists.
- Add, edit, delete, and mark items as bought within each list.
- Search for specific lists using the search functionality.
- View a summary of total and bought items in the profile section.
- Pagination displays 10 lists per page.

This application is ideal for anyone looking to manage their shopping effectively and efficiently.

## Features
- Create and manage multiple shopping lists.
- Add, edit, and delete items in each list.
- Mark items as "bought" to keep track of purchases.
- Search functionality to filter lists.
- Pagination for easy navigation of multiple lists.
- Profile section showing statistics about lists and items.

## Technologies Used
- **Frontend**: React.js
- **State Management**: React useState
- **Routing**: React Router
- **Styling**: CSS

## Setup and Installation
Follow these steps to set up and run the project locally:

### Prerequisites
- Ensure you have **Node.js** and **npm** installed. [Download Node.js here](https://nodejs.org/).
- Have **Git** installed. [Download Git here](https://git-scm.com/).

### Steps to Run the Project
1. Clone the Repository:
   ```bash
   git clone https://github.com/VignessBala/shoppee-partner.git

2. Navigate to the Repository:
   ```bash
   cd shoppee-partner
   
3. Install Dependencies:
   ```bash
   npm install
   
4. Run Project:
   ```bash
   npm run dev



## What to Do as a User

### Creating a User and Login
- Before Login , click signup and create a user .
- After signup as a user, Enter mail and password and click login to go to **dashboard**.
  
### Creating a Shopping List
- Click the **"Add List"** button to create a new shopping list.
- Enter a list name and click **"Save"**.

### Managing Items
- Add items to a list by entering the item name and quantity.
- Mark items as **bought** or **unmark** them for tracking.

### Searching for Lists
- Use the search bar at the top to find specific shopping lists.

### Profile Summary
- Navigate to the **Profile** page to view total lists, items, and bought items.

### Pagination
- Use the pagination buttons to navigate through lists when the count exceeds 10 per page.


