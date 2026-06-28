
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProfileCardProps {
  profileName: string;
  profileEmail: string;
}

export const ProfileCard = ({ profileName, profileEmail }: ProfileCardProps) => {
  return (
    <Card 
      hover 
      interactive
      className="border border-border bg-card p-5 mb-4 fade-in-scale"
    >
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold bounce-in">
          {profileName.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-left text-foreground">{profileName}</h2>
          <p className="text-sm text-muted-foreground text-left">{profileEmail}</p>
          <div className="flex mt-2 gap-2">
            <Badge className="bg-primary/10 text-primary border-primary/20 slide-up">
              Utente Standard
            </Badge>
            <Badge variant="outline" className="text-muted-foreground border-border bg-muted/40 slide-up">
              Dal 2023
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};
