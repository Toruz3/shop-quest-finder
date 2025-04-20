
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Sparkles } from "lucide-react";

const Welcome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/");
  };

  // Se non autenticato, redirect login
  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <motion.div
      className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        background: "linear-gradient(135deg, #EEFBF1 0%, #B9EFC8 100%)",
      }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center px-4 py-12">
        <motion.div
          className="rounded-full bg-primary/10 p-4 mb-3"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ShoppingCart className="w-10 h-10 text-primary" />
        </motion.div>
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-primary mb-2 drop-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          Shop Quest <Sparkles className="inline-block text-notification w-7 h-7 mb-2 ml-1" />
        </motion.h1>
        <motion.p
          className="text-lg text-neutral-700 mb-8 text-center max-w-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
        >
          Benvenuto! Trova il miglior supermercato per la tua spesa, gestisci la lista prodotti e risparmia tempo e denaro.
        </motion.p>
        <Button
          className="px-10 py-4 btn-primary rounded-lg font-bold text-lg shadow-lg ripple"
          size="lg"
          onClick={handleStart}
        >
          Inizia ora
        </Button>
      </div>
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Un leggero overlay di sfondo a gradiente verde chiaro coerente con la palette */}
        <div className="absolute left-[-20%] top-[-10%] w-[60vw] h-[60vw] bg-primary/10 rounded-full filter blur-2xl opacity-50" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[70vw] h-[70vw] bg-accent/10 rounded-full filter blur-3xl opacity-60" />
      </div>
    </motion.div>
  );
};

export default Welcome;
