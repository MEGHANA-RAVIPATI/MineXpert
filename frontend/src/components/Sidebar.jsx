import {
  LayoutDashboard,
  Building2,
  ShieldCheck,
  AlertTriangle,
  Activity,
  ClipboardCheck,
  FileText,
  UserCircle,
  Settings,
  LogOut,
  Pickaxe,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      {/* LOGO */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Pickaxe size={24} />
        </div>

        <div>
          <h2>MineXpert</h2>
          <span>Mining Governance</span>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="sidebar-nav">
        <p className="nav-title">MAIN MENU</p>

        <NavLink to="/" className="nav-item">
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/mines" className="nav-item">
          <Building2 size={19} />
          <span>Mines</span>
        </NavLink>

        <NavLink to="/compliance" className="nav-item">
          <ShieldCheck size={19} />
          <span>Compliance</span>
        </NavLink>

        <NavLink to="/violations" className="nav-item">
          <AlertTriangle size={19} />
          <span>Violations</span>
        </NavLink>

        <NavLink to="/risk-analysis" className="nav-item">
          <Activity size={19} />
          <span>Risk Analysis</span>
        </NavLink>

        <NavLink to="/corrective-actions" className="nav-item">
          <ClipboardCheck size={19} />
          <span>Corrective Actions</span>
        </NavLink>

        <p className="nav-title">MANAGEMENT</p>

        <NavLink to="/reports" className="nav-item">
          <FileText size={19} />
          <span>Reports</span>
        </NavLink>

        <NavLink to="/profile" className="nav-item">
          <UserCircle size={19} />
          <span>Profile</span>
        </NavLink>

        <NavLink to="/settings" className="nav-item">
          <Settings size={19} />
          <span>Settings</span>
        </NavLink>
      </nav>

      {/* BOTTOM */}
      <div className="sidebar-bottom">
        <div className="admin-profile">
          <div className="admin-avatar">A</div>

          <div className="admin-info">
            <strong>Administrator</strong>
            <span>Governance Admin</span>
          </div>
        </div>

        <button className="logout-btn">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;