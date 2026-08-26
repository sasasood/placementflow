import Link from "next/link";
import { mockCompanies } from "../../lib/mockData";

export default function CompaniesPage() {
  return (
    <main className="flex-1 px-8 py-6">
      <h1 className="text-2xl font-bold mb-6">Companies Hiring</h1>
      <div className="flex flex-col gap-4">
        {mockCompanies.map((c) => (
          <Link
            key={c.id}
            href={`/companies/${c.id}`}
            className="border rounded-lg p-4 hover:bg-gray-50 transition"
          >
            <p className="font-semibold text-lg">{c.name} — {c.role}</p>
            <p className="text-sm text-gray-500">CTC: {c.ctc} | Deadline: {c.deadline}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}