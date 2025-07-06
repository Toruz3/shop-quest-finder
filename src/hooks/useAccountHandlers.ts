import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/hooks/use-theme";

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
  const { logout } = useAuth();
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
  
  const handleSaveProfile = () => {
    if (!newName.trim()) {
      toast({
        variant: "destructive",
        title: "Nome richiesto",
        description: "Il nome non può essere vuoto"
      });
      return;
    }
    setProfileName(newName);
    setProfileEmail(newEmail);
    toast({
      title: "Profilo aggiornato",
      description: "Le modifiche al profilo sono state salvate"
    });
    setShowProfileDialog(false);
  };
  
  const handleChangePassword = () => {
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
    toast({
      title: "Password aggiornata",
      description: "La tua password è stata modificata con successo"
    });
    setShowPasswordDialog(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
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