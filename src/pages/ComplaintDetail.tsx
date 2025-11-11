import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, CheckCircle, AlertCircle, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const ComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  // Mock data for MVP
  const complaint = {
    id,
    title: "Hostel Wi-Fi Connection Issue",
    category: "Hostel",
    status: "In Progress",
    date: "2024-01-15",
    priority: "High",
    description: "The Wi-Fi connection in my hostel room has been extremely unstable for the past week. It keeps disconnecting every few minutes, making it impossible to attend online classes or complete assignments. This is severely affecting my academic performance.",
    timeline: [
      { status: "Submitted", date: "2024-01-15 10:30 AM", completed: true },
      { status: "Under Review", date: "2024-01-15 02:45 PM", completed: true },
      { status: "In Progress", date: "2024-01-16 09:00 AM", completed: true },
      { status: "Resolved", date: "Pending", completed: false }
    ],
    messages: [
      {
        sender: "Staff",
        message: "Thank you for reporting this issue. Our technical team has been notified and will investigate the problem.",
        date: "2024-01-15 03:00 PM"
      },
      {
        sender: "You",
        message: "Thank you for the quick response. When can I expect this to be fixed?",
        date: "2024-01-15 04:30 PM"
      }
    ]
  };

  const getStatusIcon = (completed: boolean) => {
    if (completed) {
      return <CheckCircle className="w-6 h-6 text-secondary" />;
    }
    return <Clock className="w-6 h-6 text-muted-foreground" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Complaint Details */}
              <Card className="border-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{complaint.title}</CardTitle>
                      <CardDescription>Submitted on {complaint.date}</CardDescription>
                    </div>
                    <Badge className={
                      complaint.status === "Submitted" ? "bg-primary/20 text-primary border-primary/50" :
                      complaint.status === "In Progress" ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/50" :
                      "bg-secondary/20 text-secondary border-secondary/50"
                    }>
                      {complaint.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{complaint.description}</p>
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <Badge variant="outline" className="mt-1">{complaint.category}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Priority</p>
                      <Badge variant="outline" className="mt-1 border-primary text-primary">
                        {complaint.priority}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Resolution Timeline</CardTitle>
                  <CardDescription>Track the progress of your complaint</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {complaint.timeline.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        {getStatusIcon(item.completed)}
                        <div className="flex-1">
                          <h4 className={`font-semibold ${item.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {item.status}
                          </h4>
                          <p className="text-sm text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Actions */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Escalate Complaint
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2" disabled>
                    <CheckCircle className="w-4 h-4" />
                    Mark as Resolved
                  </Button>
                </CardContent>
              </Card>

              {/* Messages */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Messages
                  </CardTitle>
                  <CardDescription>Communicate with staff</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {complaint.messages.map((msg, index) => (
                      <div key={index} className={`p-3 rounded-lg ${
                        msg.sender === "You" ? "bg-primary/10" : "bg-muted"
                      }`}>
                        <p className="text-sm font-semibold mb-1">{msg.sender}</p>
                        <p className="text-sm text-muted-foreground mb-1">{msg.message}</p>
                        <p className="text-xs text-muted-foreground">{msg.date}</p>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      className="bg-muted border-border resize-none"
                    />
                    <Button className="w-full">Send Message</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComplaintDetail;
