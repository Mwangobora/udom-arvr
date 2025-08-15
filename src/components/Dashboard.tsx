import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Building2, Plus, BarChart3, Map } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ThemeToggle from "./ThemeToggle";

const Dashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const handleMarkerSubmit = (data: any) => {
    toast({
      title: "Marker Created",
      description: "New marker has been successfully added to the system.",
    });
    console.log("Marker data:", data);
  };

  const handleBuildingSubmit = (data: any) => {
    toast({
      title: "Building Created", 
      description: "New college building has been successfully added.",
    });
    console.log("Building data:", data);
  };

  return (
    <div className="min-h-screen p-6 space-y-8 bg-background transition-colors duration-300">
      {/* Header */}
      <div className="glass-card p-8 rounded-xl bg-card shadow-lg border border-primary dark:border-primary">
      <div className="flex items-center justify-between">
      <div>
      <h1 className="text-4xl font-bold text-foreground mb-2">
        Admin Dashboard
      </h1>
      <p className="text-foreground/80 text-lg">
        Manage markers and college buildings
      </p>
      </div>
      <div className="flex items-center gap-4">
      <div className="flex gap-4">
        <div className="text-center">
        <div className="text-2xl font-bold text-primary">24</div>
        <div className="text-sm text-muted-foreground">Markers</div>
        </div>
        <div className="text-center">
        <div className="text-2xl font-bold text-primary">12</div>
        <div className="text-sm text-muted-foreground">Buildings</div>
        </div>
      </div>
      <ThemeToggle />
      </div>
      </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="glass-card p-2 h-auto bg-card border border-primary dark:border-primary">
      <TabsTrigger 
      value="overview" 
      className="data-[state=active]:btn-gradient-primary data-[state=active]:text-primary-foreground px-6 py-3"
      >
      <BarChart3 className="mr-2 h-4 w-4" />
      Overview
      </TabsTrigger>
      <TabsTrigger 
      value="markers"
      className="data-[state=active]:btn-gradient-secondary data-[state=active]:text-secondary-foreground px-6 py-3"
      >
      <MapPin className="mr-2 h-4 w-4" />
      Markers
      </TabsTrigger>
      <TabsTrigger 
      value="buildings"
      className="data-[state=active]:btn-gradient-secondary data-[state=active]:text-secondary-foreground px-6 py-3"
      >
      <Building2 className="mr-2 h-4 w-4" />
      Buildings
      </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="glass-card border border-primary dark:border-primary bg-card">
        <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-secondary text-blue-400">
            <MapPin className="h-5 w-5" />
            Total Markers
          </CardTitle>
          </CardHeader>
          <CardContent>
          <div className="text-2xl font-bold text-primary">24</div>
          <p className="text-muted-foreground text-sm mt-1">
            +3 from last week
          </p>
          </CardContent>
        </Card>

        <Card className="glass-card border border-primary dark:border-primary bg-card">
          <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-secondary text-blue-400">
            <Building2 className="h-5 w-5"  />
            College Buildings
          </CardTitle>
          </CardHeader>
          <CardContent>
          <div className="text-2xl font-bold text-primary">12</div>
          <p className="text-muted-foreground text-sm mt-1">
            +1 from last week
          </p>
          </CardContent>
        </Card>

        <Card className="glass-card border border-primary dark:border-primary bg-card">
          <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-secondary text-blue-400">
            <Plus className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
          <Button 
            onClick={() => setActiveTab("markers")}
            variant="secondary"
            className="w-full"
            size="sm"
          >
            Add Marker
          </Button>
          <Button 
            onClick={() => setActiveTab("buildings")}
            variant="secondary"
            className="w-full"
            size="sm"
          >
            Add Building
          </Button>
          <Link to="/map" className="block w-full">
            <Button 
            variant="outline"
            className="w-full"
            size="sm"
            >
            <Map className="mr-2 h-4 w-4" />
            View Campus Map
            </Button>
          </Link>
          </CardContent>
        </Card>
        </div>
      </TabsContent>

      <TabsContent value="markers">
        <Card className="glass-card border border-primary dark:border-primary bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-secondary text-blue-400">
          <MapPin className="h-6 w-6" />
          Create New Marker
          </CardTitle>
          <CardDescription>
          Add a new marker to the map with location and details
          </CardDescription>
        </CardHeader>
        <CardContent>
       
        </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="buildings">
        <Card className="glass-card border border-secondary dark:border-secondary bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-secondary text-blue-400">
          <Building2 className="h-6 w-6" />
          Create New College Building
          </CardTitle>
          <CardDescription>
          Add a new college building with location and category
          </CardDescription>
        </CardHeader>
        <CardContent>
          
        </CardContent>
        </Card>
      </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;