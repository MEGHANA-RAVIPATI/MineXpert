import {
  ShieldCheck,
  AlertTriangle,
  Activity,
  ClipboardCheck,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

/* =========================
   CHART DATA
========================= */

const complianceData = [
  { month: "Apr", compliance: 78 },
  { month: "May", compliance: 81 },
  { month: "Jun", compliance: 79 },
  { month: "Jul", compliance: 84 },
  { month: "Aug", compliance: 86 },
  { month: "Sep", compliance: 87.6 },
];

const riskData = [
  { name: "Low Risk", value: 42 },
  { name: "Medium Risk", value: 28 },
  { name: "High Risk", value: 8 },
  { name: "Critical", value: 2 },
];

const riskColors = [
  "#22a06b",
  "#e5a11a",
  "#e86a2e",
  "#d64545",
];

/* =========================
   DASHBOARD DATA
========================= */

const violations = [
  {
    title: "Safety Equipment Violation",
    mine: "Mine A",
    time: "2 hours ago",
    level: "Critical",
    className: "critical",
  },
  {
    title: "Environmental Compliance",
    mine: "Mine B",
    time: "5 hours ago",
    level: "High",
    className: "high",
  },
  {
    title: "Worker Documentation",
    mine: "Mine C",
    time: "Yesterday",
    level: "Medium",
    className: "medium",
  },
];

/* =========================
   DASHBOARD COMPONENT
========================= */

function Dashboard() {
  return (
    <div className="dashboard-page">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="dashboard-heading">
        <div>
          <h1>Overview</h1>

          <p>
            Here's the current status of your mining governance operations.
          </p>
        </div>

        <button className="date-filter">
          Last 30 Days
        </button>
      </div>

      {/* =========================
          KPI CARDS
      ========================= */}

      <div className="stats-grid">

        {/* Overall Compliance */}

        <div className="stat-card">
          <div className="stat-card-top">

            <div className="stat-icon compliance-icon">
              <ShieldCheck size={22} />
            </div>

            <div className="stat-change positive">
              <TrendingUp size={14} />
              4.2%
            </div>

          </div>

          <div className="stat-label">
            Overall Compliance
          </div>

          <div className="stat-value">
            87.6%
          </div>

          <div className="stat-description">
            Compared with last month
          </div>
        </div>


        {/* Active Violations */}

        <div className="stat-card">
          <div className="stat-card-top">

            <div className="stat-icon violation-icon">
              <AlertTriangle size={22} />
            </div>

            <div className="stat-change negative">
              <TrendingUp size={14} />
              8.4%
            </div>

          </div>

          <div className="stat-label">
            Active Violations
          </div>

          <div className="stat-value">
            24
          </div>

          <div className="stat-description">
            6 require immediate attention
          </div>
        </div>


        {/* High Risk */}

        <div className="stat-card">
          <div className="stat-card-top">

            <div className="stat-icon risk-icon">
              <Activity size={22} />
            </div>

            <div className="stat-change negative">
              <TrendingDown size={14} />
              2.1%
            </div>

          </div>

          <div className="stat-label">
            High-Risk Issues
          </div>

          <div className="stat-value">
            08
          </div>

          <div className="stat-description">
            2 critical risk issues
          </div>
        </div>


        {/* Corrective Actions */}

        <div className="stat-card">
          <div className="stat-card-top">

            <div className="stat-icon action-icon">
              <ClipboardCheck size={22} />
            </div>

            <div className="stat-change positive">
              <TrendingDown size={14} />
              5.7%
            </div>

          </div>

          <div className="stat-label">
            Open Corrective Actions
          </div>

          <div className="stat-value">
            17
          </div>

          <div className="stat-description">
            9 actions due this week
          </div>
        </div>

      </div>


      {/* =========================
          CHARTS ROW
      ========================= */}

      <div className="dashboard-charts-grid">

        {/* =========================
            COMPLIANCE CHART
        ========================= */}

        <div className="dashboard-panel compliance-panel">

          <div className="panel-header">

            <div>
              <h3>
                Compliance Overview
              </h3>

              <p>
                Monthly compliance performance
              </p>
            </div>

          </div>

          <div className="chart-container">

            <ResponsiveContainer
              width="100%"
              height={280}
            >

              <LineChart
                data={complianceData}
                margin={{
                  top: 10,
                  right: 20,
                  left: 0,
                  bottom: 5,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  tick={{
                    fontSize: 11,
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  domain={[70, 95]}
                  ticks={[70, 78, 86, 94]}
                  tick={{
                    fontSize: 11,
                  }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) =>
                    `${value}%`
                  }
                />

                <Tooltip
                  formatter={(value) => [
                    `${value}%`,
                    "Compliance",
                  ]}
                />

                <Line
                  type="monotone"
                  dataKey="compliance"
                  stroke="#1f6feb"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: "#ffffff",
                    stroke: "#1f6feb",
                    strokeWidth: 3,
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* =========================
            RISK DISTRIBUTION
        ========================= */}

        <div className="dashboard-panel risk-panel">

          <div className="panel-header">

            <div>
              <h3>
                Risk Distribution
              </h3>

              <p>
                Current risk classification
              </p>
            </div>

          </div>


          <div className="risk-chart-wrapper">

            <ResponsiveContainer
              width="100%"
              height={250}
            >

              <PieChart>

                <Pie
                  data={riskData}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={82}
                  paddingAngle={3}
                  dataKey="value"
                >

                  {riskData.map(
                    (entry, index) => (
                      <Cell
                        key={`risk-${index}`}
                        fill={
                          riskColors[index]
                        }
                      />
                    )
                  )}

                </Pie>

                <Tooltip
                  formatter={(value, name) => [
                    value,
                    name,
                  ]}
                />

                <Legend
                  verticalAlign="bottom"
                  height={40}
                  iconType="circle"
                />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>


      {/* =========================
          RECENT VIOLATIONS
      ========================= */}

      <div className="dashboard-panel violations-panel">

        <div className="panel-header">

          <div>
            <h3>
              Recent Violations
            </h3>

            <p>
              Latest compliance issues reported across mines
            </p>
          </div>

          <button className="view-all-btn">
            View All
          </button>

        </div>


        <div className="violations-list">

          {violations.map(
            (violation, index) => (

              <div
                className="violation-item"
                key={index}
              >

                <div className="violation-info">

                  <strong>
                    {violation.title}
                  </strong>

                  <span>
                    {violation.mine} •{" "}
                    {violation.time}
                  </span>

                </div>


                <span
                  className={`violation-badge ${violation.className}`}
                >
                  {violation.level}
                </span>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;