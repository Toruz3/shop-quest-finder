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
    <div className="h-screen flex flex-col">
      {/* Single Card Container */}
      <div className="flex-1 bg-card m-0.5 rounded-xl overflow-hidden">
        {/* Header Section */}
        <div className="p-4 pb-2">
          <ProfileCard profileName={profileName} profileEmail={profileEmail} />
        </div>

        {/* Scrollable Content Area with Tabs */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-2 pb-4" style={{ scrollBehavior: 'smooth' }}>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};