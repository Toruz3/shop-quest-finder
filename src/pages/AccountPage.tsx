
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/hooks/use-theme";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Footer } from "@/components/Footer";
import { ProfileCard } from "@/components/account/ProfileCard";
import { ProfileTab } from "@/components/account/ProfileTab";
import { PreferencesTab } from "@/components/account/PreferencesTab";
import { ActivityTab } from "@/components/account/ActivityTab";
import { ProfileDialog } from "@/components/account/ProfileDialog";
import { PasswordDialog } from "@/components/account/PasswordDialog";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [profileName, setProfileName] = useState(profile?.name || "Mario Rossi");
  const [profileEmail, setProfileEmail] = useState(user?.email || "mario.rossi@email.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  useEffect(() => {
    if (profile) {
      setProfileName(profile.name);
    }
    if (user) {
      setProfileEmail(user.email);
    }
  }, [user, profile]);
  
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
  
  if (!user) {
    navigate("/auth");
    return null;
  }
  
  return (
    <div className="h-screen flex flex-col">
      {/* Single Card Container */}
      <div className="flex-1 bg-card m-0.5 rounded-xl overflow-hidden">
        {/* Header Section */}
        <div className="p-4 pb-2">
          <ProfileCard profileName={profileName} profileEmail={profileEmail} />
        </div>

        {/* Scrollable Content Area with Tabs */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-2 pb-4" style={{ scrollBehavior: 'smooth' }}>
          <div className="w-full">
            <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
              {/* Tab Navigation */}
              <TabsList className="w-full grid grid-cols-3 h-12 rounded-lg p-1 bg-gray-100 dark:bg-gray-800 mb-4">
                <TabsTrigger value="profile" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100 text-gray-600 dark:text-gray-300 data-[state=active]:shadow-sm transition-all duration-200">
                  Profilo
                </TabsTrigger>
                <TabsTrigger value="preferences" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100 text-gray-600 dark:text-gray-300 data-[state=active]:shadow-sm transition-all duration-200">
                  Preferenze
                </TabsTrigger>
                <TabsTrigger value="activity" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100 text-gray-600 dark:text-gray-300 data-[state=active]:shadow-sm transition-all duration-200">
                  Attività
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-0 space-y-4">
                <ProfileTab 
                  onEditProfile={handleEditProfile}
                  onChangePassword={() => setShowPasswordDialog(true)}
                  onLogout={handleLogout}
                />
              </TabsContent>
              
              <TabsContent value="preferences" className="mt-0 space-y-4">
                <PreferencesTab 
                  isDarkMode={isDarkMode}
                  onThemeToggle={handleThemeToggle}
                  notificationsEnabled={notificationsEnabled}
                  onToggleNotifications={toggleNotifications}
                />
              </TabsContent>
              
              <TabsContent value="activity" className="mt-0 space-y-4">
                <ActivityTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <ProfileDialog 
        open={showProfileDialog}
        onOpenChange={setShowProfileDialog}
        newName={newName}
        setNewName={setNewName}
        newEmail={newEmail}
        setNewEmail={setNewEmail}
        onSave={handleSaveProfile}
      />

      <PasswordDialog 
        open={showPasswordDialog}
        onOpenChange={setShowPasswordDialog}
        currentPassword={currentPassword}
        setCurrentPassword={setCurrentPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        onSave={handleChangePassword}
      />

      <Footer />
    </div>
  );
};

export default AccountPage;
