
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export const useFavoritesToast = () => {
  const [activeToasts, setActiveToasts] = useState<Set<string>>(new Set());

  const showToast = (toastKey: string, toastConfig: any) => {
    if (activeToasts.has(toastKey)) return;
    
    setActiveToasts(prev => new Set(prev).add(toastKey));
    
    const { dismiss } = toast(toastConfig);
    
    setTimeout(() => {
      setActiveToasts(prev => {
        const newSet = new Set(prev);
        newSet.delete(toastKey);
        return newSet;
      });
    }, 1500);
    
    return dismiss;
  };

  return { showToast };
};
