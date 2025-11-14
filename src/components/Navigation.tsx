import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Menu, Home, FileText, LayoutDashboard, Shield } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { LanguageSelector } from "./LanguageSelector";
import { NotificationBell } from "./NotificationBell";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isStaffOrAdmin, setIsStaffOrAdmin] = useState(false);

  useEffect(() => {
    const checkUserRole = async () => {
      if (!user) return;

      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .in("role", ["admin", "staff", "hod", "grc"])
        .single();

      setIsStaffOrAdmin(!!data);
    };

    checkUserRole();
  }, [user]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const isAuthPage = location.pathname === "/auth" || location.pathname === "/login";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-accent">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2 mt-6">
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => navigate("/")}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
                
                {user && (
                  <>
                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={() => navigate("/dashboard")}
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                    
                    {!isStaffOrAdmin && (
                      <Button
                        variant="ghost"
                        className="justify-start"
                        onClick={() => navigate("/submit")}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Submit Complaint
                      </Button>
                    )}
                    
                    {isStaffOrAdmin && (
                      <Button
                        variant="ghost"
                        className="justify-start"
                        onClick={() => navigate("/admin")}
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        Admin Panel
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      className="justify-start text-destructive"
                      onClick={() => signOut()}
                    >
                      Sign Out
                    </Button>
                  </>
                )}
                
                {!user && !isAuthPage && (
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => navigate("/auth")}
                  >
                    Sign In
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSelector />
          {user && <NotificationBell />}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
