import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Upload, AlertCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { z } from "zod";

const complaintSchema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters").max(200, "Title must be less than 200 characters"),
  description: z.string().trim().min(20, "Description must be at least 20 characters").max(5000, "Description must be less than 5000 characters"),
  category: z.enum(["Academic", "Hostel", "Canteen", "Infrastructure", "Harassment", "Administration", "Other"]),
  priority: z.enum(["Low", "Medium", "High", "Critical"]),
});

const SubmitComplaint = () => {
  const { t } = useLanguage();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit a complaint",
        variant: "destructive"
      });
      return;
    }

    // Validate inputs
    const validationResult = complaintSchema.safeParse({
      title,
      description,
      category,
      priority,
    });

    if (!validationResult.success) {
      toast({
        title: "Validation Error",
        description: validationResult.error.errors[0].message,
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('complaints')
        .insert([
          {
            user_id: user.id,
            title: validationResult.data.title,
            description: validationResult.data.description,
            category: validationResult.data.category as any,
            priority: validationResult.data.priority as any,
            is_anonymous: anonymous,
            status: 'Submitted'
          }
        ])
        .select();

      if (error) throw error;

      toast({
        title: "Complaint Submitted",
        description: "Your complaint has been successfully submitted and will be reviewed shortly.",
      });
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Academic",
    "Hostel",
    "Canteen",
    "Infrastructure",
    "Harassment",
    "Administration",
    "Other"
  ];

  const priorities = ["Low", "Medium", "High", "Critical"];

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{t('submitNewComplaint')}</h1>
            <p className="text-muted-foreground">
              {t('description')}
            </p>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>{t('submitComplaint')}</CardTitle>
              <CardDescription>
                {t('description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">{t('complaintTitle')}</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="bg-muted border-border"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">{t('category')}</Label>
                    <Select value={category} onValueChange={setCategory} required>
                      <SelectTrigger className="bg-muted border-border">
                        <SelectValue placeholder={t('category')} />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {t(cat.toLowerCase())}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">{t('priority')}</Label>
                    <Select value={priority} onValueChange={setPriority} required>
                      <SelectTrigger className="bg-muted border-border">
                        <SelectValue placeholder={t('priority')} />
                      </SelectTrigger>
                      <SelectContent>
                        {priorities.map((p) => (
                          <SelectItem key={p} value={p}>
                            {t(p.toLowerCase())}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">{t('description')}</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your complaint in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={6}
                    className="bg-muted border-border resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">Attach Evidence (Optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-muted">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Images, documents, or videos (Max 10MB)
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-primary" />
                    <div>
                      <Label htmlFor="anonymous" className="cursor-pointer">
                        {t('submitAnonymously')}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {t('submitAnonymouslyDesc')}
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="anonymous"
                    checked={anonymous}
                    onCheckedChange={setAnonymous}
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                    className="flex-1"
                    disabled={loading}
                  >
                    {t('cancel')}
                  </Button>
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading ? t('submitting') : t('submit')}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SubmitComplaint;
