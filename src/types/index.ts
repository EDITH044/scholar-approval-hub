
export enum ProjectStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected"
}

export enum UserRole {
  STUDENT = "student",
  FACULTY = "faculty"
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  studentId: string;
  studentName: string;
  status: ProjectStatus;
  submittedAt: string;
  updatedAt: string;
  feedback?: string;
  attachments?: string[];
}
