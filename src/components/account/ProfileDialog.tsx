
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Save } from "lucide-react";

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newName: string;
  setNewName: (name: string) => void;
  newEmail: string;
  setNewEmail: (email: string) => void;
  onSave: () => void;
}

export const ProfileDialog = ({
  open,
  onOpenChange,
  newName,
  setNewName,
  newEmail,
  setNewEmail,
  onSave
}: ProfileDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Modifica profilo</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Modifica le informazioni del tuo account
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">Nome</Label>
            <Input 
              id="name" 
              value={newName} 
              onChange={e => setNewName(e.target.value)} 
              placeholder="Il tuo nome" 
              className="bg-card border-gray-200 dark:border-gray-600 text-foreground" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={newEmail} 
              onChange={e => setNewEmail(e.target.value)} 
              placeholder="la-tua-email@esempio.com" 
              className="bg-card border-gray-200 dark:border-gray-600 text-foreground" 
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-gray-200 dark:border-gray-600 text-foreground">
            <X size={16} className="mr-1" />
            Annulla
          </Button>
          <Button onClick={onSave}>
            <Save size={16} className="mr-1" />
            Salva modifiche
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
