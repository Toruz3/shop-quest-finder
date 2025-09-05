import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/hooks/use-theme";
import { supabase } from "@/integrations/supabase/client";

interface UseAccountHandlersProps {
  isDarkMode: boolean;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (value: boolean) => void;
  setShowProfileDialog: (value: boolean) => void;
  setShowPasswordDialog: (value: boolean) => void;
  setNewName: (value: string) => void;
  setNewEmail: (value: string) => void;
  profileName: string;
  profileEmail: string;
  setProfileName: (value: string) => void;
  setProfileEmail: (value: string) => void;
  newName: string;
  newEmail: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  setCurrentPassword: (value: string) => void;
  setNewPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
}

export const useAccountHandlers = ({
  isDarkMode,
  notificationsEnabled,
  setNotificationsEnabled,
  setShowProfileDialog,
  setShowPasswordDialog,
  setNewName,
  setNewEmail,
  profileName,
  profileEmail,
  setProfileName,
  setProfileEmail,
  newName,
  newEmail,
  currentPassword,
  newPassword,
  confirmPassword,
  setCurrentPassword,
  setNewPassword,
  setConfirmPassword
}: UseAccountHandlersProps) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();
  
  const handleLogout = () => {
    logout();
    navigate("/auth");
    toast({
      title: "Logout effettuato",
      description: "Sei stato disconnesso con successo",
      duration: 3000
    });
  };
  
  const handleThemeToggle = () => {
    toggleTheme();
    toast({
      title: isDarkMode ? "Tema chiaro attivato" : "Tema scuro attivato",
      description: "Le impostazioni di visualizzazione sono state aggiornate",
      duration: 2000
    });
  };
  
  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    toast({
      title: notificationsEnabled ? "Notifiche disattivate" : "Notifiche attivate",
      description: "Le impostazioni di notifica sono state aggiornate",
      duration: 2000
    });
  };
  
  const handleEditProfile = () => {
    setNewName(profileName);
    setNewEmail(profileEmail);
    setShowProfileDialog(true);
  };
  
  const handleSaveProfile = async () => {
    if (!newName.trim()) {
      toast({
        variant: "destructive",
        title: "Nome richiesto",
        description: "Il nome non può essere vuoto"
      });
      return;
    }

    if (!user) {
      toast({
        variant: "destructive",
        title: "Errore di autenticazione",
        description: "Devi essere autenticato per aggiornare il profilo"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ name: newName.trim() })
        .eq("id", user.id);

      if (error) {
        throw error;
      }

      setProfileName(newName);
      setProfileEmail(newEmail);
      toast({
        title: "Profilo aggiornato",
        description: "Le modifiche al profilo sono state salvate"
      });
      setShowProfileDialog(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "Errore nell'aggiornamento",
        description: "Impossibile aggiornare il profilo. Riprova più tardi."
      });
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        variant: "destructive",
        title: "Campi obbligatori",
        description: "Compila tutti i campi per continuare"
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Le password non corrispondono",
        description: "La nuova password e la conferma devono essere identiche"
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        variant: "destructive",
        title: "Password troppo corta",
        description: "La password deve essere di almeno 6 caratteri"
      });
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ 
        password: newPassword 
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Password aggiornata",
        description: "La tua password è stata modificata con successo"
      });
      setShowPasswordDialog(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error("Error updating password:", error);
      toast({
        variant: "destructive",
        title: "Errore nell'aggiornamento",
        description: error.message || "Impossibile aggiornare la password. Riprova più tardi."
      });
    }
  };

  return {
    handleLogout,
    handleThemeToggle,
    toggleNotifications,
    handleEditProfile,
    handleSaveProfile,
    handleChangePassword
  };
};