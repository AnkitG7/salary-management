import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import AnalyticsPage from "./pages/AnalyticsPage";

import DashboardPage from "./pages/DashboardPage";

import EmployeeDetailsPage from "./pages/EmployeeDetailsPage";

import EmployeesPage from "./pages/EmployeesPage";

export default function App({ isDarkMode, setIsDarkMode }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <AppLayout isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/employees" element={<EmployeesPage />} />

          <Route path="/employees/:id" element={<EmployeeDetailsPage />} />

          <Route path="/analytics" element={<AnalyticsPage />} />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
