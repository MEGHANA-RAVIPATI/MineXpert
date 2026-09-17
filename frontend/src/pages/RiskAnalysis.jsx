import { useState } from "react";
import {
  AlertTriangle,
  Activity,
  ShieldAlert,
  CheckCircle2,
  Eye,
  X,
} from "lucide-react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

function RiskAnalysis() {
  const [selectedRisk, setSelectedRisk] = useState(null);

  const riskDistribution = [
    { name: "Low", value: 10 },
    { name: "Medium", value: 7 },
    { name: "High", value: 5 },
    { name: "Critical", value: 2 },
  ];

  const riskTrend = [
    { month: "Apr", low: 8, medium: 8, high: 6, critical: 3 },
    { month: "May", low: 9, medium: 7, high: 6, critical: 3 },
    { month: "Jun", low: 10, medium: 8, high: 5, critical: 2 },
    { month: "Jul", low: 11, medium: 7, high: 5, critical: 2 },
    { month: "Aug", low: 10, medium: 7, high: 5, critical: 2 },
    { month: "Sep", low: 10, medium: 7, high: 5, critical: 2 },
  ];

  const mineRisks = [
    {
      mine: "Mine Alpha",
      location: "Telangana",
      risk: "Low",
      compliance: 94,
      issues: 2,
      assessment: "2 days ago",
    },
    {
      mine: "Mine Beta",
      location: "Odisha",
      risk: "Medium",
      compliance: 88,
      issues: 5,
      assessment: "Yesterday",
    },
    {
      mine: "Mine Gamma",
      location: "Jharkhand",
      risk: "High",
      compliance: 76,
      issues: 9,
      assessment: "Today",
    },
    {
      mine: "Mine Delta",
      location: "Chhattisgarh",
      risk: "Critical",
      compliance: 68,
      issues: 14,
      assessment: "Today",
    },
  ];

  const getRiskClass = (risk) => {
    return risk.toLowerCase();
  };

  return (
    <div className="risk-page">

      {/* PAGE HEADER */}
      <div className="risk-page-header">
        <div>
          <span className="risk-kicker">
            OPERATIONAL RISK MONITORING
          </span>

          <h1>Risk Analysis</h1>

          <p>
            Monitor operational, safety and compliance risks across
            registered mining sites.
          </p>
        </div>

        <div className="risk-status">
          <Activity size={16} />
          Live Risk Monitoring
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="risk-stats">

        <div className="risk-stat-card">
          <div className="risk-stat-icon blue">
            <ShieldAlert size={20} />
          </div>

          <div>
            <span>Total Risks</span>
            <strong>24</strong>
          </div>
        </div>

        <div className="risk-stat-card">
          <div className="risk-stat-icon green">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Low Risk</span>
            <strong>10</strong>
          </div>
        </div>

        <div className="risk-stat-card">
          <div className="risk-stat-icon orange">
            <AlertTriangle size={20} />
          </div>

          <div>
            <span>High Risk</span>
            <strong>05</strong>
          </div>
        </div>

        <div className="risk-stat-card">
          <div className="risk-stat-icon red">
            <ShieldAlert size={20} />
          </div>

          <div>
            <span>Critical</span>
            <strong>02</strong>
          </div>
        </div>

      </div>

      {/* CHARTS */}
      <div className="risk-chart-grid">

        {/* DISTRIBUTION */}
        <div className="risk-panel">
          <div className="risk-panel-header">
            <div>
              <h3>Risk Distribution</h3>
              <p>Current risk classification across all mines</p>
            </div>
          </div>

          <div className="risk-pie-container">

            <ResponsiveContainer width="100%" height={260}>
              <PieChart>

                <Pie
                  data={riskDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={3}
                >
                  <Cell />
                  <Cell />
                  <Cell />
                  <Cell />
                </Pie>

                <Tooltip />

                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                />

              </PieChart>
            </ResponsiveContainer>

          </div>
        </div>

        {/* TREND */}
        <div className="risk-panel">

          <div className="risk-panel-header">
            <div>
              <h3>Risk Trend</h3>
              <p>Monthly risk classification trend</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={riskTrend}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey="low"
                name="Low"
                strokeWidth={2}
              />

              <Line
                type="monotone"
                dataKey="medium"
                name="Medium"
                strokeWidth={2}
              />

              <Line
                type="monotone"
                dataKey="high"
                name="High"
                strokeWidth={2}
              />

              <Line
                type="monotone"
                dataKey="critical"
                name="Critical"
                strokeWidth={2}
              />

            </LineChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* MINE RISK TABLE */}
      <div className="risk-table-panel">

        <div className="risk-table-header">

          <div>
            <h3>Mine-wise Risk Assessment</h3>

            <p>
              Current risk status and assessment information
            </p>
          </div>

        </div>

        <div className="risk-table-head">
          <span>Mine</span>
          <span>Location</span>
          <span>Risk Level</span>
          <span>Compliance</span>
          <span>Active Issues</span>
          <span>Last Assessment</span>
          <span>View</span>
        </div>

        {mineRisks.map((mine) => (

          <div
            className="risk-table-row"
            key={mine.mine}
          >

            <strong>
              {mine.mine}
            </strong>

            <span>
              {mine.location}
            </span>

            <span
              className={`risk-level ${getRiskClass(
                mine.risk
              )}`}
            >
              {mine.risk}
            </span>

            <div className="risk-compliance">

              <div className="risk-progress">
                <div
                  style={{
                    width: `${mine.compliance}%`,
                  }}
                />
              </div>

              <strong>
                {mine.compliance}%
              </strong>

            </div>

            <span
              className={
                mine.issues >= 10
                  ? "issue-count critical"
                  : mine.issues >= 5
                  ? "issue-count warning"
                  : "issue-count"
              }
            >
              {mine.issues}
            </span>

            <span>
              {mine.assessment}
            </span>

            <button
              className="risk-view-btn"
              title="View risk details"
              onClick={() =>
                setSelectedRisk(mine)
              }
            >
              <Eye size={15} />
            </button>

          </div>

        ))}

      </div>

      {/* RISK DETAILS MODAL */}
      {selectedRisk && (

        <div
          className="risk-modal-overlay"
          onClick={() =>
            setSelectedRisk(null)
          }
        >

          <div
            className="risk-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="risk-modal-header">

              <div>

                <span>
                  RISK ASSESSMENT DETAILS
                </span>

                <h2>
                  {selectedRisk.mine}
                </h2>

                <p>
                  {selectedRisk.location}
                </p>

              </div>

              <button
                className="risk-modal-close"
                onClick={() =>
                  setSelectedRisk(null)
                }
              >
                <X size={19} />
              </button>

            </div>

            <div className="risk-modal-grid">

              <div>
                <span>Risk Level</span>

                <strong
                  className={`risk-modal-level ${getRiskClass(
                    selectedRisk.risk
                  )}`}
                >
                  {selectedRisk.risk}
                </strong>
              </div>

              <div>
                <span>Compliance Score</span>

                <strong>
                  {selectedRisk.compliance}%
                </strong>
              </div>

              <div>
                <span>Active Issues</span>

                <strong>
                  {selectedRisk.issues}
                </strong>
              </div>

              <div>
                <span>Last Assessment</span>

                <strong>
                  {selectedRisk.assessment}
                </strong>
              </div>

            </div>

            <div className="risk-modal-note">

              <AlertTriangle size={17} />

              <div>
                <strong>Assessment Summary</strong>

                <p>
                  This mining site is currently classified as{" "}
                  <strong>{selectedRisk.risk}</strong> risk.
                  Governance teams should review active issues,
                  compliance performance and required mitigation
                  actions.
                </p>
              </div>

            </div>

            <div className="risk-modal-footer">

              <button
                onClick={() =>
                  setSelectedRisk(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default RiskAnalysis;