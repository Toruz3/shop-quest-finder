import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, ShoppingCart } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="min-h-screen w-full flex flex-col justify-center items-center bg-background overflow-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background decorative elements */}
      <div className="absolute left-[-25%] top-[-15%] w-[55vw] h-[55vw] bg-primary/10 rounded-full filter blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute right-[-15%] bottom-[-15%] w-[65vw] h-[65vw] bg-accent/10 rounded-full filter blur-2xl opacity-40 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center px-6 py-8 w-full max-w-lg">
        {/* Welcome Image - Using a decorative illustration */}
        <motion.div
          className="mb-8 w-64 h-64 relative"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent flex items-center justify-center">
            <ShoppingCart className="w-24 h-24 text-primary/40" />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div 
          className="text-center space-y-4 mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-foreground">
            Shop Quest
          </h1>
          <p className="text-lg text-muted-foreground max-w-md">
            La tua spesa intelligente. Confronta i prezzi, crea la lista e risparmia tempo e denaro.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="w-full space-y-3 px-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Button
            className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all duration-200 hover:scale-[1.02]"
            onClick={() => navigate("/auth")}
          >
            <LogIn className="mr-2 h-5 w-5" />
            Accedi
          </Button>
          
          <Button
            variant="outline"
            className="w-full h-12 text-base font-semibold border-2 border-primary text-primary hover:bg-primary/5 hover:text-primary transition-all duration-200 hover:scale-[1.02]"
            onClick={() => navigate("/auth", { state: { tab: "register" } })}
          >
            <UserPlus className="mr-2 h-5 w-5" />
            Registrati
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Welcome;
