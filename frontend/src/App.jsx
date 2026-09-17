import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";

import Dashboard from "./pages/Dashboard";
import Mines from "./pages/Mines";
import MineCompliance from "./pages/MineCompliance";
import Violations from "./pages/Violations";
import RiskAnalysis from "./pages/RiskAnalysis";
import CorrectiveActions from "./pages/CorrectiveActions";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <AdminLayout>

        <Routes>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/mines"
            element={<Mines />}
          />

          <Route
            path="/compliance"
            element={<MineCompliance />}
          />

          <Route
            path="/violations"
            element={<Violations />}
          />

          <Route
            path="/risk-analysis"
            element={<RiskAnalysis />}
          />

          <Route
            path="/corrective-actions"
            element={<CorrectiveActions />}
          />

          <Route
            path="/reports"
            element={<Reports />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

        </Routes>

      </AdminLayout>
    </BrowserRouter>
  );
}

export default App;