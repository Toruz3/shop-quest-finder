
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Save } from "lucide-react";

interface ListManagementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  listName: string;
  setListName: (name: string) => void;
  onSave: () => void;
  isEditing: boolean;
}

export const ListManagementDialog = ({
  isOpen,
  onClose,
  listName,
  setListName,
  onSave,
  isEditing
}: ListManagementDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!w-[calc(100vw-2rem)] !max-w-[calc(100vw-2rem)] sm:!max-w-[425px] !left-1/2 !top-1/2 !transform !-translate-x-1/2 !-translate-y-1/2 bg-card border-border rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {isEditing ? "Modifica lista" : "Crea nuova lista"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {isEditing ? "Modifica il nome della tua lista preferita" : "Crea una nuova lista dei tuoi prodotti preferiti"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Input 
            value={listName} 
            onChange={e => setListName(e.target.value)} 
            placeholder="Nome lista" 
            className="w-full bg-card border-border text-foreground rounded-xl" 
            autoFocus 
          />
        </div>
        
        <DialogFooter className="flex justify-between sm:justify-between gap-2">
          <Button variant="outline" onClick={onClose} className="bg-card border-border text-foreground rounded-xl">
            <X size={16} className="mr-1" />
            Annulla
          </Button>
          <Button onClick={onSave} className="rounded-xl">
            <Save size={16} className="mr-1" />
            {isEditing ? "Aggiorna" : "Crea"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
