import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileTab } from "@/components/account/ProfileTab";
import { PreferencesTab } from "@/components/account/PreferencesTab";
import { ActivityTab } from "@/components/account/ActivityTab";

interface AccountTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  notificationsEnabled: boolean;
  onEditProfile: () => void;
  onChangePassword: () => void;
  onLogout: () => void;
  onThemeToggle: () => void;
  onToggleNotifications: () => void;
}

export const AccountTabs = ({
  activeTab,
  setActiveTab,
  isDarkMode,
  notificationsEnabled,
  onEditProfile,
  onChangePassword,
  onLogout,
  onThemeToggle,
  onToggleNotifications
}: AccountTabsProps) => {
  return (
    <div className="w-full">
      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
        {/* Tab Navigation */}
        <TabsList className="w-full grid grid-cols-3 h-12 rounded-lg p-1 bg-muted mb-4">
          <TabsTrigger value="profile" className="rounded-md data-[state=active]:bg-card data-[state=active]:text-foreground text-muted-foreground data-[state=active]:shadow-sm transition-all duration-200">
            Profilo
          </TabsTrigger>
          <TabsTrigger value="preferences" className="rounded-md data-[state=active]:bg-card data-[state=active]:text-foreground text-muted-foreground data-[state=active]:shadow-sm transition-all duration-200">
            Preferenze
          </TabsTrigger>
          <TabsTrigger value="activity" className="rounded-md data-[state=active]:bg-card data-[state=active]:text-foreground text-muted-foreground data-[state=active]:shadow-sm transition-all duration-200">
            Attività
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-0 space-y-4">
          <ProfileTab 
            onEditProfile={onEditProfile}
            onChangePassword={onChangePassword}
            onLogout={onLogout}
          />
        </TabsContent>
        
        <TabsContent value="preferences" className="mt-0 space-y-4">
          <PreferencesTab 
            isDarkMode={isDarkMode}
            onThemeToggle={onThemeToggle}
            notificationsEnabled={notificationsEnabled}
            onToggleNotifications={onToggleNotifications}
          />
        </TabsContent>
        
        <TabsContent value="activity" className="mt-0 space-y-4">
          <ActivityTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};