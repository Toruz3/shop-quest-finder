
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProfileCardProps {
  profileName: string;
  profileEmail: string;
}

export const ProfileCard = ({ profileName, profileEmail }: ProfileCardProps) => {
  return (
    <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 mb-4 transition-colors duration-200">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 text-xl font-bold">
          {profileName.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-left text-gray-900 dark:text-gray-100">{profileName}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 text-left">{profileEmail}</p>
          <div className="flex mt-1">
            <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700 mr-2">
              Utente Standard
            </Badge>
            <Badge variant="outline" className="text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
              Dal 2023
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};
