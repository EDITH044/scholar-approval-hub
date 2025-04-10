
import { Project, ProjectStatus } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, XCircle } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  showActions?: boolean;
}

export const ProjectCard = ({ project, showActions = true }: ProjectCardProps) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{project.title}</CardTitle>
          <StatusBadge status={project.status} />
        </div>
        <CardDescription className="flex items-center gap-1">
          By {project.studentName}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-gray-500 line-clamp-3">{project.description}</p>
        
        {project.feedback && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-1">Feedback:</h4>
            <p className="text-sm text-gray-600 italic">{project.feedback}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div className="text-xs text-gray-500">
          Submitted {formatDistanceToNow(new Date(project.submittedAt))} ago
        </div>
        {showActions && (
          <Button asChild size="sm">
            <Link to={`/projects/${project.id}`}>View Details</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const StatusBadge = ({ status }: { status: ProjectStatus }) => {
  switch (status) {
    case ProjectStatus.APPROVED:
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          <CheckCircle className="w-3 h-3 mr-1" /> Approved
        </Badge>
      );
    case ProjectStatus.REJECTED:
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
          <XCircle className="w-3 h-3 mr-1" /> Rejected
        </Badge>
      );
    case ProjectStatus.PENDING:
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
          <Clock className="w-3 h-3 mr-1" /> Pending
        </Badge>
      );
    default:
      return null;
  }
};
