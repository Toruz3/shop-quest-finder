
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Check } from "lucide-react";

interface PasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPassword: string;
  setCurrentPassword: (password: string) => void;
  newPassword: string;
  setNewPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  onSave: () => void;
}

export const PasswordDialog = ({
  open,
  onOpenChange,
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  onSave
}: PasswordDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Cambio password</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Crea una nuova password per il tuo account
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="current-password" className="text-foreground">Password attuale</Label>
            <Input 
              id="current-password" 
              type="password" 
              value={currentPassword} 
              onChange={e => setCurrentPassword(e.target.value)} 
              className="bg-card border-border text-foreground" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-foreground">Nuova password</Label>
            <Input 
              id="new-password" 
              type="password" 
              value={newPassword} 
              onChange={e => setNewPassword(e.target.value)} 
              className="bg-card border-border text-foreground" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-foreground">Conferma password</Label>
            <Input 
              id="confirm-password" 
              type="password" 
              value={confirmPassword} 
              onChange={e => setConfirmPassword(e.target.value)} 
              className="bg-card border-border text-foreground" 
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-border text-foreground">
            <X size={16} className="mr-1" />
            Annulla
          </Button>
          <Button onClick={onSave}>
            <Check size={16} className="mr-1" />
            Cambia password
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
