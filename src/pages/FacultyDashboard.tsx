
import { Layout } from "@/components/Layout";
import { ProjectCard } from "@/components/ProjectCard";
import { useProjects } from "@/context/ProjectContext";
import { ProjectStatus } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FacultyDashboard = () => {
  const { projects } = useProjects();

  const pendingProjects = projects.filter((p) => p.status === ProjectStatus.PENDING);
  const approvedProjects = projects.filter((p) => p.status === ProjectStatus.APPROVED);
  const rejectedProjects = projects.filter((p) => p.status === ProjectStatus.REJECTED);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Faculty Dashboard</h1>
          <p className="text-gray-500 mt-2">
            Review and manage student project submissions
          </p>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="pending" className="relative">
              Pending Review
              {pendingProjects.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {pendingProjects.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="all">All Projects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="space-y-4">
            {pendingProjects.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No pending projects to review
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="approved" className="space-y-4">
            {approvedProjects.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No approved projects
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {approvedProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="rejected" className="space-y-4">
            {rejectedProjects.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No rejected projects
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rejectedProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="all" className="space-y-4">
            {projects.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No projects found
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default FacultyDashboard;
