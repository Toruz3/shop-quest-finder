
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FabAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface FabMenuProps {
  actions: FabAction[];
}

export const FabMenu = ({ actions }: FabMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed right-4 bottom-24 z-50 flex flex-col-reverse items-end gap-2">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-16 right-0 mb-2 flex flex-col gap-2 items-end max-h-[60vh] overflow-y-auto custom-scrollbar"
          >
            {actions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, x: 20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: 20, x: 20 }}
                transition={{ 
                  delay: 0.05 * (actions.length - index - 1),
                  type: "spring", 
                  stiffness: 400, 
                  damping: 20 
                }}
                className="flex items-center gap-2"
              >
                <div className="shadow-md bg-white text-neutral-700 px-3 py-1.5 rounded-lg text-sm">
                  {action.label}
                </div>
                <button
                  onClick={() => {
                    action.onClick();
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-white shadow-lg hover:bg-accent-600 transition-colors"
                >
                  {action.icon}
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleMenu}
        className={`flex items-center justify-center w-14 h-14 rounded-full ${
          isOpen ? "bg-neutral-700" : "bg-primary"
        } text-white shadow-lg hover:shadow-xl transition-all duration-300`}
        style={{
          boxShadow: isOpen ? 
            '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : 
            '0 10px 25px -5px rgba(46, 204, 113, 0.3), 0 10px 10px -5px rgba(46, 204, 113, 0.2)'
        }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 225 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
        </motion.div>
      </button>
    </div>
  );
};
