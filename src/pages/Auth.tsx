import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const signInSchema = z.object({
  email: z.string().email("Invalid email address").max(255, "Email too long"),
  password: z.string().min(6, "Password must be at least 6 characters").max(100, "Password too long"),
});

const phoneSignInSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number too long"),
  password: z.string().min(6, "Password must be at least 6 characters").max(100, "Password too long"),
});

const signUpSchema = signInSchema.extend({
  studentId: z.string().min(3, "Student ID must be at least 3 characters").max(50, "Student ID too long"),
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100, "Full name too long"),
});

const phoneSignUpSchema = phoneSignInSchema.extend({
  studentId: z.string().min(3, "Student ID must be at least 3 characters").max(50, "Student ID too long"),
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100, "Full name too long"),
});

const Auth = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [studentId, setStudentId] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp, signIn, signInWithPhone, signUpWithPhone, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        if (loginMethod === "email") {
          // Validate email login
          const validationResult = signInSchema.safeParse({ email, password });
          
          if (!validationResult.success) {
            toast({
              title: "Validation Error",
              description: validationResult.error.errors[0].message,
              variant: "destructive"
            });
            setLoading(false);
            return;
          }

          const { error } = await signIn(validationResult.data.email, validationResult.data.password);
          if (error) {
            toast({
              title: "Error",
              description: error.message,
              variant: "destructive"
            });
          } else {
            navigate("/dashboard");
          }
        } else {
          // Validate phone login
          const validationResult = phoneSignInSchema.safeParse({ phone, password });
          
          if (!validationResult.success) {
            toast({
              title: "Validation Error",
              description: validationResult.error.errors[0].message,
              variant: "destructive"
            });
            setLoading(false);
            return;
          }

          const { error } = await signInWithPhone(validationResult.data.phone, validationResult.data.password);
          if (error) {
            toast({
              title: "Error",
              description: error.message,
              variant: "destructive"
            });
          } else {
            navigate("/dashboard");
          }
        }
      } else {
        if (loginMethod === "email") {
          // Validate email signup
          const validationResult = signUpSchema.safeParse({ email, password, studentId, fullName });
          
          if (!validationResult.success) {
            toast({
              title: "Validation Error",
              description: validationResult.error.errors[0].message,
              variant: "destructive"
            });
            setLoading(false);
            return;
          }

          const { error } = await signUp(
            validationResult.data.email,
            validationResult.data.password,
            validationResult.data.studentId,
            validationResult.data.fullName
          );
          if (error) {
            toast({
              title: "Error",
              description: error.message,
              variant: "destructive"
            });
          } else {
            toast({
              title: "Success",
              description: "Account created successfully!",
            });
            navigate("/dashboard");
          }
        } else {
          // Validate phone signup
          const validationResult = phoneSignUpSchema.safeParse({ phone, password, studentId, fullName });
          
          if (!validationResult.success) {
            toast({
              title: "Validation Error",
              description: validationResult.error.errors[0].message,
              variant: "destructive"
            });
            setLoading(false);
            return;
          }

          const { error } = await signUpWithPhone(
            validationResult.data.phone,
            validationResult.data.password,
            validationResult.data.studentId,
            validationResult.data.fullName
          );
          if (error) {
            toast({
              title: "Error",
              description: error.message,
              variant: "destructive"
            });
          } else {
            toast({
              title: "Success",
              description: "Account created successfully!",
            });
            navigate("/dashboard");
          }
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Navigation />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{isLogin ? t('signIn') : t('signUp')}</CardTitle>
            <CardDescription>
              {isLogin ? t('appTagline') : t('appDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={loginMethod} onValueChange={(v) => setLoginMethod(v as "email" | "phone")} className="mb-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
              </TabsList>
              
              <TabsContent value="email">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="fullName">{t('fullName')}</Label>
                        <Input
                          id="fullName"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required={!isLogin}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="studentId">{t('studentId')}</Label>
                        <Input
                          id="studentId"
                          type="text"
                          value={studentId}
                          onChange={(e) => setStudentId(e.target.value)}
                          required={!isLogin}
                        />
                      </div>
                    </>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('email')}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">{t('password')}</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? t('loading') : isLogin ? t('signIn') : t('signUp')}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="phone">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="fullName-phone">{t('fullName')}</Label>
                        <Input
                          id="fullName-phone"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required={!isLogin}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="studentId-phone">{t('studentId')}</Label>
                        <Input
                          id="studentId-phone"
                          type="text"
                          value={studentId}
                          onChange={(e) => setStudentId(e.target.value)}
                          required={!isLogin}
                        />
                      </div>
                    </>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1234567890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-phone">{t('password')}</Label>
                    <Input
                      id="password-phone"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? t('loading') : isLogin ? t('signIn') : t('signUp')}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-4 text-center">
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm"
              >
                {isLogin ? t('dontHaveAccount') : t('alreadyHaveAccount')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;
