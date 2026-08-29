import { mockCompanies } from "@/lib/mockData";
import { notFound } from "next/navigation";

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const company = mockCompanies.find((c) => c.id === Number(id));

  if (!company) {
    notFound();
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

      <button className="bg-black text-white rounded px-6 py-2">
        Apply Now
      </button>
    </main>
  );
}