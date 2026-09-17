import { useState } from "react";
import {
  UserCircle,
  Mail,
  ShieldCheck,
  Building2,
  X,
  Save,
  Lock,
} from "lucide-react";

function Profile() {
  const [showEdit, setShowEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@minexpert.com",
    role: "Governance Administrator",
    department: "Mining Governance",
  });

  const [formData, setFormData] = useState(profile);

  const [passwordData, setPasswordData] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [message, setMessage] = useState("");

  const openEditProfile = () => {
    setFormData(profile);
    setMessage("");
    setShowEdit(true);
  };

  const saveProfile = () => {
    setProfile(formData);
    setShowEdit(false);
    setMessage("Profile updated successfully.");

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const changePassword = () => {
    if (
      !passwordData.current ||
      !passwordData.newPassword ||
      !passwordData.confirm
    ) {
      setMessage("Please fill in all password fields.");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirm) {
      setMessage("New passwords do not match.");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      return;
    }

    setPasswordData({
      current: "",
      newPassword: "",
      confirm: "",
    });

    setShowPassword(false);
    setMessage("Password changed successfully.");

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  return (
    <div className="profile-page">

      {/* HEADER */}
      <div className="profile-header">
        <div>
          <span>ADMINISTRATION</span>

          <h1>Administrator Profile</h1>

          <p>
            Manage your MineXpert administrator information.
          </p>
        </div>
      </div>

      {/* SUCCESS / ERROR MESSAGE */}
      {message && (
        <div className="profile-message">
          <CheckIcon />
          {message}
        </div>
      )}

      {/* PROFILE CARD */}
      <div className="profile-card">

        <div className="profile-top">

          <div className="profile-avatar">
            {profile.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2>{profile.name}</h2>

            <p>{profile.role}</p>
          </div>

        </div>

        {/* DETAILS */}
        <div className="profile-details">

          <div className="profile-field">
            <Mail size={17} />

            <div>
              <span>Email</span>
              <strong>{profile.email}</strong>
            </div>
          </div>

          <div className="profile-field">
            <ShieldCheck size={17} />

            <div>
              <span>Role</span>
              <strong>{profile.role}</strong>
            </div>
          </div>

          <div className="profile-field">
            <Building2 size={17} />

            <div>
              <span>Department</span>
              <strong>{profile.department}</strong>
            </div>
          </div>

          <div className="profile-field">
            <UserCircle size={17} />

            <div>
              <span>Account Status</span>

              <strong className="profile-active">
                Active
              </strong>
            </div>
          </div>

        </div>

        {/* ACTION BUTTONS */}
        <div className="profile-actions">

          <button onClick={openEditProfile}>
            Edit Profile
          </button>

          <button
            className="profile-secondary"
            onClick={() => {
              setMessage("");
              setShowPassword(true);
            }}
          >
            Change Password
          </button>

        </div>

      </div>

      {/* EDIT PROFILE MODAL */}
      {showEdit && (
        <div
          className="profile-modal-overlay"
          onClick={() => setShowEdit(false)}
        >

          <div
            className="profile-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="profile-modal-header">

              <div>
                <span>ACCOUNT SETTINGS</span>

                <h2>Edit Profile</h2>

                <p>Update administrator information.</p>
              </div>

              <button
                className="profile-close"
                onClick={() => setShowEdit(false)}
              >
                <X size={19} />
              </button>

            </div>

            <div className="profile-form">

              <label>
                Full Name

                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                Email Address

                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                Role

                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                Department

                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      department: e.target.value,
                    })
                  }
                />
              </label>

            </div>

            <div className="profile-modal-footer">

              <button
                className="profile-cancel"
                onClick={() => setShowEdit(false)}
              >
                Cancel
              </button>

              <button
                className="profile-save"
                onClick={saveProfile}
              >
                <Save size={15} />
                Save Changes
              </button>

            </div>

          </div>

        </div>
      )}

      {/* CHANGE PASSWORD MODAL */}
      {showPassword && (
        <div
          className="profile-modal-overlay"
          onClick={() => setShowPassword(false)}
        >

          <div
            className="profile-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="profile-modal-header">

              <div>
                <span>SECURITY</span>

                <h2>Change Password</h2>

                <p>
                  Update your administrator account password.
                </p>
              </div>

              <button
                className="profile-close"
                onClick={() => setShowPassword(false)}
              >
                <X size={19} />
              </button>

            </div>

            <div className="profile-form">

              <label>
                Current Password

                <input
                  type="password"
                  placeholder="Enter current password"
                  value={passwordData.current}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      current: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                New Password

                <input
                  type="password"
                  placeholder="Enter new password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                Confirm New Password

                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={passwordData.confirm}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirm: e.target.value,
                    })
                  }
                />
              </label>

            </div>

            <div className="profile-modal-footer">

              <button
                className="profile-cancel"
                onClick={() => setShowPassword(false)}
              >
                Cancel
              </button>

              <button
                className="profile-save"
                onClick={changePassword}
              >
                <Lock size={15} />
                Update Password
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

/* Small success icon */
function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default Profile;