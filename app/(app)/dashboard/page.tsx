"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch, getToken } from "@/lib/api";
import type { Company } from "@/lib/types";

type DeadlineStatus = "Open" | "Closing Soon" | "Closed";

function getStatus(deadline: string): DeadlineStatus {
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysLeft = (new Date(deadline).getTime() - Date.now()) / msPerDay;

  if (daysLeft < 0) return "Closed";
  if (daysLeft <= 7) return "Closing Soon";
  return "Open";
}

export default function DashboardPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [applicationCount, setApplicationCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!getToken()) {
      router.push("/login");
      return;
    }

    async function loadDashboard() {
      try {
        const [companiesData, applicationsData] = await Promise.all([
          apiFetch<Company[]>("/companies"),
          apiFetch<unknown[]>("/applications"),
        ]);
        setCompanies(companiesData);
        setApplicationCount(applicationsData.length);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [router]);

  if (loading) {
    return <main className="flex-1 px-8 py-6">Loading dashboard...</main>;
  }

  if (error) {
    return <main className="flex-1 px-8 py-6 text-red-500">{error}</main>;
  }

  const openCount = companies.filter((c) => getStatus(c.deadline) === "Open").length;
  const closingSoonCount = companies.filter(
    (c) => getStatus(c.deadline) === "Closing Soon"
  ).length;

  const sortedCompanies = [...companies].sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  );

  return (
    <main className="flex-1 px-8 py-6">
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4">
        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Companies</p>
          <p className="text-2xl font-bold">{companies.length}</p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">Open</p>
          <p className="text-2xl font-bold">{openCount}</p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">Closing Soon</p>
          <p className="text-2xl font-bold">{closingSoonCount}</p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">My Applications</p>
          <p className="text-2xl font-bold">{applicationCount}</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-3">Upcoming Deadlines</h2>

      {sortedCompanies.length === 0 ? (
        <p className="text-gray-500">No companies have been added yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {sortedCompanies.map((c) => {
            const status = getStatus(c.deadline);
            return (
              <Link
                key={c.id}
                href={`/companies/${c.id}`}
                className="border rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div>
                  <p className="font-medium">
                    {c.name} — {c.role}
                  </p>
                  <p className="text-sm text-gray-500">Deadline: {c.deadline}</p>
                </div>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    status === "Open"
                      ? "bg-green-100 text-green-700"
                      : status === "Closing Soon"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {status}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}