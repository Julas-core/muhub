import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Upload, User, ShieldCheck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { UserPointsBadge } from "./UserPointsBadge";
import { StudyStreak } from "./StudyStreak";
import { NotificationBell } from "./NotificationBell";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
// Use Vite-compatible URL import for static asset (SVG) to avoid runtime import issues
const StudyHubLogo = new URL('../assets/MuStudyHubv4..svg', import.meta.url).href;

export type HeaderProps = {
  avatarUrl?: string | null;
};

const Header = ({ avatarUrl }: HeaderProps) => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "You have been signed out.",
      });
      navigate("/");
    }
  };

  return (
    <header className="border-b" role="banner">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo and University Name */}
        <Link to="/" aria-label="MUStudy-HUB Home">
        <div className="flex items-center gap-3">
          <img src={StudyHubLogo} alt="Mekelle University Logo" className="h-10 object-contain" aria-label="Mekelle University Logo" />
        </div>
        </Link>
        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium ml-2" aria-label="Main navigation">
          {/* <Link to="/" className="transition-colors hover:text-primary">
            Home
          </Link> */}
          {user && (
            <>
              <Link to="/dashboard" className="transition-colors hover:text-primary">
                Dashboard
              </Link>
              {/*<Link to="/study-groups" className="transition-colors hover:text-primary">
                Study Groups
              </Link>
              <Link to="/forum" className="transition-colors hover:text-primary">
                Forum
              </Link>
              <Link to="/leaderboard" className="transition-colors hover:text-primary">
                Leaderboard
              </Link>*/}
              <Link to="/exam-prep" className="transition-colors hover:text-primary">
                Exam Prep
              </Link>
              {/*<Link to="/ai-assistant" className="transition-colors hover:text-primary">
                AI Assistant
              </Link>*/}
              <Link to="/notes" className="transition-colors hover:text-primary">
                Notes
              </Link>
            </>
          )}
          {!user && (
            <>
              <Link to="/about" className="transition-colors hover:text-primary">
                About
              </Link>
              <Link to="/contact" className="transition-colors hover:text-primary">
                Contact
              </Link>
              <Link to="/help" className="transition-colors hover:text-primary">
                FAQ's
              </Link>
            </>
          )}
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-2">
          {user ? (
            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <button
                  className="inline-flex items-center justify-center rounded-md h-10 w-10 overflow-hidden hover:opacity-80 transition-opacity"
                  aria-label="Profile"
                  type="button"
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  )}
                  <span className="sr-only">Profile</span>
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 bg-background border shadow-lg z-50" align="end">
                <div className="space-y-4">
                  <div className="flex flex-col gap-3">
                    <StudyStreak />
                    <UserPointsBadge userId={user.id} />
                    <NotificationBell />
                  </div>
                  
                  <div className="flex flex-col gap-2 pt-3 border-t">
                    <Link to="/profile" className="w-full">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                    </Link>
                    
                    {isAdmin && (
                      <Link to="/admin" className="w-full">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <ShieldCheck className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Button>
                      </Link>
                    )}
                    
                    <Link to="/upload" className="w-full">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                    </Link>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleSignOut}
                      className="w-full justify-start"
                      aria-label="Sign out"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <Link to="/auth" aria-label="Sign in to your account">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;