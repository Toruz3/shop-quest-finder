interface ProfileCardProps {
  profileName: string;
  profileEmail: string;
}

export const ProfileCard = ({ profileName, profileEmail }: ProfileCardProps) => {
  return (
    <header className="mb-6">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Il tuo account</p>
      <h1 className="font-serif text-3xl leading-tight text-foreground mb-4">
        Ciao, <em className="italic text-primary">{profileName.split(" ")[0] || "tu"}</em>
      </h1>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif text-lg">
          {profileName.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{profileName}</p>
          <p className="text-xs text-muted-foreground truncate">{profileEmail}</p>
        </div>
      </div>
    </header>
  );
};
