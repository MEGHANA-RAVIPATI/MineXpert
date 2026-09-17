import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Filter,
  RotateCcw,
  Eye,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  TrendingUp,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

function Violations() {
    const navigate = useNavigate();
  // =====================================================
  // STATE
  // =====================================================

  const [searchTerm, setSearchTerm] = useState("");
  const [mineFilter, setMineFilter] = useState("All Mines");
  const [severityFilter, setSeverityFilter] = useState("All Severity");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // Selected violation for modal
  const [selectedViolation, setSelectedViolation] = useState(null);

  // =====================================================
  // VIOLATION DATA
  // =====================================================

  const violations = [
    {
      mine: "Mine Alpha",
      violation: "Safety Equipment Violation",
      category: "Safety",
      severity: "Critical",
      reported: "2 hours ago",
      status: "Open",
    },
    {
      mine: "Mine Beta",
      violation: "Environmental Compliance",
      category: "Environment",
      severity: "High",
      reported: "5 hours ago",
      status: "Under Review",
    },
    {
      mine: "Mine Gamma",
      violation: "Worker Documentation",
      category: "Documentation",
      severity: "Medium",
      reported: "Yesterday",
      status: "Open",
    },
    {
      mine: "Mine Delta",
      violation: "Equipment Inspection",
      category: "Operations",
      severity: "High",
      reported: "Yesterday",
      status: "In Progress",
    },
    {
      mine: "Mine Alpha",
      violation: "Emergency Procedure",
      category: "Safety",
      severity: "Medium",
      reported: "2 days ago",
      status: "Resolved",
    },
  ];

  // =====================================================
  // TREND DATA
  // =====================================================

  const trendData = [
    { month: "Apr", violations: 31 },
    { month: "May", violations: 27 },
    { month: "Jun", violations: 35 },
    { month: "Jul", violations: 29 },
    { month: "Aug", violations: 25 },
    { month: "Sep", violations: 24 },
  ];

  // =====================================================
  // CATEGORY DATA
  // =====================================================

  const categoryData = [
    {
      category: "Safety",
      count: 38,
    },
    {
      category: "Environment",
      count: 24,
    },
    {
      category: "Documentation",
      count: 17,
    },
    {
      category: "Operations",
      count: 12,
    },
  ];

  // =====================================================
  // FILTERING
  // =====================================================

  const filteredViolations = violations.filter((item) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      item.mine.toLowerCase().includes(search) ||
      item.violation.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search);

    const matchesMine =
      mineFilter === "All Mines" ||
      item.mine === mineFilter;

    const matchesSeverity =
      severityFilter === "All Severity" ||
      item.severity === severityFilter;

    const matchesStatus =
      statusFilter === "All Status" ||
      item.status === statusFilter;

    return (
      matchesSearch &&
      matchesMine &&
      matchesSeverity &&
      matchesStatus
    );
  });

  // =====================================================
  // RESET FILTERS
  // =====================================================

  const resetFilters = () => {
    setSearchTerm("");
    setMineFilter("All Mines");
    setSeverityFilter("All Severity");
    setStatusFilter("All Status");
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="violations-page">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="violations-page-header">

        <div>
          <span className="page-kicker">
            GOVERNANCE MONITORING
          </span>

          <h1>Violations & Incidents</h1>

          <p>
            Monitor reported violations, incidents and
            compliance issues across mining operations.
          </p>
        </div>

        <div className="header-status">

          <span className="live-dot"></span>

          <span>Live Monitoring</span>

        </div>

      </div>


      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <div className="violation-summary-grid">

        <div className="violation-summary-card">

          <div className="summary-icon summary-icon-blue">
            <AlertTriangle size={20} />
          </div>

          <div>
            <span>Total Active</span>
            <strong>24</strong>
            <small>Current violations</small>
          </div>

        </div>


        <div className="violation-summary-card">

          <div className="summary-icon summary-icon-red">
            <ShieldAlert size={20} />
          </div>

          <div>
            <span>Critical</span>
            <strong>04</strong>
            <small>Immediate attention</small>
          </div>

        </div>


        <div className="violation-summary-card">

          <div className="summary-icon summary-icon-orange">
            <Clock3 size={20} />
          </div>

          <div>
            <span>High Severity</span>
            <strong>08</strong>
            <small>Requires review</small>
          </div>

        </div>


        <div className="violation-summary-card">

          <div className="summary-icon summary-icon-green">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Resolved</span>
            <strong>36</strong>
            <small>Successfully closed</small>
          </div>

        </div>

      </div>


      {/* =================================================
          FILTER PANEL
      ================================================= */}

      <div className="violation-filter-panel">

        <div className="filter-title">

          <Filter size={17} />

          <span>Filter Violations</span>

        </div>


        <div className="violation-search">

          <Search size={17} />

          <input
            type="text"
            placeholder="Search violations or mines..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

        </div>


        <select
          className="filter-select"
          value={mineFilter}
          onChange={(e) =>
            setMineFilter(e.target.value)
          }
        >
          <option>All Mines</option>
          <option>Mine Alpha</option>
          <option>Mine Beta</option>
          <option>Mine Gamma</option>
          <option>Mine Delta</option>
        </select>


        <select
          className="filter-select"
          value={severityFilter}
          onChange={(e) =>
            setSeverityFilter(e.target.value)
          }
        >
          <option>All Severity</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>


        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option>All Status</option>
          <option>Open</option>
          <option>Under Review</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>


        <button
          className="reset-filter-btn"
          onClick={resetFilters}
          title="Reset filters"
        >
          <RotateCcw size={15} />
        </button>

      </div>


      {/* =================================================
          FILTER RESULT
      ================================================= */}

      <div className="filter-result">

        <span>
          Showing{" "}
          <strong>
            {filteredViolations.length}
          </strong>{" "}
          of{" "}
          <strong>
            {violations.length}
          </strong>{" "}
          violations
        </span>

      </div>


      {/* =================================================
          CHARTS
      ================================================= */}

      <div className="violation-chart-grid">


        {/* TREND CHART */}

        <div className="violation-panel">

          <div className="violation-panel-header">

            <div>

              <span className="panel-kicker">
                TREND ANALYSIS
              </span>

              <h3>Violation Trend</h3>

              <p>
                Reported violations over the last six months
              </p>

            </div>

            <div className="trend-indicator">
              <TrendingUp size={15} />
              <span>Monitoring</span>
            </div>

          </div>


          <div className="violation-chart">

            <ResponsiveContainer
              width="100%"
              height={280}
            >

              <LineChart data={trendData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e9ed"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#7a8793",
                    fontSize: 11,
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#7a8793",
                    fontSize: 11,
                  }}
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="violations"
                  stroke="#2b6f9f"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* CATEGORY CHART */}

        <div className="violation-panel">

          <div className="violation-panel-header">

            <div>

              <span className="panel-kicker">
                CATEGORY BREAKDOWN
              </span>

              <h3>Violations by Category</h3>

              <p>
                Distribution of reported compliance issues
              </p>

            </div>

          </div>


          <div className="violation-chart">

            <ResponsiveContainer
              width="100%"
              height={280}
            >

              <BarChart data={categoryData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e9ed"
                />

                <XAxis
                  dataKey="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#7a8793",
                    fontSize: 10,
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#7a8793",
                    fontSize: 11,
                  }}
                />

                <Tooltip />

                <Bar
                  dataKey="count"
                  fill="#3d7da8"
                  radius={[5, 5, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>


      {/* =================================================
          RECENT VIOLATIONS
      ================================================= */}

      <div className="recent-violations-panel">

        <div className="recent-panel-header">

          <div>

            <span className="panel-kicker">
              INCIDENT REGISTER
            </span>

            <h3>Recent Violations</h3>

            <p>
              Latest compliance incidents reported across
              registered mines.
            </p>

          </div>

          <div className="record-count">

            {filteredViolations.length} Records

          </div>

        </div>


        <div className="violations-table">

          {/* TABLE HEADER */}

          <div className="violations-table-header">

            <span>Mine</span>

            <span>Violation</span>

            <span>Category</span>

            <span>Severity</span>

            <span>Reported</span>

            <span>Status</span>

            <span>Action</span>

          </div>


          {/* TABLE ROWS */}

          {filteredViolations.length > 0 ? (

            filteredViolations.map((item, index) => (

              <div
                className="violations-table-row"
                key={`${item.mine}-${item.violation}-${index}`}
              >

                <strong>
                  {item.mine}
                </strong>


                <span className="violation-name">
                  {item.violation}
                </span>


                <span className="category-text">
                  {item.category}
                </span>


                <span
                  className={`severity-badge ${item.severity.toLowerCase()}`}
                >
                  {item.severity}
                </span>


                <span className="reported-time">
                  {item.reported}
                </span>


                <span
                  className={`incident-status ${item.status
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {item.status}
                </span>


                {/* VIEW BUTTON */}

                <button
                  className="view-violation-btn"
                  title="View violation"
                  onClick={() =>
                    setSelectedViolation(item)
                  }
                >
                  <Eye size={15} />
                </button>

              </div>

            ))

          ) : (

            <div className="no-violations">

              <AlertTriangle size={28} />

              <strong>
                No violations found
              </strong>

              <span>
                Try changing your search or filter settings.
              </span>

            </div>

          )}

        </div>

      </div>


      {/* =====================================================
          VIOLATION DETAILS MODAL
      ===================================================== */}

      {selectedViolation && (

        <div
          className="violation-modal-overlay"
          onClick={() =>
            setSelectedViolation(null)
          }
        >

          <div
            className="violation-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* MODAL HEADER */}

            <div className="violation-modal-header">

              <div>

                <span className="modal-kicker">
                  INCIDENT DETAILS
                </span>

                <h2>
                  {selectedViolation.violation}
                </h2>

                <p>
                  {selectedViolation.mine}
                </p>

              </div>


              <button
                className="modal-close-btn"
                onClick={() =>
                  setSelectedViolation(null)
                }
                aria-label="Close modal"
              >
                ×
              </button>

            </div>


            {/* STATUS */}

            <div className="modal-status-row">

              <span
                className={`severity-badge ${selectedViolation.severity.toLowerCase()}`}
              >
                {selectedViolation.severity} Severity
              </span>


              <span
                className={`incident-status ${selectedViolation.status
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                {selectedViolation.status}
              </span>

            </div>


            {/* DETAILS GRID */}

            <div className="violation-details-grid">

              <div className="detail-item">

                <span>Mine</span>

                <strong>
                  {selectedViolation.mine}
                </strong>

              </div>


              <div className="detail-item">

                <span>Category</span>

                <strong>
                  {selectedViolation.category}
                </strong>

              </div>


              <div className="detail-item">

                <span>Severity</span>

                <strong>
                  {selectedViolation.severity}
                </strong>

              </div>


              <div className="detail-item">

                <span>Reported</span>

                <strong>
                  {selectedViolation.reported}
                </strong>

              </div>

            </div>


            {/* DESCRIPTION */}

            <div className="violation-description">

              <h3>
                Description
              </h3>

              <p>

                A compliance issue has been reported at{" "}

                <strong>
                  {selectedViolation.mine}
                </strong>{" "}

                under the{" "}

                <strong>
                  {selectedViolation.category}
                </strong>{" "}

                category. The incident requires review
                and appropriate corrective action according
                to the applicable mining governance
                procedures.

              </p>

            </div>


            {/* CORRECTIVE ACTION */}

            <div className="corrective-action-box">

              <div className="corrective-action-title">

                <ShieldAlert size={17} />

                <strong>
                  Recommended Corrective Action
                </strong>

              </div>


              <p>

                Review the reported incident, verify the
                site conditions, assign the responsible
                officer, and record the corrective action
                taken.

              </p>

            </div>


            {/* FOOTER */}

            <div className="violation-modal-footer">

              <button
                className="modal-secondary-btn"
                onClick={() =>
                  setSelectedViolation(null)
                }
              >
                Close
              </button>


              <button
                className="modal-primary-btn"
                onClick={() => {
                   setSelectedViolation(null);
    navigate("/corrective-actions");
                }}
              >
                Assign Corrective Action
              </button>

            </div>


          </div>

        </div>

      )}

    </div>
  );
}

export default Violations;