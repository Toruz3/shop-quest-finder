import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/hooks/use-theme";

export const useAccountState = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user, profile } = useAuth();
  const { isDarkMode } = useTheme();
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

  return {
    activeTab,
    setActiveTab,
    user,
    profile,
    isDarkMode,
    notificationsEnabled,
    setNotificationsEnabled,
    showProfileDialog,
    setShowProfileDialog,
    showPasswordDialog,
    setShowPasswordDialog,
    newName,
    setNewName,
    newEmail,
    setNewEmail,
    profileName,
    setProfileName,
    profileEmail,
    setProfileEmail,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword
  };
};