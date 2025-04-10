
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";
import { Link } from "react-router-dom";

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-4xl font-bold text-center mb-6">
          Welcome to Scholar Approval Hub
        </h1>
        <p className="text-xl text-center text-gray-600 max-w-2xl mb-8">
          Streamlining the project approval process between faculty and students.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mt-8">
          <div className="bg-purple-50 p-8 rounded-lg border border-purple-100">
            <h2 className="text-2xl font-semibold mb-4 text-purple-900">For Faculty</h2>
            <ul className="space-y-2 mb-6 text-gray-600">
              <li className="flex items-start">
                <span className="mr-2 text-purple-500">✓</span> Review student project submissions
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-purple-500">✓</span> Approve or reject projects with feedback
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-purple-500">✓</span> Track project status and history
              </li>
            </ul>
            {isAuthenticated && user?.role === UserRole.FACULTY ? (
              <Button asChild>
                <Link to="/faculty-dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link to="/login">Faculty Login</Link>
              </Button>
            )}
          </div>
          
          <div className="bg-blue-50 p-8 rounded-lg border border-blue-100">
            <h2 className="text-2xl font-semibold mb-4 text-blue-900">For Students</h2>
            <ul className="space-y-2 mb-6 text-gray-600">
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">✓</span> Submit new project proposals
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">✓</span> Track approval status
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">✓</span> Receive feedback from faculty
              </li>
            </ul>
            {isAuthenticated && user?.role === UserRole.STUDENT ? (
              <Button asChild>
                <Link to="/student-dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link to="/login">Student Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
