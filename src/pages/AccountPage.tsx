
import { useNavigate } from "react-router-dom";
import { ProfileDialog } from "@/components/account/ProfileDialog";
import { PasswordDialog } from "@/components/account/PasswordDialog";
import { AccountLayout } from "@/components/account/AccountLayout";
import { AccountTabs } from "@/components/account/AccountTabs";
import { useAccountState } from "@/hooks/useAccountState";
import { useAccountHandlers } from "@/hooks/useAccountHandlers";

const AccountPage = () => {
  const navigate = useNavigate();
  const state = useAccountState();
  const handlers = useAccountHandlers(state);
  
  if (!state.user) {
    navigate("/auth");
    return null;
  }
  
  return (
    <AccountLayout profileName={state.profileName} profileEmail={state.profileEmail}>
      <AccountTabs
        activeTab={state.activeTab}
        setActiveTab={state.setActiveTab}
        isDarkMode={state.isDarkMode}
        notificationsEnabled={state.notificationsEnabled}
        onEditProfile={handlers.handleEditProfile}
        onChangePassword={() => state.setShowPasswordDialog(true)}
        onLogout={handlers.handleLogout}
        onThemeToggle={handlers.handleThemeToggle}
        onToggleNotifications={handlers.toggleNotifications}
      />

      <ProfileDialog 
        open={state.showProfileDialog}
        onOpenChange={state.setShowProfileDialog}
        newName={state.newName}
        setNewName={state.setNewName}
        newEmail={state.newEmail}
        setNewEmail={state.setNewEmail}
        onSave={handlers.handleSaveProfile}
      />

      <PasswordDialog 
        open={state.showPasswordDialog}
        onOpenChange={state.setShowPasswordDialog}
        currentPassword={state.currentPassword}
        setCurrentPassword={state.setCurrentPassword}
        newPassword={state.newPassword}
        setNewPassword={state.setNewPassword}
        confirmPassword={state.confirmPassword}
        setConfirmPassword={state.setConfirmPassword}
        onSave={handlers.handleChangePassword}
      />
    </AccountLayout>
  );
};

export default AccountPage;
