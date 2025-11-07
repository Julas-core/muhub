import { Link, useLocation, useParams } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Breadcrumbs = () => {
  const location = useLocation();
  const params = useParams();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const [materialName, setMaterialName] = useState<string>("");

  useEffect(() => {
    // Fetch material name if we're on a material detail page
    if (pathnames[0] === "material" && params.id) {
      const fetchMaterialName = async () => {
        const { data } = await supabase
          .from("materials")
          .select("title")
          .eq("id", params.id)
          .single();
        
        if (data?.title) {
          setMaterialName(data.title);
        }
      };
      fetchMaterialName();
    }
  }, [params.id, pathnames]);

  // Don't show breadcrumbs on home page
  if (location.pathname === "/") return null;

  const breadcrumbNameMap: Record<string, string> = {
    "dashboard": "Dashboard",
    "profile": "Profile",
    "upload": "Upload Material",
    "exam-prep": "Exam Preparation",
    "notes": "My Notes",
    "study-groups": "Study Groups",
    "forum": "Forum",
    "ai-assistant": "AI Assistant",
    "admin": "Admin Dashboard",
    "help": "Help Center",
    "about": "About Us",
    "contact": "Contact",
    "privacy": "Privacy Policy",
    "terms": "Terms of Service",
    "disclaimer": "Disclaimer",
    "cookie-policy": "Cookie Policy",
    "auth": "Sign In",
    "register": "Register",
  };

  return (
    <nav aria-label="Breadcrumb" className="py-3 border-b bg-muted/30">
      <div className="container px-4">
        <ol className="flex items-center gap-2 text-sm">
          <li className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            
            // Use material name if available, otherwise use default mapping
            let breadcrumbName = breadcrumbNameMap[name] || name.charAt(0).toUpperCase() + name.slice(1);
            if (pathnames[0] === "material" && index === 1 && materialName) {
              breadcrumbName = materialName;
            }

            return (
              <li key={name} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                {isLast ? (
                  <span className="font-medium text-foreground" aria-current="page">
                    {breadcrumbName}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {breadcrumbName}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};
