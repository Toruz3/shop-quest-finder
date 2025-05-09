
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "./hooks/use-theme";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AnimatePresence } from "framer-motion";
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
import ShoppingPage from "./pages/ShoppingPage";

// Create a new QueryClient instance inside the component to ensure it's properly scoped
const App = () => {
  // Create a new QueryClient instance
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ThemeProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner position="bottom-center" className="bottom-toast" toastOptions={{ duration: 3000 }} />
              <div className="app-container">
                <AppRoutes />
              </div>
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </QueryClientProvider>
  );
};

const authenticatedRoutes = [
  "/app",
  "/stores",
  "/map",
  "/price-history",
  "/favorites",
  "/account"
];

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  
  if (isLoading) return null; // loading
  if (!user) return <Navigate to="/auth" state={{ from: location }} replace />;
  return <>{children}</>;
}

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
              <ShoppingPage />
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
      {isAuthenticatedPage && !isAuthPage && <Footer />}
    </>
  );
};

export default App;
