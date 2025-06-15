import { ShoppingCart, Sparkles } from "lucide-react";
export const ShoppingHeader = () => {
  return <>
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="flex items-center justify-center">
          <ShoppingCart className="w-6 h-6 text-primary mr-2" />
          <h2 className="text-xl font-bold text-black">
            Shop Quest
          </h2>
          <Sparkles className="w-5 h-5 text-notification ml-2" />
        </div>
      </div>
      
      <div className="text-sm text-neutral-600 text-center mb-6">
        Trova il miglior supermercato per la tua spesa
      </div>
    </>;
};