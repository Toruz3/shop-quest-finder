import { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { ProfileCard } from "@/components/account/ProfileCard";

interface AccountLayoutProps {
  profileName: string;
  profileEmail: string;
  children: ReactNode;
}

export const AccountLayout = ({ profileName, profileEmail, children }: AccountLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Single Card Container */}
      <div className="bg-card m-0.5 rounded-xl">
        {/* Header Section */}
        <div className="p-4 pb-2">
          <ProfileCard profileName={profileName} profileEmail={profileEmail} />
        </div>

        {/* Content Area with Tabs */}
        <div className="px-2 pb-4">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};