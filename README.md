# Xeno CRM Frontend

## Overview
This is the frontend for the Xeno CRM platform, providing a modern, animated, and responsive user interface for customer management, segmentation, campaign creation, and analytics. Built with React and native CSS, it connects to the backend API for all data operations and authentication.

## Tech Stack
- **React.js** (with hooks)
- **react-router-dom** (routing)
- **axios** (API requests)
- **@heroicons/react** (icons)
- **Native CSS** (custom, modern, responsive)

## Setup Instructions
1. Clone the repository and navigate to the `frontend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Environment Variables
- `REACT_APP_API_URL` (optional) - Set the backend API URL if not using the default proxy

## Main Dependencies
- react
- react-dom
- react-router-dom
- axios
- @heroicons/react

## Main Pages & Components
- **LoginPage**: User login (Google OAuth and manual login)
- **Dashboard**: Key metrics, recent campaigns, and stats
- **Customers**: List, add, and edit customers in a modern table
- **Campaigns**: List, add, and edit campaigns in a modern table
- **Segments**: List, add, and edit customer segments
- **CustomerForm, CampaignForm, SegmentForm**: Forms for CRUD operations
- **Layout**: Sidebar navigation and main content area

## Styling
- All styles are written in native CSS (`src/styles/main.css`)
- Modern, animated, and responsive design
- Consistent color scheme, spacing, and typography
- Tables, cards, and forms are visually appealing and mobile-friendly

## Authentication Flow
- Google OAuth 2.0 and manual login supported
- JWT tokens are stored and sent with API requests
- Protected routes redirect to login if not authenticated (if enabled)

## Running the App
```bash
npm start
```

---

For more details, see the code and comments in each component file.
