import { useState } from "react";
import {
  Search,
  RotateCcw,
  MapPin,
  Building2,
  Eye,
} from "lucide-react";

function Mines() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedMine, setSelectedMine] = useState(null);

  const mines = [
    {
      name: "Mine Alpha",
      location: "Telangana",
      type: "Open Cast",
      status: "Operational",
      compliance: 94,
      risk: "Low",
    },
    {
      name: "Mine Beta",
      location: "Odisha",
      type: "Open Cast",
      status: "Operational",
      compliance: 88,
      risk: "Medium",
    },
    {
      name: "Mine Gamma",
      location: "Jharkhand",
      type: "Underground",
      status: "Under Review",
      compliance: 76,
      risk: "High",
    },
    {
      name: "Mine Delta",
      location: "Chhattisgarh",
      type: "Open Cast",
      status: "Monitoring",
      compliance: 68,
      risk: "Critical",
    },
  ];

  const filteredMines = mines.filter((mine) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      mine.name.toLowerCase().includes(search) ||
      mine.location.toLowerCase().includes(search) ||
      mine.type.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All Status" ||
      mine.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("All Status");
  };

  return (
    <div className="mine-page">

      {/* HEADER */}

      <div className="mine-page-header">
        <div>
          <span className="page-kicker">
            MINING OPERATIONS
          </span>

          <h1>Registered Mines</h1>

          <p>
            Monitor registered mining sites, operational
            status and compliance performance.
          </p>
        </div>

        <button className="mine-add-btn">
          + Register Mine
        </button>
      </div>


      {/* SUMMARY */}

      <div className="mine-stats">

        <div className="mine-stat-card">
          <div className="mine-stat-icon blue">
            <Building2 size={20} />
          </div>

          <div>
            <span>Total Mines</span>
            <strong>24</strong>
          </div>
        </div>

        <div className="mine-stat-card">
          <div className="mine-stat-icon green">
            <Building2 size={20} />
          </div>

          <div>
            <span>Operational</span>
            <strong>19</strong>
          </div>
        </div>

        <div className="mine-stat-card">
          <div className="mine-stat-icon orange">
            <MapPin size={20} />
          </div>

          <div>
            <span>Under Review</span>
            <strong>03</strong>
          </div>
        </div>

        <div className="mine-stat-card">
          <div className="mine-stat-icon red">
            <Building2 size={20} />
          </div>

          <div>
            <span>Monitoring</span>
            <strong>02</strong>
          </div>
        </div>

      </div>


      {/* FILTER */}

      <div className="mine-filter">

        <div className="mine-filter-title">
          <Building2 size={17} />
          Mine Register
        </div>

        <div className="mine-search">

          <Search size={17} />

          <input
            type="text"
            placeholder="Search mines, locations..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

        </div>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option>All Status</option>
          <option>Operational</option>
          <option>Under Review</option>
          <option>Monitoring</option>
        </select>

        <button
          className="mine-reset"
          onClick={resetFilters}
          title="Reset filters"
        >
          <RotateCcw size={15} />
        </button>

      </div>


      <div className="mine-result">
        Showing{" "}
        <strong>{filteredMines.length}</strong>{" "}
        of{" "}
        <strong>{mines.length}</strong>{" "}
        registered mines
      </div>


      {/* TABLE */}

      <div className="mine-table-panel">

        <div className="mine-table-head">

          <span>Mine</span>
          <span>Location</span>
          <span>Type</span>
          <span>Status</span>
          <span>Compliance</span>
          <span>Risk</span>
          <span>View</span>

        </div>


        {filteredMines.map((mine) => (

          <div
            className="mine-table-item"
            key={mine.name}
          >

            <strong>{mine.name}</strong>

            <span className="mine-location">
              <MapPin size={13} />
              {mine.location}
            </span>

            <span>{mine.type}</span>

            <span
              className={`mine-status ${
                mine.status
                  .toLowerCase()
                  .replace(" ", "-")
              }`}
            >
              {mine.status}
            </span>

            <div className="mine-compliance">

              <div className="mine-progress">
                <div
                  style={{
                    width: `${mine.compliance}%`,
                  }}
                ></div>
              </div>

              <strong>
                {mine.compliance}%
              </strong>

            </div>

            <span
              className={`mine-risk ${mine.risk.toLowerCase()}`}
            >
              {mine.risk}
            </span>

            <button
              className="mine-view-btn"
              onClick={() =>
                setSelectedMine(mine)
              }
            >
              <Eye size={15} />
            </button>

          </div>

        ))}

      </div>


      {/* DETAILS MODAL */}

      {selectedMine && (

        <div
          className="mine-modal-overlay"
          onClick={() =>
            setSelectedMine(null)
          }
        >

          <div
            className="mine-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="mine-modal-header">

              <div>
                <span>MINING SITE DETAILS</span>

                <h2>{selectedMine.name}</h2>

                <p>
                  {selectedMine.location}
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedMine(null)
                }
              >
                ×
              </button>

            </div>


            <div className="mine-modal-grid">

              <div>
                <span>Location</span>
                <strong>
                  {selectedMine.location}
                </strong>
              </div>

              <div>
                <span>Mine Type</span>
                <strong>
                  {selectedMine.type}
                </strong>
              </div>

              <div>
                <span>Operational Status</span>
                <strong>
                  {selectedMine.status}
                </strong>
              </div>

              <div>
                <span>Compliance Score</span>
                <strong>
                  {selectedMine.compliance}%
                </strong>
              </div>

              <div>
                <span>Current Risk</span>
                <strong>
                  {selectedMine.risk}
                </strong>
              </div>

              <div>
                <span>Governance Status</span>
                <strong>Active Monitoring</strong>
              </div>

            </div>


            <div className="mine-modal-footer">

              <button
                onClick={() =>
                  setSelectedMine(null)
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

export default Mines;