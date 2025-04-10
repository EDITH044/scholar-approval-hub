
import { Layout } from "@/components/Layout";
import { ProjectForm } from "@/components/ProjectForm";

const SubmitProject = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Submit a New Project</h1>
        <p className="text-gray-500">
          Complete the form below to submit your project for faculty review.
        </p>
        <ProjectForm />
      </div>
    </Layout>
  );
};

export default SubmitProject;
