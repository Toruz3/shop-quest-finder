
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
      <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">Modifica profilo</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Modifica le informazioni del tuo account
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-900 dark:text-gray-100">Nome</Label>
            <Input 
              id="name" 
              value={newName} 
              onChange={e => setNewName(e.target.value)} 
              placeholder="Il tuo nome" 
              className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-900 dark:text-gray-100">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={newEmail} 
              onChange={e => setNewEmail(e.target.value)} 
              placeholder="la-tua-email@esempio.com" 
              className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100" 
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
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
