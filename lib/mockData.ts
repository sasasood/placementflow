export interface Deadline {
  id: number;
  company: string;
  role: string;
  deadline: string;
  status: "Open" | "Closing Soon" | "Closed";
}

export const mockDeadlines: Deadline[] = [
  { id: 1, company: "Google", role: "SWE Intern", deadline: "2026-09-05", status: "Open" },
  { id: 2, company: "Microsoft", role: "SDE-1", deadline: "2026-08-30", status: "Closing Soon" },
  { id: 3, company: "Amazon", role: "SDE Intern", deadline: "2026-09-15", status: "Open" },
  { id: 4, company: "TCS", role: "Ninja", deadline: "2026-08-20", status: "Closed" },
];

export interface Application {
  id: number;
  companyName: string;
  role: string;
  appliedOn: string;
  status: "Applied" | "Shortlisted" | "Rejected" | "Selected";
}

export const mockApplications: Application[] = [
  { id: 1, companyName: "Google", role: "SWE Intern", appliedOn: "2026-08-10", status: "Shortlisted" },
  { id: 2, companyName: "Amazon", role: "SDE Intern", appliedOn: "2026-08-12", status: "Applied" },
  { id: 3, companyName: "TCS", role: "Ninja", appliedOn: "2026-08-01", status: "Rejected" },
];

export interface Company {
  id: number;
  name: string;
  role: string;
  ctc: string;
  eligibility: string;
  deadline: string;
  description: string;
}

export const mockCompanies: Company[] = [
  {
    id: 1,
    name: "Google",
    role: "SWE Intern",
    ctc: "₹30 LPA",
    eligibility: "CGPA ≥ 8.0, No active backlogs",
    deadline: "2026-09-05",
    description: "Work on large-scale distributed systems as part of a summer internship.",
  },
  {
    id: 2,
    name: "Microsoft",
    role: "SDE-1",
    ctc: "₹28 LPA",
    eligibility: "CGPA ≥ 7.5, CSE/IT only",
    deadline: "2026-08-30",
    description: "Full-time SDE role on the Azure Cloud infrastructure team.",
  },
  {
    id: 3,
    name: "Amazon",
    role: "SDE Intern",
    ctc: "₹25 LPA",
    eligibility: "CGPA ≥ 7.0, All branches",
    deadline: "2026-09-15",
    description: "Internship with a PPO opportunity on the retail platform team.",
  },
];