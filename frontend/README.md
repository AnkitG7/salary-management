# Salary Management System Frontend

Modern frontend application for managing employee records, workforce analytics, and salary insights at scale.

Built using React, Vite, Ant Design, and Recharts with a focus on production-grade architecture, scalability, and maintainability.

---

# Overview

This frontend provides HR teams and administrators with a modern analytics dashboard for:

- Employee management
- Workforce analytics
- Salary insights
- Search and filtering
- Compensation visibility
- Interactive data visualization

The application is optimized for handling large employee datasets with responsive UI rendering, server-driven pagination, and reusable component architecture.

---

# Features

# Employee Management

- Create employee
- View employee details
- Update employee information
- Delete employee
- Paginated employee listing
- Search employees
- Filter employees
- Sort employees

---

# Workforce Analytics

## Salary Insights

- Average salary by country
- Minimum salary by country
- Maximum salary by country
- Average salary by job title

---

## Workforce Distribution

- Employee count by country
- Employee count by employment status
- Employee count by job title

---

# UI/UX Features

- Responsive dashboard layout
- Dark mode / light mode
- Persistent theme support
- Interactive charts
- Reusable modal system
- Loading states
- Empty states
- Consistent design system

---

# Tech Stack

# Core

- React
- Vite
- React Router DOM

---

# UI

- Ant Design
- Recharts

---

# State & Data Management

- React Hooks
- Axios

---

# Testing

- Vitest
- React Testing Library

---

# Frontend Architecture

```text
src/
├── api/
├── components/
│   ├── analytics/
│   ├── dashboard/
│   └── employees/
├── layouts/
├── pages/
├── tests/
└── utils/
```

---

# Architecture Decisions

# Component Separation

The frontend separates:

- Pages
- Reusable UI components
- API communication
- Utility functions
- Analytics widgets

This improves:

- Maintainability
- Reusability
- Scalability
- Testing isolation

---

# API Isolation

All backend communication is centralized inside:

```text
src/api
```

Benefits:

- Cleaner UI components
- Easier API maintenance
- Better request abstraction
- Centralized error handling
- Simplified testing

---

# Theme System

Ant Design token-based theming is used instead of hardcoded colors.

Supports:

- Dark mode
- Light mode
- Design consistency
- Scalable theming

Theme preference is persisted using:

```text
localStorage
```

---

# Analytics Decomposition

Analytics features are separated into reusable widgets:

- Country analytics
- Workforce distribution
- Job title insights
- Salary analytics

Benefits:

- Modular rendering
- Easier feature expansion
- Reduced component complexity
- Improved readability

---

# Performance Considerations

The frontend is optimized for large-scale employee datasets.

Implemented optimizations include:

- Server-side pagination
- Server-side filtering
- Server-side sorting
- Controlled component rendering
- Reusable chart components
- Minimal duplicated state
- Lazy API-driven data fetching

This prevents loading all employee records into browser memory simultaneously.

---

# Theme Support

Supported themes:

- Light theme
- Dark theme

The UI uses Ant Design theme tokens for:

- Colors
- Typography
- Borders
- Backgrounds
- Shadows
- Component consistency

---

# Testing Strategy

Frontend tests are implemented using:

- Vitest
- React Testing Library

Current test coverage includes:

- Application rendering
- Employee list rendering
- Component behavior
- UI interactions

Testing characteristics:

- Deterministic
- Fast
- Isolated
- Maintainable

---

# Setup Instructions

# 1. Install Dependencies

```bash
npm install
```

---

# 2. Configure Environment Variables

Create:

```text
.env
```

Example:

```env
VITE_API_BASE_URL=http://localhost:8000
```

---

# 3. Start Development Server

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

# 4. Run Tests

```bash
npm run test
```

---

# 5. Create Production Build

```bash
npm run build
```

---

# Backend Dependency

This frontend depends on the backend API server.

Default backend URL:

```text
http://localhost:8000
```

Ensure the backend service is running before starting the frontend application.

---

# Key Engineering Decisions

# Why React + Vite?

- Fast development startup
- Minimal configuration
- Excellent React ecosystem support
- Optimized production builds
- Better developer experience

---

# Why Ant Design?

- Enterprise-ready component library
- Strong accessibility defaults
- Robust theming support
- Consistent UI system
- Dashboard-oriented design patterns

---

# Why Recharts?

- Composable React chart components
- Lightweight integration
- Good dashboard compatibility
- Easy customization

---

# Scalability Considerations

The frontend architecture is designed for long-term scalability.

Scalable design choices include:

- Component isolation
- API abstraction
- Reusable analytics widgets
- Server-driven querying
- Minimal global state complexity
- Modular directory structure

---

# Production Considerations

Potential production enhancements:

- Virtualized tables
- Debounced searching
- Role-based access control
- CSV export support
- Real-time analytics
- Error boundaries
- E2E testing
- CDN asset delivery
- Request caching
- Monitoring and observability

---

# Assessment Alignment

This project satisfies the following assessment requirements:

- Employee CRUD management
- Salary analytics
- Workforce insights
- Production-style architecture
- Scalable frontend design
- Deterministic testing
- Modern UI/UX implementation

---

# AI Usage

AI-assisted tooling was used for:

- UI iteration
- Theme migration
- Refactoring support
- Architecture validation
- Debugging assistance

All generated code and recommendations were manually reviewed, validated, tested, and refined before integration.

---

# Author

Developed as part of the Salary Management Assessment.
