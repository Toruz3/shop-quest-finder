
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./hooks/use-theme";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import StoresPage from "./pages/StoresPage";
import MapPage from "./pages/MapPage";
import PriceHistoryPage from "./pages/PriceHistoryPage";
import FavoritesPage from "./pages/FavoritesPage";
import AccountPage from "./pages/AccountPage";
import Welcome from "./pages/Welcome";
import { Footer } from "./components/Footer";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

const authenticatedRoutes = [
  "/app",
  "/stores",
  "/map",
  "/price-history",
  "/favorites",
  "/account"
];

const AppRoutes = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/auth";
  const isAuthenticatedPage = authenticatedRoutes.some(path => location.pathname.startsWith(path));

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Welcome />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/app" element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          } />
          <Route path="/stores" element={
            <ProtectedRoute>
              <StoresPage />
            </ProtectedRoute>
          } />
          <Route path="/map" element={
            <ProtectedRoute>
              <MapPage />
            </ProtectedRoute>
          } />
          <Route path="/price-history" element={
            <ProtectedRoute>
              <PriceHistoryPage />
            </ProtectedRoute>
          } />
          <Route path="/favorites" element={
            <ProtectedRoute>
              <FavoritesPage />
            </ProtectedRoute>
          } />
          <Route path="/account" element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      {/* Mostra la footer solo nelle pagine autenticate */}
      {isAuthenticatedPage && !isAuthPage && <Footer />}
    </>
  );
};

// Componente per proteggere le route
import { useAuth } from "./contexts/AuthContext";
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) return null; // loading
  if (!user) return <Navigate to="/auth" state={{ from: location }} replace />;
  return <>{children}</>;
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner position="bottom-center" className="bottom-toast" toastOptions={{ duration: 3000 }} />
            <BrowserRouter>
              <div className="app-container">
                <AppRoutes />
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
