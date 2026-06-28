import { Map, LineChart, Star, User, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

interface FooterProps {
  isCalculating?: boolean;
  productsCount?: number;
}

export const Footer = ({ isCalculating = false, productsCount = 0 }: FooterProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/app", icon: ShoppingCart, label: "Spesa", badge: productsCount > 0 ? productsCount : null },
    { path: "/map", icon: Map, label: "Mappa" },
    { path: "/price-history", icon: LineChart, label: "Prezzi" },
    { path: "/favorites", icon: Star, label: "Preferiti" },
    { path: "/account", icon: User, label: "Account" },
  ];

  return (
    <motion.nav
      className={`fixed bottom-0 left-0 right-0 bg-background/85 backdrop-blur-md border-t border-border z-50 safe-bottom footer-fixed transition-opacity ${
        isCalculating ? "opacity-30 pointer-events-none" : ""
      }`}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
    >
      <div className="container mx-auto max-w-md px-2">
        <ul className="grid grid-cols-5 h-14 items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <li key={item.path} className="flex justify-center">
                <Link
                  to={item.path}
                  className={`relative flex flex-col items-center gap-0.5 px-2 py-1 transition-colors ${
                    active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <div className="relative">
                    <Icon
                      className="w-5 h-5"
                      strokeWidth={active ? 2 : 1.5}
                    />
                    {item.badge && (
                      <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-medium flex items-center justify-center num-tabular">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] tracking-wide">{item.label}</span>
                  {active && (
                    <motion.span
                      layoutId="nav-active-bar"
                      className="absolute -top-px h-0.5 w-8 bg-primary rounded-full"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
};
