import { mockDeadlines } from "@/lib/mockData";

export default function DashboardPage() {
  const totalCompanies = mockDeadlines.length;
  const openCount = mockDeadlines.filter((d) => d.status === "Open").length;
  const closingSoonCount = mockDeadlines.filter((d) => d.status === "Closing Soon").length;

  return (
    <main className="flex-1 px-8 py-6">
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Companies</p>
          <p className="text-2xl font-bold">{totalCompanies}</p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">Open Applications</p>
          <p className="text-2xl font-bold">{openCount}</p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">Closing Soon</p>
          <p className="text-2xl font-bold">{closingSoonCount}</p>
        </div>
      </div>

      {/* Deadlines List */}
      <h2 className="text-lg font-semibold mb-3">Upcoming Deadlines</h2>
      <div className="flex flex-col gap-3">
        {mockDeadlines.map((d) => (
          <div
            key={d.id}
            className="border rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <p className="font-medium">{d.company} — {d.role}</p>
              <p className="text-sm text-gray-500">Deadline: {d.deadline}</p>
            </div>
            <span
              className={`text-sm px-3 py-1 rounded-full ${
                d.status === "Open"
                  ? "bg-green-100 text-green-700"
                  : d.status === "Closing Soon"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {d.status}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}