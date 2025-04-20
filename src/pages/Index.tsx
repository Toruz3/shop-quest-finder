
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingList } from "@/components/ShoppingList";
import { useAuth } from "@/contexts/AuthContext";
import { Product } from "@/types/shopping";
import { motion } from "framer-motion";

const Index = () => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Se l'utente è autenticato e arriva su questa pagina senza flag, lo ridirezioniamo alla welcome solo al primo ingresso
    if (user && location.state?.fromWelcome !== true) {
      navigate("/welcome");
    }
  }, [user, navigate, location.state]);

  if (!user) {
    navigate("/auth");
    return null;
  }

  const handleFindStores = (newProducts: Product[]) => {
    setProducts(newProducts);
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      navigate("/stores", { state: { products: newProducts } });
    }, 2000);
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center w-full overflow-hidden main-content bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full max-w-md mx-auto px-4 py-6 relative z-10 flex flex-col items-center justify-center flex-grow">
        <section className="w-full">
          <ShoppingList onFindStores={handleFindStores} isCalculating={isCalculating} />
        </section>
        {isCalculating && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl text-center animate-fade-in max-w-xs w-full">
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin absolute"></div>
                <div className="w-16 h-16 border-4 border-accent/30 border-b-transparent rounded-full animate-spin absolute" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Ricerca in corso</h3>
              <p className="text-base font-medium mb-2 text-neutral-700">Troviamo il miglior supermercato...</p>
              <div className="mt-4 w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary shimmer rounded-full" style={{width: '70%'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Index;
