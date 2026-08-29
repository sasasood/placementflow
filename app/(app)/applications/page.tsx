import { mockApplications } from "@/lib/mockData";

export default function ApplicationsPage() {
  return (
    <main className="flex-1 px-8 py-6">
      <h1 className="text-2xl font-bold mb-6">My Applications</h1>

      <div className="flex flex-col gap-4">
        {mockApplications.map((app) => (
          <div
            key={app.id}
            className="border rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <p className="font-semibold">{app.companyName} — {app.role}</p>
              <p className="text-sm text-gray-500">Applied on: {app.appliedOn}</p>
            </div>
            <span
              className={`text-sm px-3 py-1 rounded-full ${
                app.status === "Applied"
                  ? "bg-blue-100 text-blue-700"
                  : app.status === "Shortlisted"
                  ? "bg-yellow-100 text-yellow-700"
                  : app.status === "Selected"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {app.status}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}