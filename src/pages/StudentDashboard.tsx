
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ProjectCard } from "@/components/ProjectCard";
import { useProjects } from "@/context/ProjectContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const { user } = useAuth();
  const { projects } = useProjects();
  
  // Filter projects to only show this student's projects
  const studentProjects = user
    ? projects.filter((project) => project.studentId === user.id)
    : [];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            <p className="text-gray-500 mt-2">
              View and manage your project submissions
            </p>
          </div>
          <Button asChild>
            <Link to="/submit-project">
              <PlusIcon className="mr-2 h-4 w-4" /> Submit New Project
            </Link>
          </Button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Projects</h2>
          
          {studentProjects.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-gray-500 mb-4">You haven't submitted any projects yet</p>
              <Button asChild>
                <Link to="/submit-project">Submit Your First Project</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
