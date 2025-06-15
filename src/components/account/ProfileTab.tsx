
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Settings, Lock, Smartphone, CreditCard, HelpCircle, LogOut } from "lucide-react";

interface ProfileTabProps {
  onEditProfile: () => void;
  onChangePassword: () => void;
  onLogout: () => void;
}

export const ProfileTab = ({ onEditProfile, onChangePassword, onLogout }: ProfileTabProps) => {
  return (
    <div className="space-y-4">
      <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
        <div className="section-header">
          <h3 className="font-medium flex items-center gap-2 text-gray-900 dark:text-gray-100 p-4 text-left">
            <User size={16} className="text-primary" />
            Gestione Account
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="menu-item">
            <div>
              <h4 className="text-sm font-medium text-left text-gray-900 dark:text-gray-100">Modifica profilo</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Nome, email, foto profilo</p>
            </div>
            <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300" onClick={onEditProfile}>
              <Settings size={16} />
            </Button>
          </div>
          
          <div className="menu-item">
            <div>
              <h4 className="text-sm font-medium text-left text-gray-900 dark:text-gray-100">Sicurezza</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Password, autenticazione</p>
            </div>
            <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300" onClick={onChangePassword}>
              <Lock size={16} />
            </Button>
          </div>
          
          <div className="menu-item">
            <div>
              <h4 className="text-sm font-medium text-left text-gray-900 dark:text-gray-100">Dispositivi collegati</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 text-left">Gestisci accessi</p>
            </div>
            <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
              <Smartphone size={16} />
            </Button>
          </div>
          
          <div className="menu-item">
            <div>
              <h4 className="text-sm font-medium text-left text-gray-900 dark:text-gray-100">Metodi di pagamento</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 text-left">Carte e fatturazione</p>
            </div>
            <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
              <CreditCard size={16} />
            </Button>
          </div>
          
          <div className="menu-item">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium text-destructive">Esci</h4>
            </div>
            <Button size="sm" variant="ghost" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={onLogout}>
              <LogOut size={16} />
            </Button>
          </div>
        </div>
      </Card>
      
      <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
        <div className="section-header">
          <h3 className="font-medium flex items-center gap-2 text-gray-900 dark:text-gray-100 p-4">
            <HelpCircle size={16} className="text-primary" />
            Supporto
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Centro assistenza</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 text-left">Domande frequenti</p>
            </div>
            <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400">
              <Settings size={16} />
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
            <div>
              <h4 className="text-sm font-medium text-left text-gray-900 dark:text-gray-100">Contattaci</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 text-left">Email, telefono</p>
            </div>
            <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400">
              <Settings size={16} />
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
            <div>
              <h4 className="text-sm font-medium text-left text-gray-900 dark:text-gray-100">Privacy e Termini</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 text-left">Informative legali</p>
            </div>
            <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400">
              <Settings size={16} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
