import {
  ClipboardCheck,
  AlertTriangle,
  MapPin,
  Clock,
  FileCheck,
  ShieldCheck,
} from "lucide-react";

const inspections = [
  {
    id: "INS-001",
    mine: "Singrauli Coal Mine",
    date: "16 Sep 2026",
    status: "Completed",
    risk: "Low",
  },
  {
    id: "INS-002",
    mine: "Talcher Coal Mine",
    date: "15 Sep 2026",
    status: "Pending",
    risk: "Medium",
  },
  {
    id: "INS-003",
    mine: "Korba Coal Mine",
    date: "14 Sep 2026",
    status: "Completed",
    risk: "High",
  },
];

function StatCard({ icon: Icon, title, value, description }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-gray-900">{value}</h3>
          <p className="mt-1 text-xs text-gray-500">{description}</p>
        </div>

        <div className="rounded-lg bg-gray-100 p-3">
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}

export default function InspectorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            MineXpert • Field Inspection
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            Inspector Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Monitor coal-mine inspections, compliance findings and field risks.
          </p>
        </div>

        <button className="rounded-lg bg-gray-900 px-5 py-3 font-medium text-white shadow-sm hover:bg-gray-800">
          + Start New Inspection
        </button>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={ClipboardCheck}
          title="Total Inspections"
          value="24"
          description="All recorded inspections"
        />

        <StatCard
          icon={FileCheck}
          title="Completed"
          value="18"
          description="Successfully submitted"
        />

        <StatCard
          icon={Clock}
          title="Pending"
          value="4"
          description="Awaiting completion"
        />

        <StatCard
          icon={AlertTriangle}
          title="High Risk"
          value="2"
          description="Requires attention"
        />
      </div>

      {/* Main content */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Recent inspections */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Inspections
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Latest field inspection records
              </p>
            </div>

            <button className="text-sm font-medium text-gray-700 hover:underline">
              View History
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 text-sm text-gray-500">
                  <th className="px-3 py-3">Inspection ID</th>
                  <th className="px-3 py-3">Mine</th>
                  <th className="px-3 py-3">Date</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Risk</th>
                </tr>
              </thead>

              <tbody>
                {inspections.map((inspection) => (
                  <tr
                    key={inspection.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-3 py-4 font-medium text-gray-900">
                      {inspection.id}
                    </td>

                    <td className="px-3 py-4 text-gray-700">
                      {inspection.mine}
                    </td>

                    <td className="px-3 py-4 text-gray-600">
                      {inspection.date}
                    </td>

                    <td className="px-3 py-4">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                        {inspection.status}
                      </span>
                    </td>

                    <td className="px-3 py-4">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                        {inspection.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick actions */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Frequently used inspector tools
          </p>

          <div className="mt-5 space-y-3">
            <button className="flex w-full items-center gap-3 rounded-lg border border-gray-200 p-4 text-left hover:bg-gray-50">
              <ClipboardCheck size={21} />
              <div>
                <p className="font-medium">New Inspection</p>
                <p className="text-xs text-gray-500">
                  Create a field inspection
                </p>
              </div>
            </button>

            <button className="flex w-full items-center gap-3 rounded-lg border border-gray-200 p-4 text-left hover:bg-gray-50">
              <MapPin size={21} />
              <div>
                <p className="font-medium">Capture Location</p>
                <p className="text-xs text-gray-500">
                  Record current GPS coordinates
                </p>
              </div>
            </button>

            <button className="flex w-full items-center gap-3 rounded-lg border border-gray-200 p-4 text-left hover:bg-gray-50">
              <ShieldCheck size={21} />
              <div>
                <p className="font-medium">Risk Overview</p>
                <p className="text-xs text-gray-500">
                  View mine risk information
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-gray-100 p-3">
            <AlertTriangle size={24} />
          </div>

          <div>
            <h2 className="font-semibold text-gray-900">
              Compliance Alerts
            </h2>

            <p className="mt-1 text-sm text-gray-600">
              2 inspections have high-risk findings that require review.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}