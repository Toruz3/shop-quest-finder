import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/hooks/use-theme";
import { User, LogOut, Settings, Lock, Smartphone, CreditCard, HelpCircle, Heart, ShoppingBag, History, MapPin, Share2, Check, X, Save, Copy, Calendar, MoreHorizontal, Bell, BellOff, Moon, Sun } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Footer } from "@/components/Footer";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const {
    user,
    profile,
    logout
  } = useAuth();
  const navigate = useNavigate();
  const {
    isDarkMode,
    toggleTheme,
    theme
  } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [profileName, setProfileName] = useState(profile?.name || "Mario Rossi");
  const [profileEmail, setProfileEmail] = useState(user?.email || "mario.rossi@email.com");

  useEffect(() => {
    if (profile) {
      setProfileName(profile.name);
    }
    if (user) {
      setProfileEmail(user.email);
    }
  }, [user, profile]);

  const handleLogout = () => {
    logout();
    navigate("/auth");
    toast({
      title: "Logout effettuato",
      description: "Sei stato disconnesso con successo",
      duration: 3000
    });
  };

  const handleThemeToggle = () => {
    toggleTheme();
    toast({
      title: isDarkMode ? "Tema chiaro attivato" : "Tema scuro attivato",
      description: "Le impostazioni di visualizzazione sono state aggiornate",
      duration: 2000
    });
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    toast({
      title: notificationsEnabled ? "Notifiche disattivate" : "Notifiche attivate",
      description: "Le impostazioni di notifica sono state aggiornate",
      duration: 2000
    });
  };

  const handleEditProfile = () => {
    setNewName(profileName);
    setNewEmail(profileEmail);
    setShowProfileDialog(true);
  };

  const handleSaveProfile = () => {
    if (!newName.trim()) {
      toast({
        variant: "destructive",
        title: "Nome richiesto",
        description: "Il nome non può essere vuoto"
      });
      return;
    }
    setProfileName(newName);
    setProfileEmail(newEmail);
    toast({
      title: "Profilo aggiornato",
      description: "Le modifiche al profilo sono state salvate"
    });
    setShowProfileDialog(false);
  };

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        variant: "destructive",
        title: "Campi obbligatori",
        description: "Compila tutti i campi per continuare"
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Le password non corrispondono",
        description: "La nuova password e la conferma devono essere identiche"
      });
      return;
    }
    toast({
      title: "Password aggiornata",
      description: "La tua password è stata modificata con successo"
    });
    setShowPasswordDialog(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  if (!user) {
    navigate("/auth");
    return null;
  }

  return <div className="min-h-screen relative overflow-hidden pb-20 bg-background transition-colors duration-300">
      <div className="absolute top-20 right-[5%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-[5%] w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container px-3 py-4 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Profile Card */}
          <Card className="border border-border bg-card p-4 mb-4 transition-colors duration-200">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">
                {profileName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-left text-card-foreground">{profileName}</h2>
                <p className="text-sm text-muted-foreground text-left">{profileEmail}</p>
                <div className="flex mt-1">
                  <Badge className="bg-primary/15 text-primary border-primary/20 mr-2">
                    Utente Standard
                  </Badge>
                  <Badge variant="outline" className="text-muted-foreground border-border bg-muted/30">
                    Dal 2023
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
          
          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList className="w-full grid grid-cols-3 h-12 rounded-lg p-1 bg-muted/50">
              <TabsTrigger value="profile" className="rounded-md data-[state=active]:bg-card data-[state=active]:text-card-foreground data-[state=active]:shadow-sm transition-all duration-200">
                Profilo
              </TabsTrigger>
              <TabsTrigger value="preferences" className="rounded-md data-[state=active]:bg-card data-[state=active]:text-card-foreground data-[state=active]:shadow-sm transition-all duration-200">
                Preferenze
              </TabsTrigger>
              <TabsTrigger value="activity" className="rounded-md data-[state=active]:bg-card data-[state=active]:text-card-foreground data-[state=active]:shadow-sm transition-all duration-200">
                Attività
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-4 space-y-4 hide-scrollbar smooth-scroll touch-scroll overflow-y-auto max-h-[calc(100vh-250px)]">
              {/* Profile content - keep existing code */}
              <Card className="border border-border bg-card overflow-hidden">
                <div className="section-header">
                  <h3 className="font-medium flex items-center gap-2 text-card-foreground">
                    <User size={16} className="text-primary" />
                    Gestione Account
                  </h3>
                </div>
                
                <div className="divide-y divide-border">
                  <div className="menu-item">
                    <div>
                      <h4 className="text-sm font-medium text-left text-card-foreground">Modifica profilo</h4>
                      <p className="text-xs text-muted-foreground">Nome, email, foto profilo</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-muted/50" onClick={handleEditProfile}>
                      <Settings size={16} />
                    </Button>
                  </div>
                  
                  <div className="menu-item">
                    <div>
                      <h4 className="text-sm font-medium text-left text-card-foreground">Sicurezza</h4>
                      <p className="text-xs text-muted-foreground">Password, autenticazione</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-muted/50" onClick={() => setShowPasswordDialog(true)}>
                      <Lock size={16} />
                    </Button>
                  </div>
                  
                  <div className="menu-item">
                    <div>
                      <h4 className="text-sm font-medium text-left text-card-foreground">Dispositivi collegati</h4>
                      <p className="text-xs text-muted-foreground text-left">Gestisci accessi</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-muted/50">
                      <Smartphone size={16} />
                    </Button>
                  </div>
                  
                  <div className="menu-item">
                    <div>
                      <h4 className="text-sm font-medium text-left text-card-foreground">Metodi di pagamento</h4>
                      <p className="text-xs text-muted-foreground text-left">Carte e fatturazione</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-muted/50">
                      <CreditCard size={16} />
                    </Button>
                  </div>
                  
                  <div className="menu-item">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium text-destructive">Esci</h4>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={handleLogout}>
                      <LogOut size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
              
              <Card className="border border-border bg-card overflow-hidden">
                <div className="section-header">
                  <h3 className="font-medium flex items-center gap-2 text-card-foreground">
                    <HelpCircle size={16} className="text-primary" />
                    Supporto
                  </h3>
                </div>
                
                <div className="divide-y divide-border">
                  <div className="menu-item">
                    <div>
                      <h4 className="text-sm font-medium">Centro assistenza</h4>
                      <p className="text-xs text-muted-foreground text-left">Domande frequenti</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-muted/50">
                      <Settings size={16} />
                    </Button>
                  </div>
                  
                  <div className="menu-item">
                    <div>
                      <h4 className="text-sm font-medium text-left">Contattaci</h4>
                      <p className="text-xs text-muted-foreground text-left">Email, telefono</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-muted/50">
                      <Settings size={16} />
                    </Button>
                  </div>
                  
                  <div className="menu-item">
                    <div>
                      <h4 className="text-sm font-medium text-left">Privacy e Termini</h4>
                      <p className="text-xs text-muted-foreground text-left">Informative legali</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-muted/50">
                      <Settings size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
              
              <Alert className="bg-primary/5 border-primary/20">
                <AlertDescription className="text-sm text-foreground">
                  Il tuo account è configurato correttamente. Puoi gestire le impostazioni del tuo profilo in qualsiasi momento.
                </AlertDescription>
              </Alert>
            </TabsContent>
            
            <TabsContent value="preferences" className="mt-4 space-y-4 hide-scrollbar smooth-scroll touch-scroll overflow-y-auto max-h-[calc(100vh-250px)]">
              <Card className="border border-border bg-card overflow-hidden">
                <div className="section-header">
                  <h3 className="font-medium flex items-center gap-2 text-card-foreground">
                    <Settings size={16} className="text-primary" />
                    Preferenze App
                  </h3>
                </div>
                
                <div className="divide-y divide-border">
                  <div className="flex items-center justify-between p-3 hover:bg-muted/30 transition-colors duration-200">
                    <div className="flex flex-col">
                      <h4 className="text-sm font-medium text-card-foreground text-left">Tema scuro</h4>
                      <p className="text-xs text-muted-foreground text-left">Cambia l'aspetto dell'app</p>
                    </div>
                    <Switch
                      checked={isDarkMode}
                      onCheckedChange={handleThemeToggle}
                      className="h-5 w-9 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 hover:bg-muted/30 transition-colors duration-200">
                    <div className="flex flex-col">
                      <h4 className="text-sm font-medium text-card-foreground text-left">Notifiche</h4>
                      <p className="text-xs text-muted-foreground text-left">Gestisci avvisi e promemoria</p>
                    </div>
                    <Switch
                      checked={notificationsEnabled}
                      onCheckedChange={toggleNotifications}
                      className="h-5 w-9 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
                    />
                  </div>
                  
                  <div className="menu-item">
                    <div>
                      <h4 className="text-sm font-medium text-card-foreground text-left">Lingua</h4>
                      <p className="text-xs text-muted-foreground text-left">Italiano</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-muted/50">
                      <Settings size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
              
              {/* Shopping preferences section - keep existing code */}
              <Card className="border border-border bg-card overflow-hidden">
                <div className="section-header">
                  <h3 className="font-medium flex items-center gap-2 text-card-foreground">
                    <ShoppingBag size={16} className="text-primary" />
                    Preferenze Spesa
                  </h3>
                </div>
                
                <div className="divide-y divide-border">
                  <div className="menu-item">
                    <div>
                      <h4 className="text-sm font-medium text-left text-card-foreground">Supermercati preferiti</h4>
                      <p className="text-xs text-muted-foreground text-left">Gestisci le tue preferenze</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-muted/50">
                      <Heart size={16} />
                    </Button>
                  </div>
                  
                  <div className="menu-item">
                    <div>
                      <h4 className="text-sm font-medium">Raggio di ricerca</h4>
                      <p className="text-xs text-muted-foreground text-left">5km</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-muted/50">
                      <MapPin size={16} />
                    </Button>
                  </div>
                  
                  <div className="menu-item">
                    <div>
                      <h4 className="text-sm font-medium text-left">Categorie nascoste</h4>
                      <p className="text-xs text-muted-foreground">Nascondi categorie non utilizzate</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-muted/50">
                      <Settings size={16} />
                    </Button>
                  </div>
                  
                  <div className="menu-item">
                    <div>
                      <h4 className="text-sm font-medium">Dieta e preferenze alimentari</h4>
                      <p className="text-xs text-muted-foreground text-left">Filtri per prodotti</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-muted/50">
                      <Settings size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
              
              <Alert>
                <AlertDescription className="text-sm">
                  Personalizza l'app in base alle tue preferenze. Le modifiche verranno salvate automaticamente.
                </AlertDescription>
              </Alert>
            </TabsContent>
            
            <TabsContent value="activity" className="mt-4 space-y-4 hide-scrollbar smooth-scroll touch-scroll overflow-y-auto max-h-[calc(100vh-250px)]">
              {/* Activity content - keep existing code */}
              <Card className="border border-border bg-card overflow-hidden">
                <div className="section-header">
                  <h3 className="font-medium flex items-center gap-2 text-card-foreground">
                    <History size={16} className="text-primary" />
                    Attività Recente
                  </h3>
                </div>
                
                <div className="divide-y divide-border">
                  <div className="p-3 hover:bg-muted/30 transition-colors duration-200">
                    <div className="flex justify-between mb-1">
                      <h4 className="text-sm font-medium text-left text-card-foreground">Spesa completata</h4>
                      <span className="text-xs text-muted-foreground">2 giorni fa</span>
                    </div>
                    <p className="text-xs text-muted-foreground text-left">Esselunga • 12 prodotti • €42,75</p>
                  </div>
                  
                  <div className="p-3 hover:bg-muted/30 transition-colors duration-200">
                    <div className="flex justify-between mb-1">
                      <h4 className="text-sm font-medium">Lista salvata</h4>
                      <span className="text-xs text-muted-foreground">5 giorni fa</span>
                    </div>
                    <p className="text-xs text-muted-foreground text-left">Lista "Cena speciale" • 8 prodotti</p>
                  </div>
                  
                  <div className="p-3 hover:bg-muted/30 transition-colors duration-200">
                    <div className="flex justify-between mb-1">
                      <h4 className="text-sm font-medium">Prodotto aggiunto ai preferiti</h4>
                      <span className="text-xs text-muted-foreground">1 settimana fa</span>
                    </div>
                    <p className="text-xs text-muted-foreground text-left">Parmigiano Reggiano • €4,99</p>
                  </div>
                </div>
                
                <div className="p-3 border-t border-border bg-muted/20">
                  <Button variant="ghost" size="sm" className="w-full text-muted-foreground hover:bg-muted/50">
                    Vedi tutte le attività
                  </Button>
                </div>
              </Card>
              
              <Card className="border border-border bg-card overflow-hidden">
                <div className="section-header">
                  <h3 className="font-medium flex items-center gap-2 text-card-foreground">
                    <Share2 size={16} className="text-primary" />
                    Sincronizzazione
                  </h3>
                </div>
                
                <div className="p-3">
                  <h4 className="text-sm font-medium mb-2">Dispositivi sincronizzati</h4>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Smartphone size={14} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-medium">iPhone 12</p>
                          <p className="text-xs text-muted-foreground">iOS 16 • Ultimo accesso: oggi</p>
                        </div>
                      </div>
                      <Badge>Attuale</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center">
                          <Smartphone size={14} className="text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-xs font-medium">MacBook Air</p>
                          <p className="text-xs text-muted-foreground">Chrome • Ultimo accesso: ieri</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <Button variant="outline" size="sm" className="w-full">
                    Gestisci sincronizzazione
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Dialogs - keep existing code */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifica profilo</DialogTitle>
            <DialogDescription>
              Modifica le informazioni del tuo account
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Il tuo nome" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="la-tua-email@esempio.com" />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProfileDialog(false)}>
              <X size={16} className="mr-1" />
              Annulla
            </Button>
            <Button onClick={handleSaveProfile}>
              <Save size={16} className="mr-1" />
              Salva modifiche
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cambio password</DialogTitle>
            <DialogDescription>
              Crea una nuova password per il tuo account
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Password attuale</Label>
              <Input id="current-password" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-password">Nuova password</Label>
              <Input id="new-password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Conferma password</Label>
              <Input id="confirm-password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
              <X size={16} className="mr-1" />
              Annulla
            </Button>
            <Button onClick={handleChangePassword}>
              <Check size={16} className="mr-1" />
              Cambia password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>;
};

export default AccountPage;
