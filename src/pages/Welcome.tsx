import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, ChevronRight } from "lucide-react";

// usa una delle immagini placeholder dal contesto
const WELCOME_IMAGE = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80";
const Welcome = () => {
  const navigate = useNavigate();
  return <motion.div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-tr from-primary-50 via-primary-200 to-accent-100 overflow-hidden relative" initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    duration: 0.5
  }}>
      {/* Overlay gradient circles for depth */}
      <div className="absolute left-[-25%] top-[-15%] w-[55vw] h-[55vw] bg-primary/10 rounded-full filter blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute right-[-15%] bottom-[-15%] w-[65vw] h-[65vw] bg-accent/10 rounded-full filter blur-2xl opacity-40 pointer-events-none" />

      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center md:items-start gap-6 md:gap-16 px-4 pt-10 pb-6 md:py-16 w-full max-w-5xl">
        {/* Text section */}
        <motion.div className="flex-1 flex flex-col items-center md:items-start" initial={{
        x: -30,
        opacity: 0
      }} animate={{
        x: 0,
        opacity: 1
      }} transition={{
        delay: 0.2,
        duration: 0.6,
        type: "spring"
      }}>
          <h1 className="text-4xl md:text-5xl font-bold font-[system-ui] tracking-tight text-primary drop-shadow mb-3 text-center md:text-left">
            Shop Quest
          </h1>
          <p className="text-lg md:text-xl text-neutral-700 mb-7 text-center md:text-left max-w-xl md:max-w-md font-medium">
            Benvenuto!
            <br />
            Trova il miglior supermercato per la tua spesa,
            gestisci la lista prodotti e risparmia tempo e denaro, <span className="text-primary font-semibold">in pochi click</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center">
            <Button className="px-10 py-4 btn-primary rounded-lg font-bold text-lg shadow-lg transition hover:scale-[1.04] hover:bg-primary/90 w-full sm:w-auto" size="lg" onClick={() => navigate("/auth")}>
              <LogIn className="mr-2 w-5 h-5" /> Accedi
            </Button>
            <Button className="px-10 py-4 rounded-lg font-bold text-lg shadow-lg bg-accent text-white hover:brightness-105 hover:scale-[1.03] w-full sm:w-auto" size="lg" variant="secondary" onClick={() => navigate("/auth", {
            state: {
              tab: "register"
            }
          })}>
              <UserPlus className="mr-2 w-5 h-5" /> Registrati
            </Button>
          </div>
        </motion.div>
        {/* Immagine laterale (visual, mobile sopra) */}
        <motion.div className="flex-shrink-0 mb-7 md:mb-0" initial={{
        x: 40,
        opacity: 0
      }} animate={{
        x: 0,
        opacity: 1
      }} transition={{
        delay: 0.4,
        duration: 0.7,
        type: "spring"
      }}>
          <img src={WELCOME_IMAGE} alt="Benvenuto Shop Quest" className="rounded-2xl shadow-card w-[320px] h-[220px] object-cover border-4 border-primary-100 bg-neutral-100 animate-fade-in" width={320} height={220} loading="lazy" draggable={false} />
        </motion.div>
      </div>
      {/* Chevrons/Page hint per mobile */}
      
    </motion.div>;
};
export default Welcome;