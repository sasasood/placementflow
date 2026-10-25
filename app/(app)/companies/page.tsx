"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import type { Company } from "@/lib/types";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCompanies() {
      try {
        const data = await apiFetch<Company[]>("/companies");
        setCompanies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load companies");
      } finally {
        setLoading(false);
      }
    }

    loadCompanies();
  }, []);

  if (loading) {
    return <main className="flex-1 px-8 py-6">Loading companies...</main>;
  }

  if (error) {
    return <main className="flex-1 px-8 py-6 text-red-500">{error}</main>;
  }

  return (
    <main className="flex-1 px-8 py-6">
      <h1 className="text-2xl font-bold mb-6">Companies Hiring</h1>

      {companies.length === 0 ? (
        <p className="text-gray-500">No companies have been added yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {companies.map((c) => (
            <Link
              key={c.id}
              href={`/companies/${c.id}`}
              className="border rounded-lg p-4 hover:bg-gray-50 transition"
            >
              <p className="font-semibold text-lg">{c.name} — {c.role}</p>
              <p className="text-sm text-gray-500">
                CTC: {c.ctc} | Deadline: {c.deadline}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}