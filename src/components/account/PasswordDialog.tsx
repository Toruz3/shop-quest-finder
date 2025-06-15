
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
      <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">Cambio password</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Crea una nuova password per il tuo account
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="current-password" className="text-gray-900 dark:text-gray-100">Password attuale</Label>
            <Input 
              id="current-password" 
              type="password" 
              value={currentPassword} 
              onChange={e => setCurrentPassword(e.target.value)} 
              className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-gray-900 dark:text-gray-100">Nuova password</Label>
            <Input 
              id="new-password" 
              type="password" 
              value={newPassword} 
              onChange={e => setNewPassword(e.target.value)} 
              className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-gray-900 dark:text-gray-100">Conferma password</Label>
            <Input 
              id="confirm-password" 
              type="password" 
              value={confirmPassword} 
              onChange={e => setConfirmPassword(e.target.value)} 
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
            <Check size={16} className="mr-1" />
            Cambia password
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
