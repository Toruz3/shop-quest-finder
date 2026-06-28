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
    <div className="min-h-screen flex flex-col pb-16">
      <div className="container px-4 py-4">
        <div className="max-w-md mx-auto">
          <ProfileCard profileName={profileName} profileEmail={profileEmail} />
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};
