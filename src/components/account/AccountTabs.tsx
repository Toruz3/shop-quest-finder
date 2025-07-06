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