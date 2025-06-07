
import { Map, LineChart, Star, User, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

interface FooterProps {
  isCalculating?: boolean;
  productsCount?: number;
}

export const Footer = ({ isCalculating = false, productsCount = 0 }: FooterProps) => {
  const location = useLocation();
  const { user } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { 
      path: "/app", 
      icon: <ShoppingCart className="w-7 h-7" />, 
      label: "Spesa",
      badge: productsCount > 0 ? productsCount : null
    },
    { 
      path: "/map", 
      icon: <Map className="w-7 h-7" />, 
      label: "Mappa",
      badge: null
    },
    { 
      path: "/price-history", 
      icon: <LineChart className="w-7 h-7" />, 
      label: "Prezzi",
      badge: null
    },
    { 
      path: "/favorites", 
      icon: <Star className="w-7 h-7" />, 
      label: "Preferiti",
      badge: null,
      value: "saved"
    },
    { 
      path: "/account", 
      icon: <User className="w-7 h-7" />, 
      label: "Account",
      badge: null,
      value: "account"
    },
  ];

  return (
    <motion.div 
      className={`fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg z-50 transition-all duration-300 safe-bottom footer-fixed ${isCalculating ? 'opacity-30 pointer-events-none' : ''}`}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      layoutId="footer"
      layout
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto max-w-md px-0">
        <div className="grid grid-cols-5 items-center h-16">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`flex flex-col items-center justify-center gap-1 text-xs py-1 ${
                isActive(item.path) 
                  ? 'text-green-500 font-medium' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
              } transition-colors duration-200 relative active-scale touch-target ripple`}
            >
              <motion.div 
                className={`p-1.5 rounded-full ${
                  isActive(item.path) 
                    ? 'bg-green-500/10 text-green-500' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                } transition-colors duration-200 relative`}
                layoutId={`icon-bg-${item.path}`}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {item.icon}
                {item.badge && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 min-w-5 p-0 flex items-center justify-center text-xs bg-destructive text-destructive-foreground font-medium"
                  >
                    {item.badge}
                  </Badge>
                )}
                <AnimatePresence>
                  {isActive(item.path) && !item.badge && (
                    <motion.span 
                      className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      layoutId={`active-dot-${item.path}`}
                      transition={{ duration: 0.2 }}
                    ></motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
              <motion.span 
                className="text-center font-medium"
                layoutId={`label-${item.path}`}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {item.label}
              </motion.span>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
