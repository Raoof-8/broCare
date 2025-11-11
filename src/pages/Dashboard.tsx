import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Plus, FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";

const Dashboard = () => {
  // Mock data for MVP
  const complaints = [
    {
      id: 1,
      title: "Hostel Wi-Fi Connection Issue",
      category: "Hostel",
      status: "In Progress",
      date: "2024-01-15",
      priority: "High"
    },
    {
      id: 2,
      title: "Lab Equipment Not Working",
      category: "Academic",
      status: "Submitted",
      date: "2024-01-14",
      priority: "Medium"
    },
    {
      id: 3,
      title: "Canteen Food Quality",
      category: "Canteen",
      status: "Resolved",
      date: "2024-01-10",
      priority: "Low"
    }
  ];

  const stats = [
    { label: "Total Complaints", value: "3", icon: FileText, color: "text-foreground" },
    { label: "Pending", value: "1", icon: Clock, color: "text-primary" },
    { label: "In Progress", value: "1", icon: AlertCircle, color: "text-yellow-500" },
    { label: "Resolved", value: "1", icon: CheckCircle, color: "text-secondary" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted":
        return "bg-primary/20 text-primary border-primary/50";
      case "In Progress":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/50";
      case "Resolved":
        return "bg-secondary/20 text-secondary border-secondary/50";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage and track your complaints</p>
            </div>
            <Link to="/submit">
              <Button size="lg" className="gap-2">
                <Plus className="w-5 h-5" />
                New Complaint
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
                    </div>
                    <stat.icon className={`w-12 h-12 ${stat.color} opacity-50`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Complaints List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Your Complaints</CardTitle>
              <CardDescription>View and track all your submitted complaints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complaints.map((complaint) => (
                  <Link key={complaint.id} to={`/complaint/${complaint.id}`}>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="p-4 border border-border rounded-lg hover:border-primary/50 transition-all cursor-pointer bg-card"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{complaint.title}</h3>
                          <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
                            <Badge variant="outline" className="border-border">
                              {complaint.category}
                            </Badge>
                            <span>•</span>
                            <span>{complaint.date}</span>
                            <span>•</span>
                            <Badge variant="outline" className={
                              complaint.priority === "High" ? "border-primary text-primary" :
                              complaint.priority === "Medium" ? "border-yellow-500 text-yellow-500" :
                              "border-muted-foreground text-muted-foreground"
                            }>
                              {complaint.priority}
                            </Badge>
                          </div>
                        </div>
                        <Badge className={getStatusColor(complaint.status)}>
                          {complaint.status}
                        </Badge>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
