import {
  Search,
  Bell,
  ChevronDown,
  Menu,
} from "lucide-react";

function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="mobile-menu">
          <Menu size={21} />
        </button>

        <div>
          <h1>Governance Dashboard</h1>
          <p>Monitor mining operations, compliance and safety</p>
        </div>
      </div>

      <div className="topbar-right">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search mines, violations..."
          />
        </div>

        <button className="notification-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <div className="topbar-user">
          <div className="topbar-avatar">A</div>

          <div className="topbar-user-info">
            <strong>Admin User</strong>
            <span>Administrator</span>
          </div>

          <ChevronDown size={17} />
        </div>
      </div>
    </header>
  );
}

export default Topbar;