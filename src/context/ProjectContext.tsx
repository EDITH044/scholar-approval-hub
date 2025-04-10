
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Project, ProjectStatus } from "@/types";
import { useToast } from "@/components/ui/use-toast";

// Initial projects data
const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Machine Learning Analysis of Climate Data",
    description: "A project focused on analyzing climate data using machine learning techniques to predict future climate patterns.",
    studentId: "student-1",
    studentName: "Alex Smith",
    status: ProjectStatus.PENDING,
    submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "proj-2",
    title: "Sustainable Urban Development Plan",
    description: "A comprehensive plan for sustainable urban development focusing on renewable energy and waste management.",
    studentId: "student-2",
    studentName: "Jamie Taylor",
    status: ProjectStatus.APPROVED,
    submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    feedback: "Excellent work on incorporating renewable energy solutions."
  },
  {
    id: "proj-3",
    title: "Impact of Social Media on Mental Health",
    description: "Research study on how social media usage affects mental health in young adults and adolescents.",
    studentId: "student-3",
    studentName: "Morgan Lee",
    status: ProjectStatus.REJECTED,
    submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    feedback: "Please revise the methodology section and provide more comprehensive literature review."
  },
  {
    id: "proj-4",
    title: "Blockchain for Supply Chain Management",
    description: "Applying blockchain technology to improve transparency and efficiency in supply chain management.",
    studentId: "student-4",
    studentName: "Sam Wilson",
    status: ProjectStatus.PENDING,
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "proj-5",
    title: "Renewable Energy Integration in Rural Communities",
    description: "A study on implementing renewable energy solutions in rural communities with limited infrastructure.",
    studentId: "student-5",
    studentName: "Riley Johnson",
    status: ProjectStatus.PENDING,
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

interface ProjectContextType {
  projects: Project[];
  submitProject: (project: Omit<Project, "id" | "status" | "submittedAt" | "updatedAt" | "studentId" | "studentName">) => void;
  approveProject: (id: string, feedback?: string) => void;
  rejectProject: (id: string, feedback: string) => void;
  getStudentProjects: (studentId: string) => Project[];
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const { toast } = useToast();

  const submitProject = (projectData: Omit<Project, "id" | "status" | "submittedAt" | "updatedAt" | "studentId" | "studentName">) => {
    const newProject: Project = {
      ...projectData,
      id: `proj-${projects.length + 1}`,
      studentId: "student-1", // Hardcoded for demo
      studentName: "Alex Smith", // Hardcoded for demo
      status: ProjectStatus.PENDING,
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProjects([...projects, newProject]);
    toast({
      title: "Project Submitted",
      description: "Your project has been submitted for review",
    });
  };

  const approveProject = (id: string, feedback?: string) => {
    setProjects(
      projects.map((project) =>
        project.id === id
          ? {
              ...project,
              status: ProjectStatus.APPROVED,
              updatedAt: new Date().toISOString(),
              feedback,
            }
          : project
      )
    );
    toast({
      title: "Project Approved",
      description: "The project has been approved successfully",
    });
  };

  const rejectProject = (id: string, feedback: string) => {
    setProjects(
      projects.map((project) =>
        project.id === id
          ? {
              ...project,
              status: ProjectStatus.REJECTED,
              updatedAt: new Date().toISOString(),
              feedback,
            }
          : project
      )
    );
    toast({
      title: "Project Rejected",
      description: "The project has been rejected with feedback",
    });
  };

  const getStudentProjects = (studentId: string) => {
    return projects.filter((project) => project.studentId === studentId);
  };

  return (
    <ProjectContext.Provider
      value={{ projects, submitProject, approveProject, rejectProject, getStudentProjects }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
};
