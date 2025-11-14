import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, CheckCircle, AlertCircle, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { z } from "zod";

const messageSchema = z.object({
  message: z.string().trim().min(1, "Message cannot be empty").max(2000, "Message must be less than 2000 characters"),
});

interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  created_at: string;
}

interface Message {
  id: string;
  user_id: string;
  message: string;
  is_staff: boolean;
  created_at: string;
}

interface StatusHistory {
  id: string;
  status: string;
  created_at: string;
}

const ComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [statusHistory, setStatusHistory] = useState<StatusHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);

  useEffect(() => {
    if (id && user) {
      fetchComplaintDetails();
      fetchMessages();
      fetchStatusHistory();
      
      // Subscribe to real-time messages
      const channel = supabase
        .channel(`complaint-${id}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'complaint_messages',
            filter: `complaint_id=eq.${id}`
          },
          (payload) => {
            setMessages(prev => [...prev, payload.new as Message]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [id, user]);

  const fetchComplaintDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('complaints')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setComplaint(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('complaint_messages')
        .select('*')
        .eq('complaint_id', id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error: any) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchStatusHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('complaint_status_history')
        .select('*')
        .eq('complaint_id', id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setStatusHistory(data || []);
    } catch (error: any) {
      console.error('Error fetching status history:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!user) return;

    // Validate message
    const validationResult = messageSchema.safeParse({ message });
    
    if (!validationResult.success) {
      toast({
        title: "Validation Error",
        description: validationResult.error.errors[0].message,
        variant: "destructive"
      });
      return;
    }

    setSendingMessage(true);
    try {
      const { error } = await supabase
        .from('complaint_messages')
        .insert([
          {
            complaint_id: id,
            user_id: user.id,
            message: validationResult.data.message,
            is_staff: false
          }
        ]);

      if (error) throw error;

      setMessage("");
      toast({
        title: "Message sent",
        description: "Your message has been sent successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setSendingMessage(false);
    }
  };

  const getStatusIcon = (status: string) => {
    const currentStatusIndex = ['Submitted', 'In Review', 'In Progress', 'Resolved'].indexOf(complaint?.status || '');
    const itemStatusIndex = ['Submitted', 'In Review', 'In Progress', 'Resolved'].indexOf(status);
    
    if (itemStatusIndex <= currentStatusIndex) {
      return <CheckCircle className="w-6 h-6 text-secondary" />;
    }
    return <Clock className="w-6 h-6 text-muted-foreground" />;
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading complaint details...</p>
        </div>
      </div>
    );
  }

  if (!complaint) {
    return null;
  }

  const timeline = [
    { status: "Submitted", date: new Date(complaint.created_at).toLocaleString() },
    { status: "In Review", date: statusHistory.find(h => h.status === 'In Review')?.created_at || 'Pending' },
    { status: "In Progress", date: statusHistory.find(h => h.status === 'In Progress')?.created_at || 'Pending' },
    { status: "Resolved", date: statusHistory.find(h => h.status === 'Resolved')?.created_at || 'Pending' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
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
                      <CardDescription>
                        Submitted on {new Date(complaint.created_at).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(complaint.status)}>
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
                    {timeline.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        {getStatusIcon(item.status)}
                        <div className="flex-1">
                          <h4 className={`font-semibold ${
                            item.date !== 'Pending' ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {item.status}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {item.date !== 'Pending' ? new Date(item.date).toLocaleString() : item.date}
                          </p>
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
                    {messages.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No messages yet. Start the conversation!
                      </p>
                    ) : (
                      messages.map((msg) => (
                        <div key={msg.id} className={`p-3 rounded-lg ${
                          msg.user_id === user?.id ? "bg-primary/10" : "bg-muted"
                        }`}>
                          <p className="text-sm font-semibold mb-1">
                            {msg.is_staff ? "Staff" : "You"}
                          </p>
                          <p className="text-sm text-muted-foreground mb-1">{msg.message}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(msg.created_at).toLocaleString()}
                          </p>
                        </div>
                      ))
                    )}
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
                    <Button 
                      className="w-full" 
                      onClick={handleSendMessage}
                      disabled={sendingMessage || !message.trim()}
                    >
                      {sendingMessage ? "Sending..." : "Send Message"}
                    </Button>
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
