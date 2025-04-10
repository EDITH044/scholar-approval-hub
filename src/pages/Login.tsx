
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const [activeTab, setActiveTab] = useState<UserRole>(UserRole.FACULTY);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login(activeTab);
    
    if (activeTab === UserRole.FACULTY) {
      navigate("/faculty-dashboard");
    } else {
      navigate("/student-dashboard");
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
            <CardDescription>
              Choose an account type to sign in with
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue={UserRole.FACULTY}
              onValueChange={(value) => setActiveTab(value as UserRole)}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value={UserRole.FACULTY}>Faculty</TabsTrigger>
                <TabsTrigger value={UserRole.STUDENT}>Student</TabsTrigger>
              </TabsList>
              <TabsContent value={UserRole.FACULTY} className="mt-4">
                <div className="p-6 bg-slate-50 rounded-md">
                  <h3 className="font-medium">Dr. Johnson</h3>
                  <p className="text-sm text-slate-500">johnson@university.edu</p>
                </div>
              </TabsContent>
              <TabsContent value={UserRole.STUDENT} className="mt-4">
                <div className="p-6 bg-slate-50 rounded-md">
                  <h3 className="font-medium">Alex Smith</h3>
                  <p className="text-sm text-slate-500">alex@university.edu</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button onClick={handleLogin} className="w-full">
              Continue
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
