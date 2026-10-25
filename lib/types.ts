export interface Company {
  id: number;
  name: string;
  role: string;
  ctc: string;
  eligibility: string;
  deadline: string;
  description: string;
}

export type ApplicationStatus =
  | "Applied"
  | "Shortlisted"
  | "Rejected"
  | "Selected";

export interface ApplicationItem {
  id: number;
  status: ApplicationStatus;
  appliedOn: string;
  company: Company;
}