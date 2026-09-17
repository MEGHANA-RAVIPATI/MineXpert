import { useState } from "react";
import {
  Settings as SettingsIcon,
  Bell,
  ShieldCheck,
  Monitor,
} from "lucide-react";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [alerts, setAlerts] = useState(true);

  return (
    <div className="settings-page">

      <div className="settings-header">
        <div>
          <span>ADMINISTRATION</span>
          <h1>Settings</h1>
          <p>
            Configure MineXpert governance dashboard preferences.
          </p>
        </div>
      </div>

      <div className="settings-grid">

        <div className="settings-card">

          <div className="settings-card-title">
            <Bell size={18} />
            <div>
              <h3>Notifications</h3>
              <p>Manage governance notifications.</p>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <strong>System Notifications</strong>
              <span>Receive dashboard notifications.</span>
            </div>

            <button
              className={`toggle ${
                notifications ? "active" : ""
              }`}
              onClick={() =>
                setNotifications(!notifications)
              }
            >
              <span />
            </button>
          </div>

          <div className="setting-row">
            <div>
              <strong>Critical Risk Alerts</strong>
              <span>Receive alerts for critical risks.</span>
            </div>

            <button
              className={`toggle ${
                alerts ? "active" : ""
              }`}
              onClick={() =>
                setAlerts(!alerts)
              }
            >
              <span />
            </button>
          </div>

        </div>

        <div className="settings-card">

          <div className="settings-card-title">
            <ShieldCheck size={18} />
            <div>
              <h3>Security</h3>
              <p>Administrator security controls.</p>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <strong>Role-Based Access</strong>
              <span>Administrator access enabled.</span>
            </div>

            <strong className="enabled-text">
              Enabled
            </strong>
          </div>

          <div className="setting-row">
            <div>
              <strong>Session Security</strong>
              <span>Protected administrator session.</span>
            </div>

            <strong className="enabled-text">
              Active
            </strong>
          </div>

        </div>

        <div className="settings-card">

          <div className="settings-card-title">
            <Monitor size={18} />
            <div>
              <h3>Dashboard</h3>
              <p>Dashboard display preferences.</p>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <strong>Monitoring Mode</strong>
              <span>Live governance monitoring.</span>
            </div>

            <strong className="enabled-text">
              Live
            </strong>
          </div>

        </div>

        <div className="settings-card">

          <div className="settings-card-title">
            <SettingsIcon size={18} />
            <div>
              <h3>System Information</h3>
              <p>MineXpert platform information.</p>
            </div>
          </div>

          <div className="system-info">
            <span>Platform</span>
            <strong>MineXpert Governance</strong>

            <span>Version</span>
            <strong>1.0.0</strong>

            <span>Environment</span>
            <strong>Production Dashboard</strong>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;