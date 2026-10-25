"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch, getToken } from "@/lib/api";
import type { Company } from "@/lib/types";

export default function CompanyDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    async function loadCompany() {
      try {
        const data = await apiFetch<Company | null>(`/companies/${params.id}`);
        setCompany(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load company");
      } finally {
        setLoading(false);
      }
    }

    loadCompany();
  }, [params.id]);

  async function handleApply() {
    if (!getToken()) {
      router.push("/login");
      return;
    }

    setError("");
    setApplying(true);

    try {
      await apiFetch("/applications", {
        method: "POST",
        body: JSON.stringify({ companyId: Number(params.id) }),
      });
      setApplied(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not apply");
    } finally {
      setApplying(false);
    }
  }

  if (loading) {
    return <main className="flex-1 px-8 py-6">Loading...</main>;
  }

  if (!company) {
    return (
      <main className="flex-1 px-8 py-6">
        <p className="mb-4">Company not found.</p>
        <Link href="/companies" className="underline">
          Back to companies
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-1 px-8 py-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-2">{company.name}</h1>
      <p className="text-gray-500 mb-6">{company.role}</p>

      <div className="border rounded-lg p-4 mb-4">
        <p><span className="font-medium">CTC:</span> {company.ctc}</p>
        <p><span className="font-medium">Eligibility:</span> {company.eligibility}</p>
        <p><span className="font-medium">Deadline:</span> {company.deadline}</p>
      </div>

      <p className="mb-6">{company.description}</p>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {applied ? (
        <div>
          <p className="text-green-600 mb-2">Application submitted!</p>
          <Link href="/applications" className="underline">
            View my applications
          </Link>
        </div>
      ) : (
        <button
          onClick={handleApply}
          disabled={applying}
          className="bg-black text-white rounded px-6 py-2 disabled:opacity-50"
        >
          {applying ? "Applying..." : "Apply Now"}
        </button>
      )}
    </main>
  );
}