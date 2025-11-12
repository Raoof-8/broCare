import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, Clock, CheckCircle, LogOut, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Complaint {
  id: string;
  title: string;
  category: string;
  status: string;
  created_at: string;
  priority: string;
}

const Dashboard = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [isStaffOrAdmin, setIsStaffOrAdmin] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchComplaints();
      checkIfStaffOrAdmin();
    }
  }, [user]);

  const checkIfStaffOrAdmin = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .in("role", ["admin", "staff", "hod", "grc"])
      .maybeSingle();
    
    setIsStaffOrAdmin(!!data);
  };

  const fetchComplaints = async () => {
    try {
      const { data, error } = await supabase
        .from('complaints')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComplaints(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching complaints",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      label: "Total Complaints",
      value: complaints.length,
      icon: AlertCircle,
      color: "text-primary"
    },
    {
      label: "In Progress",
      value: complaints.filter(c => c.status === 'In Progress' || c.status === 'In Review').length,
      icon: Clock,
      color: "text-yellow-500"
    },
    {
      label: "Resolved",
      value: complaints.filter(c => c.status === 'Resolved' || c.status === 'Closed').length,
      icon: CheckCircle,
      color: "text-secondary"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted":
        return "bg-primary/20 text-primary border-primary/50";
      case "In Review":
      case "In Progress":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/50";
      case "Resolved":
      case "Closed":
        return "bg-secondary/20 text-secondary border-secondary/50";
      default:
        return "bg-muted/20 text-muted-foreground border-muted/50";
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your complaints...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Track and manage your complaints</p>
            </div>
            <div className="flex gap-3">
              {isStaffOrAdmin && (
                <Link to="/admin">
                  <Button variant="secondary" className="gap-2">
                    <Shield className="w-4 h-4" />
                    Admin Panel
                  </Button>
                </Link>
              )}
              <Button onClick={handleSignOut} variant="outline" className="gap-2">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
              <Link to="/submit">
                <Button className="gap-2">
                  <AlertCircle className="w-4 h-4" />
                  New Complaint
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {stats.map((stat, index) => (
              <Card key={index} className="border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className={`w-10 h-10 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Complaints List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-4">Your Complaints</h2>
            
            {complaints.length === 0 ? (
              <Card className="border-border">
                <CardContent className="py-12 text-center">
                  <AlertCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No complaints yet</h3>
                  <p className="text-muted-foreground mb-6">
                    You haven't submitted any complaints. Click the button below to get started.
                  </p>
                  <Link to="/submit">
                    <Button>Submit Your First Complaint</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {complaints.map((complaint) => (
                  <Link key={complaint.id} to={`/complaint/${complaint.id}`}>
                    <Card className="border-border hover:border-primary/50 transition-colors cursor-pointer">
                      <CardHeader className="flex flex-row items-start justify-between space-y-0">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{complaint.title}</CardTitle>
                          <div className="flex gap-2 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              {complaint.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs border-primary text-primary">
                              {complaint.priority}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={getStatusColor(complaint.status)}>
                            {complaint.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(complaint.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
