
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjects } from "@/context/ProjectContext";
import { useAuth } from "@/context/AuthContext";
import { Layout } from "@/components/Layout";
import { ProjectStatus, UserRole } from "@/types";
import { formatDistanceToNow, format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ApprovalForm } from "@/components/ApprovalForm";
import { CheckCircle, Clock, Download, XCircle } from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { projects } = useProjects();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!id) {
    navigate("/");
    return null;
  }

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <p className="text-gray-500 mb-6">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </Layout>
    );
  }

  const isFaculty = user?.role === UserRole.FACULTY;
  const getStatusBadge = () => {
    switch (project.status) {
      case ProjectStatus.APPROVED:
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-4 h-4 mr-1" /> Approved
          </div>
        );
      case ProjectStatus.REJECTED:
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <XCircle className="w-4 h-4 mr-1" /> Rejected
          </div>
        );
      case ProjectStatus.PENDING:
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-4 h-4 mr-1" /> Pending Review
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <Button variant="outline" className="mb-6" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
            <div className="flex items-center gap-3">
              <p className="text-gray-500">
                Submitted by {project.studentName}
              </p>
              <span className="text-gray-400">•</span>
              <p className="text-gray-500">
                {formatDistanceToNow(new Date(project.submittedAt))} ago
              </p>
            </div>
          </div>
          {getStatusBadge()}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>
              Full description and information about this project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-1">Description</h3>
              <p className="text-gray-700">{project.description}</p>
            </div>

            {project.feedback && (
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-1">Faculty Feedback</h3>
                <p className="text-gray-700 italic">"{project.feedback}"</p>
              </div>
            )}

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium mb-1">Timeline</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Submitted on:</span>
                  <span className="font-medium">
                    {format(new Date(project.submittedAt), "MMMM d, yyyy")}
                  </span>
                </div>
                {project.status !== ProjectStatus.PENDING && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      {project.status === ProjectStatus.APPROVED
                        ? "Approved on:"
                        : "Rejected on:"}
                    </span>
                    <span className="font-medium">
                      {format(new Date(project.updatedAt), "MMMM d, yyyy")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          {isFaculty && project.status === ProjectStatus.PENDING && (
            <CardFooter className="justify-end border-t pt-4">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Review Project</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Review Project</DialogTitle>
                    <DialogDescription>
                      Provide your decision and feedback for this project.
                    </DialogDescription>
                  </DialogHeader>
                  <ApprovalForm 
                    projectId={project.id} 
                    onClose={() => setIsDialogOpen(false)} 
                  />
                </DialogContent>
              </Dialog>
            </CardFooter>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default ProjectDetail;
