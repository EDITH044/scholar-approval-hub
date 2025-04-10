
import { useState } from "react";
import { useProjects } from "@/context/ProjectContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

interface ApprovalFormProps {
  projectId: string;
  onClose?: () => void;
}

export const ApprovalForm = ({ projectId, onClose }: ApprovalFormProps) => {
  const [feedback, setFeedback] = useState("");
  const { approveProject, rejectProject } = useProjects();
  const navigate = useNavigate();

  const handleApprove = () => {
    approveProject(projectId, feedback);
    if (onClose) {
      onClose();
    } else {
      navigate("/faculty-dashboard");
    }
  };

  const handleReject = () => {
    if (!feedback.trim()) {
      alert("Please provide feedback when rejecting a project");
      return;
    }
    
    rejectProject(projectId, feedback);
    if (onClose) {
      onClose();
    } else {
      navigate("/faculty-dashboard");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Review</CardTitle>
        <CardDescription>
          Approve or reject this project submission with optional feedback.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <label htmlFor="feedback" className="text-sm font-medium">
            Feedback (required for rejection)
          </label>
          <Textarea
            id="feedback"
            placeholder="Provide feedback to the student"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={5}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="destructive" onClick={handleReject}>
          Reject Project
        </Button>
        <Button variant="default" onClick={handleApprove}>
          Approve Project
        </Button>
      </CardFooter>
    </Card>
  );
};
