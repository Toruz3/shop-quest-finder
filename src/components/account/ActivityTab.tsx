
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { History, Share2, Smartphone } from "lucide-react";

export const ActivityTab = () => {
  return (
    <div className="space-y-4">
      <Card className="border border-border bg-card overflow-hidden">
        <div className="section-header">
          <h3 className="font-medium flex items-center gap-2 text-foreground p-4">
            <History size={16} className="text-primary" />
            Attività Recente
          </h3>
        </div>
        
        <div className="divide-y divide-border">
          <div className="p-3 hover:bg-muted/60 transition-colors duration-200">
            <div className="flex justify-between mb-1">
              <h4 className="text-sm font-medium text-left text-foreground">Spesa completata</h4>
              <span className="text-xs text-muted-foreground">2 giorni fa</span>
            </div>
            <p className="text-xs text-muted-foreground text-left">Esselunga • 12 prodotti • €42,75</p>
          </div>
          
          <div className="p-3 hover:bg-muted/60 transition-colors duration-200">
            <div className="flex justify-between mb-1">
              <h4 className="text-sm font-medium text-foreground">Lista salvata</h4>
              <span className="text-xs text-muted-foreground">5 giorni fa</span>
            </div>
            <p className="text-xs text-muted-foreground text-left">Lista "Cena speciale" • 8 prodotti</p>
          </div>
          
          <div className="p-3 hover:bg-muted/60 transition-colors duration-200">
            <div className="flex justify-between mb-1">
              <h4 className="text-sm font-medium text-foreground">Prodotto aggiunto ai preferiti</h4>
              <span className="text-xs text-muted-foreground">1 settimana fa</span>
            </div>
            <p className="text-xs text-muted-foreground text-left">Parmigiano Reggiano • €4,99</p>
          </div>
        </div>
        
        <div className="p-3 border-t border-border bg-muted/40/50">
          <Button variant="ghost" size="sm" className="w-full text-muted-foreground hover:bg-muted">
            Vedi tutte le attività
          </Button>
        </div>
      </Card>
      
      <Card className="border border-border bg-card overflow-hidden">
        <div className="section-header">
          <h3 className="font-medium flex items-center gap-2 text-foreground p-4">
            <Share2 size={16} className="text-primary" />
            Sincronizzazione
          </h3>
        </div>
        
        <div className="p-3">
          <h4 className="text-sm font-medium mb-2 text-foreground">Dispositivi sincronizzati</h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-muted/40 rounded-md">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Smartphone size={14} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">iPhone 12</p>
                  <p className="text-xs text-muted-foreground">iOS 16 • Ultimo accesso: oggi</p>
                </div>
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/20">Attuale</Badge>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-muted/40 rounded-md">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                  <Smartphone size={14} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">MacBook Air</p>
                  <p className="text-xs text-muted-foreground">Chrome • Ultimo accesso: ieri</p>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-3 bg-gray-200 dark:bg-gray-700" />
          
          <Button variant="outline" size="sm" className="w-full border-gray-200 dark:border-gray-600 text-foreground hover:bg-muted/60">
            Gestisci sincronizzazione
          </Button>
        </div>
      </Card>
    </div>
  );
};
