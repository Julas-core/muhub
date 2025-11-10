import { useEffect, useState, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import AnalyticsWrapper from "./components/AnalyticsWrapper";
import CookieConsent from "./components/CookieConsent";
import { Footer } from "./components/Footer";
import Header from "./components/Header";
import { supabase } from "@/integrations/supabase/client";
import MuslimNameDetectionWrapper from "./components/MuslimNameDetectionWrapper";
import { useAuth } from '@/hooks/useAuth';
import FirstTimeUploadModal from './components/FirstTimeUploadModal';
import { ThemeProvider } from "./components/ThemeProvider";
import { Breadcrumbs } from "./components/Breadcrumbs";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Upload from "./pages/Upload";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import Profile from "./pages/Profile";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import AdminDashboard from "./pages/AdminDashboard";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import StudyGroups from "./pages/StudyGroups";
import MaterialDetail from "./pages/MaterialDetail";
import Leaderboard from "./pages/Leaderboard";
import ExamPrep from "./pages/ExamPrep";
import Forum from "./pages/Forum";
import ForumQuestion from "./pages/ForumQuestion";
import AIAssistant from "./pages/AIAssistant";
import Notes from "./pages/Notes";
import UploaderMaterials from "./pages/UploaderMaterials";

const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));

const queryClient = new QueryClient();

declare global {
  interface Window {
    dataLayer: any[];
    gtag: any;
  }
}

function App() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [showFirstUploadModal, setShowFirstUploadModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Show first-time upload modal once per user after sign-in
    const key = user ? `mu_first_upload_shown:${user.id}` : null;
    if (user && key && !localStorage.getItem(key)) {
      setShowFirstUploadModal(true);
    }
    // If user signed out, hide modal
    if (!user) setShowFirstUploadModal(false);
  }, [user]);

  const handleCloseFirstUpload = () => {
    if (user) localStorage.setItem(`mu_first_upload_shown:${user.id}`, '1');
    setShowFirstUploadModal(false);
  };

  const handleUploadFromModal = () => {
    if (user) localStorage.setItem(`mu_first_upload_shown:${user.id}`, '1');
    setShowFirstUploadModal(false);
  };

  useEffect(() => {
    const fetchUserAvatar = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('avatar_url, updated_at')
          .eq('id', user.id)
          .single();
        
        if (data?.avatar_url) {
          const version = data.updated_at ? new Date(data.updated_at as string).getTime() : Date.now();
          setAvatarUrl(`${data.avatar_url}?u=${user.id}&v=${version}`);
        } else {
          setAvatarUrl(null);
        }
      } else {
        setAvatarUrl(null);
      }
    };

    fetchUserAvatar();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchUserAvatar();
    });

    const onProfileUpdated = (e: any) => {
      const avatar = e?.detail?.avatarUrl ?? null;
      if (avatar) setAvatarUrl(avatar);
      else setAvatarUrl(null);
    };

    window.addEventListener('profile-updated', onProfileUpdated as EventListener);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('profile-updated', onProfileUpdated as EventListener);
    };
  }, []);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ErrorBoundary>
                <AnalyticsWrapper>
                  <div className="flex flex-col min-h-screen">
                    <Header avatarUrl={avatarUrl} />
                    <Breadcrumbs />
                    <main className="flex-grow">
                      <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/verify-email" element={<EmailVerificationPage />} />
                      <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/help" element={<Help />} />
                      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                      <Route path="/terms" element={<Terms />} />
                       <Route path="/privacy" element={<Privacy />} />
                       <Route path="/disclaimer" element={<Suspense fallback={<div>Loading...</div>}><Disclaimer /></Suspense>} />
                       <Route path="/cookie-policy" element={<Suspense fallback={<div>Loading...</div>}><CookiePolicy /></Suspense>} />
                       <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                      <Route path="/study-groups" element={<ProtectedRoute><StudyGroups /></ProtectedRoute>} />
                      <Route path="/material/:id" element={<MaterialDetail />} />
                      <Route path="/leaderboard" element={<Leaderboard />} />
                      <Route path="/exam-prep" element={<ProtectedRoute><ExamPrep /></ProtectedRoute>} />
                      <Route path="/forum" element={<Forum />} />
                       <Route path="/forum/:id" element={<ForumQuestion />} />
                       <Route path="/ai-assistant" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />
                       <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
                       <Route path="/uploader/:userId" element={<UploaderMaterials />} />
                       <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                  <CookieConsent />
                  <MuslimNameDetectionWrapper />
                  <FirstTimeUploadModal
                    open={showFirstUploadModal}
                    onClose={handleCloseFirstUpload}
                    onUpload={handleUploadFromModal}
                  />
                </div>
              </AnalyticsWrapper>
            </ErrorBoundary>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
