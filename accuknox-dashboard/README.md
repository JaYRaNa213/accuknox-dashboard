# AccuKnox Dashboard Assignment
## Live Demo
[AccuKnox Dashboard](https://accuknox-dashboard-amber.vercel.app/)
---
## Overview
AccuKnox Dashboard is a customizable Cloud Security Executive Dashboard built with modern frontend technologies. The application enables users to dynamically manage categories and widgets, visualize security insights through interactive charts, and perform comprehensive searches across dashboard components.
This project was developed as an assignment for AccuKnox.
---
## Preview
![Dashboard Screenshot](./src/assets/Dashboard.png)
---
## Technology Stack
| Technology | Purpose |
|-----------|---------|
| React + Vite | Fast and efficient frontend development |
| Material UI (MUI) | Prebuilt UI components and responsive design |
| Redux Toolkit | State management for categories and widgets |
| Recharts | Data visualization including pie charts and risk assessments |
---
## Core Features
### 1. Dynamic Categories and Widgets
- Categories loaded from `src/data/initialData.json` using Redux
- Support for multiple categories (CSPM, CWPP, Registry Scan)
- Each category contains one or more configurable widgets
### 2. Widget Types
- **Text Widgets**: Display informational content
- **Pie Chart Widgets**: Visualize risk assessments, issues, and status distribution
### 3. Widget Management
- Add new widgets through dialog interfaces or sidebar
- Remove widgets using integrated close buttons
- Edit category membership and configuration
### 4. Global Search Functionality
- Real-time search across all widgets and categories
- Instant filtering and results display
### 5. Responsive Design
- Grid-based layout system
- Seamless adaptation to all screen sizes
- Material UI responsive design implementation
---
## Example Widget Implementations
1. **Cloud Accounts**
   - Visualization: Pie Chart
   - Data: Connected vs. not connected accounts
2. **Cloud Account Risk Assessment**
   - Display: Summary format
   - Categories: Pass, Fail, Warning status
3. **Workload Alerts**
   - Monitoring: CPU, Memory, Network, Storage
   - Alert level classification
4. **Image Risk Assessment**
   - Analysis: Vulnerabilities by severity level
   - Visual representation of security status
5. **Image Security Issues**
   - Classification: Critical, High, Medium, Low priority issues
   - Comprehensive security overview
---
```
## Project Structure
accuknox-dashboard/
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public/
│ └── vite.svg
├── README.md
├── src/
│ ├── App.jsx
│ ├── assets/
│ │ └── Dashboard.png
│ ├── components/
│ │ ├── AddWidgetDialog.jsx
│ │ ├── AddWidgetRightSideBar.jsx
│ │ ├── CategoryPanel.jsx
│ │ ├── DashboardHeader.jsx
│ │ ├── SearchBar.jsx
│ │ ├── WidgetCard.jsx
│ │ └── WidgetLibraryDrawer.jsx
│ ├── data/
│ │ └── initialData.json
│ ├── index.css
│ ├── main.jsx
│ ├── pages/
│ │ └── DashboardPage.jsx
│ └── store/
│ ├── dashboardSlice.js
│ └── store.js
├── tree.cjs
├── tree.txt
└── vite.config.js
```
---
## Installation and Setup
### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager
### Step 1: Clone Repository
```bash
git clone https://github.com/JaYRaNa213/accuknox-dashboard.git
cd accuknox-dashboard
```
## Step 2: Install Dependencies
npm install
## Step 3: Development Mode
npm run dev
## Application will be available at: http://localhost:5173

## Step 4: Production Build
npm run build
npm run preview
This generates an optimized production build and starts a preview server.

## Future Development Roadmap
### Phase 1: Enhanced Security
Authentication system implementation
Role-based access control
### Phase 2: Expanded Visualization
Additional chart types (Bar charts, Line graphs, Heatmaps)
Custom chart configuration options
### Phase 3: Backend Integration
Database integration for persistent storage
API endpoints for dynamic data management
### Phase 4: User Experience
Dark mode toggle functionality
Advanced customization options
Project Information
Assignment Project for AccuKnox
Cloud Security Dashboard Implementation

Author: Jay Prakash
Project Type: Frontend Dashboard Application
Primary Focus: Cloud Security Visualization and Management
