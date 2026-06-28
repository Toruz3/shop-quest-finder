
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Settings, ShoppingBag, Heart, MapPin } from "lucide-react";

interface PreferencesTabProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
}

export const PreferencesTab = ({ 
  isDarkMode, 
  onThemeToggle, 
  notificationsEnabled, 
  onToggleNotifications 
}: PreferencesTabProps) => {
  return (
    <div className="space-y-4">
      <Card className="border border-border bg-card overflow-hidden">
        <div className="section-header">
          <h3 className="font-medium flex items-center gap-2 text-foreground p-4">
            <Settings size={16} className="text-primary" />
            Preferenze App
          </h3>
        </div>
        
        <div className="divide-y divide-border">
          <div className="flex items-center justify-between p-4 hover:bg-muted/60 transition-colors duration-200">
            <div className="flex flex-col flex-1 mr-3">
              <h4 className="text-sm font-medium text-foreground text-left">Tema scuro</h4>
              <p className="text-xs text-muted-foreground text-left">Cambia l'aspetto dell'app</p>
            </div>
            <div className="flex-shrink-0">
              <Switch checked={isDarkMode} onCheckedChange={onThemeToggle} className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-gray-600" />
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 hover:bg-muted/60 transition-colors duration-200">
            <div className="flex flex-col flex-1 mr-3">
              <h4 className="text-sm font-medium text-foreground text-left">Notifiche</h4>
              <p className="text-xs text-muted-foreground text-left">Gestisci avvisi e promemoria</p>
            </div>
            <div className="flex-shrink-0">
              <Switch checked={notificationsEnabled} onCheckedChange={onToggleNotifications} className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-gray-600" />
            </div>
          </div>
          
          <div className="menu-item">
            <div>
              <h4 className="text-sm font-medium text-foreground text-left">Lingua</h4>
              <p className="text-xs text-muted-foreground text-left">Italiano</p>
            </div>
            <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-muted text-muted-foreground">
              <Settings size={16} />
            </Button>
          </div>
        </div>
      </Card>
      
      <Card className="border border-border bg-card overflow-hidden">
        <div className="section-header">
          <h3 className="font-medium flex items-center gap-2 text-foreground p-4">
            <ShoppingBag size={16} className="text-primary" />
            Preferenze Spesa
          </h3>
        </div>
        
        <div className="divide-y divide-border">
          <div className="menu-item">
            <div>
              <h4 className="text-sm font-medium text-left text-foreground">Supermercati preferiti</h4>
              <p className="text-xs text-muted-foreground text-left">Gestisci le tue preferenze</p>
            </div>
            <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-muted text-muted-foreground">
              <Heart size={16} />
            </Button>
          </div>
          
          <div className="menu-item">
            <div>
              <h4 className="text-sm font-medium text-foreground">Raggio di ricerca</h4>
              <p className="text-xs text-muted-foreground text-left">5km</p>
            </div>
            <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-muted text-muted-foreground">
              <MapPin size={16} />
            </Button>
          </div>
          
          <div className="menu-item">
            <div>
              <h4 className="text-sm font-medium text-left text-foreground">Categorie nascoste</h4>
              <p className="text-xs text-muted-foreground">Nascondi categorie non utilizzate</p>
            </div>
            <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-muted text-muted-foreground">
              <Settings size={16} />
            </Button>
          </div>
          
          <div className="menu-item">
            <div>
              <h4 className="text-sm font-medium text-foreground">Dieta e preferenze alimentari</h4>
              <p className="text-xs text-muted-foreground text-left">Filtri per prodotti</p>
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
