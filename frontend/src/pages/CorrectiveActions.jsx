import { useState } from "react";
import {
  ClipboardCheck,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  Search,
  Eye,
  X,
  UserCheck,
  CalendarDays,
  Save,
} from "lucide-react";

function CorrectiveActions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAction, setSelectedAction] = useState(null);
  const [showAssign, setShowAssign] = useState(false);
  const [message, setMessage] = useState("");

  const [actions, setActions] = useState([
    {
      id: "CA-001",
      mine: "Mine Alpha",
      action: "Replace damaged safety equipment",
      category: "Safety",
      priority: "Critical",
      owner: "Safety Officer",
      due: "20 Sep 2026",
      status: "Pending",
      progress: 0,
    },
    {
      id: "CA-002",
      mine: "Mine Beta",
      action: "Environmental compliance review",
      category: "Environment",
      priority: "Medium",
      owner: "Compliance Officer",
      due: "20 Sep 2026",
      status: "In Progress",
      progress: 45,
    },
    {
      id: "CA-003",
      mine: "Mine Gamma",
      action: "Worker documentation update",
      category: "Documentation",
      priority: "High",
      owner: "Site Manager",
      due: "17 Sep 2026",
      status: "Overdue",
      progress: 20,
    },
    {
      id: "CA-004",
      mine: "Mine Delta",
      action: "Equipment inspection",
      category: "Operations",
      priority: "High",
      owner: "Operations Manager",
      due: "18 Sep 2026",
      status: "In Progress",
      progress: 65,
    },
  ]);

  const [formData, setFormData] = useState({
    owner: "",
    due: "",
    status: "In Progress",
    progress: 25,
  });

  const filteredActions = actions.filter((item) => {
    const search = searchTerm.toLowerCase();

    return (
      item.id.toLowerCase().includes(search) ||
      item.mine.toLowerCase().includes(search) ||
      item.action.toLowerCase().includes(search) ||
      item.owner.toLowerCase().includes(search)
    );
  });

  const openAssignModal = () => {
    if (!selectedAction) return;

    setFormData({
      owner: selectedAction.owner,
      due: selectedAction.due,
      status: selectedAction.status,
      progress: selectedAction.progress,
    });

    setShowAssign(true);
  };

  const saveAssignment = () => {
    if (!formData.owner || !formData.due) {
      setMessage("Please enter the responsible officer and due date.");
      return;
    }

    const updatedActions = actions.map((item) =>
      item.id === selectedAction.id
        ? {
            ...item,
            owner: formData.owner,
            due: formData.due,
            status: formData.status,
            progress: Number(formData.progress),
          }
        : item
    );

    setActions(updatedActions);

    const updatedAction = updatedActions.find(
      (item) => item.id === selectedAction.id
    );

    setSelectedAction(updatedAction);
    setShowAssign(false);
    setMessage("Corrective action updated successfully.");

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  return (
    <div className="corrective-page">

      {/* HEADER */}
      <div className="corrective-header">
        <div>
          <span className="corrective-kicker">
            GOVERNANCE ACTION MANAGEMENT
          </span>

          <h1>Corrective Actions</h1>

          <p>
            Track, assign and monitor corrective actions across mining sites.
          </p>
        </div>
      </div>

      {/* SUCCESS MESSAGE */}
      {message && (
        <div className="corrective-message">
          <CheckCircle2 size={16} />
          {message}
        </div>
      )}

      {/* STATS */}
      <div className="corrective-stats">

        <div className="corrective-stat">
          <div className="corrective-icon blue">
            <ClipboardCheck size={20} />
          </div>

          <div>
            <span>Total Actions</span>
            <strong>{actions.length}</strong>
          </div>
        </div>

        <div className="corrective-stat">
          <div className="corrective-icon green">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Completed</span>
            <strong>
              {actions.filter(
                (item) => item.status === "Completed"
              ).length}
            </strong>
          </div>
        </div>

        <div className="corrective-stat">
          <div className="corrective-icon orange">
            <Clock3 size={20} />
          </div>

          <div>
            <span>In Progress</span>
            <strong>
              {actions.filter(
                (item) => item.status === "In Progress"
              ).length}
            </strong>
          </div>
        </div>

        <div className="corrective-stat">
          <div className="corrective-icon red">
            <AlertTriangle size={20} />
          </div>

          <div>
            <span>Overdue</span>
            <strong>
              {actions.filter(
                (item) => item.status === "Overdue"
              ).length}
            </strong>
          </div>
        </div>

      </div>

      {/* ACTION PANEL */}
      <div className="corrective-panel">

        <div className="corrective-panel-header">

          <div>
            <h3>Action Tracking</h3>
            <p>Monitor assigned corrective actions</p>
          </div>

          <div className="corrective-search">
            <Search size={17} />

            <input
              type="text"
              placeholder="Search actions, mines..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>

        </div>

        {/* TABLE */}
        <div className="corrective-table">

          <div className="corrective-table-head">
            <span>ID</span>
            <span>Mine</span>
            <span>Corrective Action</span>
            <span>Priority</span>
            <span>Owner</span>
            <span>Due Date</span>
            <span>Status</span>
            <span>View</span>
          </div>

          {filteredActions.map((item) => (

            <div
              className="corrective-table-row"
              key={item.id}
            >

              <strong>{item.id}</strong>

              <span>{item.mine}</span>

              <span>{item.action}</span>

              <span
                className={`action-priority ${item.priority.toLowerCase()}`}
              >
                {item.priority}
              </span>

              <span>{item.owner}</span>

              <span>{item.due}</span>

              <span
                className={`action-status ${item.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {item.status}
              </span>

              <button
                className="corrective-view-btn"
                title="View corrective action"
                onClick={() => {
                  setSelectedAction(item);
                  setMessage("");
                }}
              >
                <Eye size={15} />
              </button>

            </div>

          ))}

          {filteredActions.length === 0 && (
            <div className="corrective-empty">
              No corrective actions found.
            </div>
          )}

        </div>

      </div>

      {/* DETAILS MODAL */}
      {selectedAction && !showAssign && (

        <div
          className="corrective-modal-overlay"
          onClick={() => setSelectedAction(null)}
        >

          <div
            className="corrective-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="corrective-modal-header">

              <div>
                <span>CORRECTIVE ACTION</span>

                <h2>{selectedAction.action}</h2>

                <p>
                  {selectedAction.id} • {selectedAction.mine}
                </p>
              </div>

              <button
                className="corrective-close"
                onClick={() => setSelectedAction(null)}
              >
                <X size={19} />
              </button>

            </div>

            <div className="corrective-details-grid">

              <div>
                <span>MINE</span>
                <strong>{selectedAction.mine}</strong>
              </div>

              <div>
                <span>CATEGORY</span>
                <strong>{selectedAction.category}</strong>
              </div>

              <div>
                <span>PRIORITY</span>
                <strong>{selectedAction.priority}</strong>
              </div>

              <div>
                <span>ASSIGNED TO</span>
                <strong>{selectedAction.owner}</strong>
              </div>

              <div>
                <span>DUE DATE</span>
                <strong>{selectedAction.due}</strong>
              </div>

              <div>
                <span>STATUS</span>
                <strong>{selectedAction.status}</strong>
              </div>

            </div>

            <div className="action-progress-box">

              <div>
                <strong>Action Progress</strong>

                <strong>
                  {selectedAction.progress}%
                </strong>
              </div>

              <div className="action-progress-track">
                <div
                  style={{
                    width: `${selectedAction.progress}%`,
                  }}
                />
              </div>

            </div>

            <div className="corrective-modal-footer">

              <button
                className="corrective-secondary-btn"
                onClick={() => setSelectedAction(null)}
              >
                Close
              </button>

              <button
                className="corrective-primary-btn"
                onClick={openAssignModal}
              >
                <UserCheck size={15} />
                Assign Corrective Action
              </button>

            </div>

          </div>

        </div>

      )}

      {/* ASSIGN / UPDATE MODAL */}
      {selectedAction && showAssign && (

        <div className="corrective-modal-overlay">

          <div
            className="corrective-modal assign-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="corrective-modal-header">

              <div>
                <span>ACTION MANAGEMENT</span>

                <h2>Assign Corrective Action</h2>

                <p>
                  {selectedAction.id} • {selectedAction.mine}
                </p>
              </div>

              <button
                className="corrective-close"
                onClick={() => setShowAssign(false)}
              >
                <X size={19} />
              </button>

            </div>

            <div className="assign-action-info">
              <strong>{selectedAction.action}</strong>

              <span>
                Priority: {selectedAction.priority}
              </span>
            </div>

            <div className="corrective-form">

              <label>
                <span>
                  <UserCheck size={14} />
                  Responsible Officer
                </span>

                <select
                  value={formData.owner}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      owner: e.target.value,
                    })
                  }
                >
                  <option value="">
                    Select officer
                  </option>

                  <option>
                    Safety Officer
                  </option>

                  <option>
                    Compliance Officer
                  </option>

                  <option>
                    Site Manager
                  </option>

                  <option>
                    Operations Manager
                  </option>

                  <option>
                    Environmental Officer
                  </option>
                </select>
              </label>

              <label>
                <span>
                  <CalendarDays size={14} />
                  Due Date
                </span>

                <input
                  type="date"
                  value={
                    formData.due.includes("2026")
                      ? convertDate(formData.due)
                      : formData.due
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      due: formatDate(e.target.value),
                    })
                  }
                />
              </label>

              <label>
                <span>Status</span>

                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value,
                    })
                  }
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>Overdue</option>
                </select>
              </label>

              <label>
                <span>Progress: {formData.progress}%</span>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      progress: e.target.value,
                    })
                  }
                />
              </label>

            </div>

            <div className="corrective-modal-footer">

              <button
                className="corrective-secondary-btn"
                onClick={() => setShowAssign(false)}
              >
                Cancel
              </button>

              <button
                className="corrective-primary-btn"
                onClick={saveAssignment}
              >
                <Save size={15} />
                Save Action
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

/* Convert "20 Sep 2026" -> "2026-09-20" */
function convertDate(dateString) {
  const parts = dateString.split(" ");

  if (parts.length !== 3) {
    return "";
  }

  const months = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  return `${parts[2]}-${months[parts[1]]}-${parts[0].padStart(2, "0")}`;
}

/* Convert "2026-09-20" -> "20 Sep 2026" */
function formatDate(dateString) {
  if (!dateString) return "";

  const [year, month, day] = dateString.split("-");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${Number(day)} ${months[Number(month) - 1]} ${year}`;
}

export default CorrectiveActions;