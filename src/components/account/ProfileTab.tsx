
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
      <Card className="border border-border bg-card overflow-hidden">
        <div className="section-header">
          <h3 className="font-medium flex items-center gap-2 text-foreground p-4 text-left">
            <User size={16} className="text-primary" />
            Gestione Account
          </h3>
        </div>
        
        <div className="divide-y divide-border">
          <div className="menu-item">
            <div>
              <h4 className="text-sm font-medium text-left text-foreground">Modifica profilo</h4>
              <p className="text-xs text-muted-foreground">Nome, email, foto profilo</p>
            </div>
            <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-muted text-muted-foreground" onClick={onEditProfile}>
              <Settings size={16} />
            </Button>
          </div>
          
          <div className="menu-item">
            <div>
              <h4 className="text-sm font-medium text-left text-foreground">Sicurezza</h4>
              <p className="text-xs text-muted-foreground">Password, autenticazione</p>
            </div>
            <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-muted text-muted-foreground" onClick={onChangePassword}>
              <Lock size={16} />
            </Button>
          </div>
          
          <div className="menu-item">
            <div>
              <h4 className="text-sm font-medium text-left text-foreground">Dispositivi collegati</h4>
              <p className="text-xs text-muted-foreground text-left">Gestisci accessi</p>
            </div>
            <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-muted text-muted-foreground">
              <Smartphone size={16} />
            </Button>
          </div>
          
          <div className="menu-item">
            <div>
              <h4 className="text-sm font-medium text-left text-foreground">Metodi di pagamento</h4>
              <p className="text-xs text-muted-foreground text-left">Carte e fatturazione</p>
            </div>
            <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-muted text-muted-foreground">
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
      
      <Card className="border border-border bg-card overflow-hidden">
        <div className="section-header">
          <h3 className="font-medium flex items-center gap-2 text-foreground p-4">
            <HelpCircle size={16} className="text-primary" />
            Supporto
          </h3>
        </div>
        
        <div className="divide-y divide-border">
          <div className="flex items-center justify-between p-4 hover:bg-muted/60 transition-colors duration-200">
            <div>
              <h4 className="text-sm font-medium text-foreground">Centro assistenza</h4>
              <p className="text-xs text-muted-foreground text-left">Domande frequenti</p>
            </div>
            <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-muted text-muted-foreground">
              <Settings size={16} />
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 hover:bg-muted/60 transition-colors duration-200">
            <div>
              <h4 className="text-sm font-medium text-left text-foreground">Contattaci</h4>
              <p className="text-xs text-muted-foreground text-left">Email, telefono</p>
            </div>
            <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-muted text-muted-foreground">
              <Settings size={16} />
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 hover:bg-muted/60 transition-colors duration-200">
            <div>
              <h4 className="text-sm font-medium text-left text-foreground">Privacy e Termini</h4>
              <p className="text-xs text-muted-foreground text-left">Informative legali</p>
            </div>
            <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-muted text-muted-foreground">
              <Settings size={16} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
