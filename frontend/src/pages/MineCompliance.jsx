function MineCompliance() {
  const mines = [
    {
      name: "Mine Alpha",
      location: "Telangana",
      compliance: 94,
      status: "Compliant",
    },
    {
      name: "Mine Beta",
      location: "Odisha",
      compliance: 88,
      status: "Compliant",
    },
    {
      name: "Mine Gamma",
      location: "Jharkhand",
      compliance: 76,
      status: "Needs Attention",
    },
    {
      name: "Mine Delta",
      location: "Chhattisgarh",
      compliance: 68,
      status: "At Risk",
    },
  ];

  return (
    <div className="mine-compliance-page">

      <div className="page-heading">
        <div>
          <h1>Mine-wise Compliance</h1>
          <p>
            Monitor compliance performance across registered mining sites.
          </p>
        </div>

        <button className="date-filter">
          Last 30 Days
        </button>
      </div>

      <div className="mine-summary-grid">

        <div className="summary-card">
          <span>Total Mines</span>
          <strong>24</strong>
        </div>

        <div className="summary-card">
          <span>Compliant Mines</span>
          <strong>16</strong>
        </div>

        <div className="summary-card">
          <span>Needs Attention</span>
          <strong>06</strong>
        </div>

        <div className="summary-card">
          <span>At Risk</span>
          <strong>02</strong>
        </div>

      </div>

      <div className="dashboard-panel">

        <div className="panel-header">
          <div>
            <h3>Mine Compliance Performance</h3>
            <p>Current compliance score by mining site</p>
          </div>
        </div>

        <div className="mine-table">

          <div className="mine-table-header">
            <span>Mine</span>
            <span>Location</span>
            <span>Compliance</span>
            <span>Status</span>
          </div>

          {mines.map((mine) => (
            <div className="mine-table-row" key={mine.name}>

              <strong>{mine.name}</strong>

              <span>{mine.location}</span>

              <div className="compliance-score">
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${mine.compliance}%` }}
                  ></div>
                </div>

                <strong>{mine.compliance}%</strong>
              </div>

              <span
                className={`compliance-status ${
                  mine.status === "Compliant"
                    ? "status-compliant"
                    : mine.status === "Needs Attention"
                    ? "status-warning"
                    : "status-risk"
                }`}
              >
                {mine.status}
              </span>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default MineCompliance;