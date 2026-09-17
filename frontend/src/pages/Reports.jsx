import { useState } from "react";
import {
  FileText,
  Download,
  ShieldCheck,
  AlertTriangle,
  Activity,
  ClipboardCheck,
  CheckCircle2,
} from "lucide-react";

function Reports() {
  const [downloaded, setDownloaded] = useState(null);

  const reports = [
    {
      title: "Monthly Governance Report",
      description: "Overall mining governance and compliance summary.",
      type: "Governance",
      date: "15 Sep 2026",
      icon: ShieldCheck,
    },
    {
      title: "Violation & Incident Report",
      description: "Summary of reported violations and incidents.",
      type: "Safety",
      date: "14 Sep 2026",
      icon: AlertTriangle,
    },
    {
      title: "Risk Assessment Report",
      description: "Mine-wise operational risk assessment.",
      type: "Risk",
      date: "12 Sep 2026",
      icon: Activity,
    },
    {
      title: "Corrective Action Report",
      description: "Status of assigned corrective actions.",
      type: "Compliance",
      date: "10 Sep 2026",
      icon: ClipboardCheck,
    },
  ];

  const downloadReport = (report) => {
    const content = `
MINEXPERT
${report.title}

Report Type: ${report.type}
Generated Date: ${report.date}

This report contains mining governance information
for the selected reporting period.

MineXpert Governance Dashboard
`;

    const blob = new Blob([content], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${report.title
      .replace(/\s+/g, "-")
      .toLowerCase()}.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setDownloaded(report.title);

    setTimeout(() => {
      setDownloaded(null);
    }, 2000);
  };

  return (
    <div className="reports-page">

      <div className="reports-header">
        <div>
          <span className="reports-kicker">
            GOVERNANCE REPORTING
          </span>

          <h1>Reports</h1>

          <p>
            Generate and monitor mining governance reports and operational summaries.
          </p>
        </div>

        <button className="generate-report-btn">
          <FileText size={16} />
          Generate Report
        </button>
      </div>

      <div className="reports-stats">

        <div className="report-stat">
          <FileText size={20} />
          <div>
            <span>Total Reports</span>
            <strong>28</strong>
          </div>
        </div>

        <div className="report-stat">
          <ShieldCheck size={20} />
          <div>
            <span>Governance</span>
            <strong>12</strong>
          </div>
        </div>

        <div className="report-stat">
          <AlertTriangle size={20} />
          <div>
            <span>Safety Reports</span>
            <strong>08</strong>
          </div>
        </div>

        <div className="report-stat">
          <Activity size={20} />
          <div>
            <span>Risk Reports</span>
            <strong>08</strong>
          </div>
        </div>

      </div>

      <div className="reports-panel">

        <div className="reports-panel-header">
          <div>
            <h3>Available Reports</h3>
            <p>
              Recent governance and operational reports
            </p>
          </div>
        </div>

        <div className="reports-list">

          {reports.map((report) => {
            const Icon = report.icon;

            return (
              <div
                className="report-item"
                key={report.title}
              >

                <div className="report-icon">
                  <Icon size={20} />
                </div>

                <div className="report-info">
                  <strong>{report.title}</strong>
                  <p>{report.description}</p>
                </div>

                <span className="report-type">
                  {report.type}
                </span>

                <span className="report-date">
                  {report.date}
                </span>

                <button
                  className={`report-download ${
                    downloaded === report.title
                      ? "downloaded"
                      : ""
                  }`}
                  title="Download report"
                  onClick={() => downloadReport(report)}
                >
                  {downloaded === report.title ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <Download size={16} />
                  )}
                </button>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}

export default Reports;