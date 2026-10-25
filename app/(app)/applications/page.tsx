"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, getToken } from "@/lib/api";
import type { ApplicationItem } from "@/lib/types";

export default function ApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!getToken()) {
      router.push("/login");
      return;
    }

    async function loadApplications() {
      try {
        const data = await apiFetch<ApplicationItem[]>("/applications");
        setApplications(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load applications");
      } finally {
        setLoading(false);
      }
    }

    loadApplications();
  }, [router]);

  if (loading) {
    return <main className="flex-1 px-8 py-6">Loading applications...</main>;
  }

  if (error) {
    return <main className="flex-1 px-8 py-6 text-red-500">{error}</main>;
  }

  return (
    <main className="flex-1 px-8 py-6">
      <h1 className="text-2xl font-bold mb-6">My Applications</h1>

      {applications.length === 0 ? (
        <p className="text-gray-500">You haven&apos;t applied to any companies yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="border rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <p className="font-semibold">
                  {app.company.name} — {app.company.role}
                </p>
                <p className="text-sm text-gray-500">
                  Applied on: {new Date(app.appliedOn).toLocaleDateString()}
                </p>
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
      )}
    </main>
  );
}