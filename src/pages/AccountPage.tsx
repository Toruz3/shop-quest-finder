import { useState, useEffect } from "react";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/hooks/use-theme";
import { ModernToggle } from "@/components/ui/modern-toggle";
import { User, LogOut, Settings, Lock, Smartphone, CreditCard, HelpCircle, Heart, ShoppingBag, History, MapPin, Share2, Check, X, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const {
    user,
    profile,
    logout
  } = useAuth();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [profileName, setProfileName] = useState(profile?.name || "");
  const [profileEmail, setProfileEmail] = useState(user?.email || "");

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

  return <div className="min-h-screen relative overflow-hidden pb-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="absolute top-20 right-[5%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-[5%] w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container px-3 py-4 relative z-10">
        <div className="max-w-md mx-auto">
          <Card className="border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary dark:text-primary-400 text-xl font-bold">
                {profileName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-left text-gray-900 dark:text-white">{profileName}</h2>
                <p className="text-sm text-neutral-500 dark:text-gray-400 text-left">{profileEmail}</p>
                <div className="flex mt-1">
                  <Badge className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 border-primary-200 dark:border-primary-700 mr-2">
                    Utente Standard
                  </Badge>
                  <Badge variant="outline" className="text-neutral-600 dark:text-gray-300 dark:border-gray-600">
                    Dal 2023
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
          
          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList className="w-full grid grid-cols-3 h-12 rounded-lg p-1 bg-primary-50 dark:bg-gray-800">
              <TabsTrigger value="profile" className="rounded-md data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all dark:text-gray-300 dark:data-[state=active]:text-primary">
                Profilo
              </TabsTrigger>
              <TabsTrigger value="preferences" className="rounded-md data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all dark:text-gray-300 dark:data-[state=active]:text-primary">
                Preferenze
              </TabsTrigger>
              <TabsTrigger value="activity" className="rounded-md data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all dark:text-gray-300 dark:data-[state=active]:text-primary">
                Attività
              </TabsTrigger>
            </TabsList>
            
            <TabsContent 
              value="profile" 
              className="mt-4 space-y-4 hide-scrollbar smooth-scroll touch-scroll overflow-y-auto max-h-[calc(100vh-250px)]"
            >
              <Card className="border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                <div className="p-3 bg-neutral-50 dark:bg-gray-700 border-b border-neutral-200 dark:border-gray-600">
                  <h3 className="font-medium flex items-center gap-2 text-gray-900 dark:text-white">
                    <User size={16} className="text-primary" />
                    Gestione Account
                  </h3>
                </div>
                
                <div className="divide-y divide-neutral-100 dark:divide-gray-600">
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-left text-gray-900 dark:text-white">Modifica profilo</h4>
                      <p className="text-xs text-neutral-500 dark:text-gray-400">Nome, email, foto profilo</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 dark:text-gray-300 dark:hover:text-white" onClick={handleEditProfile}>
                      <Settings size={16} />
                    </Button>
                  </div>
                  
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-left text-gray-900 dark:text-white">Sicurezza</h4>
                      <p className="text-xs text-neutral-500 dark:text-gray-400">Password, autenticazione</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 dark:text-gray-300 dark:hover:text-white" onClick={() => setShowPasswordDialog(true)}>
                      <Lock size={16} />
                    </Button>
                  </div>
                  
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Dispositivi collegati</h4>
                      <p className="text-xs text-neutral-500 dark:text-gray-400 text-left">Gestisci accessi</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 dark:text-gray-300 dark:hover:text-white">
                      <Smartphone size={16} />
                    </Button>
                  </div>
                  
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-left text-gray-900 dark:text-white">Metodi di pagamento</h4>
                      <p className="text-xs text-neutral-500 dark:text-gray-400 text-left">Carte e fatturazione</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 dark:text-gray-300 dark:hover:text-white">
                      <CreditCard size={16} />
                    </Button>
                  </div>
                  
                  <div className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium text-red-600 dark:text-red-400">Esci</h4>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 text-red-600 dark:text-red-400" onClick={handleLogout}>
                      <LogOut size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
              
              <Card className="border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                <div className="p-3 bg-neutral-50 dark:bg-gray-700 border-b border-neutral-200 dark:border-gray-600">
                  <h3 className="font-medium flex items-center gap-2 text-gray-900 dark:text-white">
                    <HelpCircle size={16} className="text-primary" />
                    Supporto
                  </h3>
                </div>
                
                <div className="divide-y divide-neutral-100 dark:divide-gray-600">
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Centro assistenza</h4>
                      <p className="text-xs text-neutral-500 text-left">Domande frequenti</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 dark:text-gray-300 dark:hover:text-white">
                      <Settings size={16} />
                    </Button>
                  </div>
                  
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-left">Contattaci</h4>
                      <p className="text-xs text-neutral-500 text-left">Email, telefono</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 dark:text-gray-300 dark:hover:text-white">
                      <Settings size={16} />
                    </Button>
                  </div>
                  
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-left">Privacy e Termini</h4>
                      <p className="text-xs text-neutral-500 text-left">Informative legali</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 dark:text-gray-300 dark:hover:text-white">
                      <Settings size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
              
              <Alert className="bg-primary-50 border-primary-200">
                <AlertDescription className="text-sm text-primary-800">
                  Il tuo account è configurato correttamente. Puoi gestire le impostazioni del tuo profilo in qualsiasi momento.
                </AlertDescription>
              </Alert>
            </TabsContent>
            
            <TabsContent 
              value="preferences" 
              className="mt-4 space-y-4 hide-scrollbar smooth-scroll touch-scroll overflow-y-auto max-h-[calc(100vh-250px)]"
            >
              <Card className="border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                <div className="p-3 bg-neutral-50 dark:bg-gray-700 border-b border-neutral-200 dark:border-gray-600">
                  <h3 className="font-medium flex items-center gap-2 text-gray-900 dark:text-white">
                    <Settings size={16} className="text-primary" />
                    Preferenze App
                  </h3>
                </div>
                
                <div className="divide-y divide-neutral-100 dark:divide-gray-600">
                  <div className="p-3">
                    <ModernToggle 
                      isEnabled={isDarkMode}
                      onToggle={handleThemeToggle}
                      label="Tema scuro"
                      description="Cambia l'aspetto dell'app"
                      icon="theme"
                    />
                  </div>
                  
                  <div className="p-3">
                    <ModernToggle 
                      isEnabled={notificationsEnabled}
                      onToggle={toggleNotifications}
                      label="Notifiche"
                      description="Gestisci avvisi e promemoria"
                      icon="notification"
                    />
                  </div>
                  
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Lingua</h4>
                      <p className="text-xs text-neutral-500 dark:text-gray-400">Italiano</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 dark:text-gray-300 dark:hover:text-white">
                      <Settings size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
              
              <Card className="border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                <div className="p-3 bg-neutral-50 dark:bg-gray-700 border-b border-neutral-200 dark:border-gray-600">
                  <h3 className="font-medium flex items-center gap-2 text-gray-900 dark:text-white">
                    <ShoppingBag size={16} className="text-primary" />
                    Preferenze Spesa
                  </h3>
                </div>
                
                <div className="divide-y divide-neutral-100 dark:divide-gray-600">
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-left text-gray-900 dark:text-white">Supermercati preferiti</h4>
                      <p className="text-xs text-neutral-500 text-left">Gestisci le tue preferenze</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 dark:text-gray-300 dark:hover:text-white">
                      <Heart size={16} />
                    </Button>
                  </div>
                  
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Raggio di ricerca</h4>
                      <p className="text-xs text-neutral-500 text-left">5km</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 dark:text-gray-300 dark:hover:text-white">
                      <MapPin size={16} />
                    </Button>
                  </div>
                  
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-left">Categorie nascoste</h4>
                      <p className="text-xs text-neutral-500">Nascondi categorie non utilizzate</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 dark:text-gray-300 dark:hover:text-white">
                      <Settings size={16} />
                    </Button>
                  </div>
                  
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Dieta e preferenze alimentari</h4>
                      <p className="text-xs text-neutral-500 text-left">Filtri per prodotti</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 dark:text-gray-300 dark:hover:text-white">
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
            
            <TabsContent 
              value="activity" 
              className="mt-4 space-y-4 hide-scrollbar smooth-scroll touch-scroll overflow-y-auto max-h-[calc(100vh-250px)]"
            >
              <Card className="border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                <div className="p-3 bg-neutral-50 dark:bg-gray-700 border-b border-neutral-200 dark:border-gray-600">
                  <h3 className="font-medium flex items-center gap-2 text-gray-900 dark:text-white">
                    <History size={16} className="text-primary" />
                    Attività Recente
                  </h3>
                </div>
                
                <div className="divide-y divide-neutral-100 dark:divide-gray-600">
                  <div className="p-3">
                    <div className="flex justify-between mb-1">
                      <h4 className="text-sm font-medium text-left text-gray-900 dark:text-white">Spesa completata</h4>
                      <span className="text-xs text-neutral-500 dark:text-gray-400">2 giorni fa</span>
                    </div>
                    <p className="text-xs text-neutral-600 text-left">Esselunga • 12 prodotti • €42,75</p>
                  </div>
                  
                  <div className="p-3">
                    <div className="flex justify-between mb-1">
                      <h4 className="text-sm font-medium">Lista salvata</h4>
                      <span className="text-xs text-neutral-500 dark:text-gray-400">5 giorni fa</span>
                    </div>
                    <p className="text-xs text-neutral-600 text-left">Lista "Cena speciale" • 8 prodotti</p>
                  </div>
                  
                  <div className="p-3">
                    <div className="flex justify-between mb-1">
                      <h4 className="text-sm font-medium">Prodotto aggiunto ai preferiti</h4>
                      <span className="text-xs text-neutral-500 dark:text-gray-400">1 settimana fa</span>
                    </div>
                    <p className="text-xs text-neutral-600 text-left">Parmigiano Reggiano • €4,99</p>
                  </div>
                </div>
                
                <div className="p-3 border-t border-neutral-200 bg-neutral-50 dark:bg-gray-700">
                  <Button variant="ghost" size="sm" className="w-full text-neutral-600">
                    Vedi tutte le attività
                  </Button>
                </div>
              </Card>
              
              <Card className="border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                <div className="p-3 bg-neutral-50 dark:bg-gray-700 border-b border-neutral-200 dark:border-gray-600">
                  <h3 className="font-medium flex items-center gap-2 text-gray-900 dark:text-white">
                    <Share2 size={16} className="text-primary" />
                    Sincronizzazione
                  </h3>
                </div>
                
                <div className="p-3">
                  <h4 className="text-sm font-medium mb-2">Dispositivi sincronizzati</h4>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-neutral-50 rounded-md dark:bg-gray-700">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                          <Smartphone size={14} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-medium">iPhone 12</p>
                          <p className="text-xs text-neutral-500 dark:text-gray-400">iOS 16 • Ultimo accesso: oggi</p>
                        </div>
                      </div>
                      <Badge>Attuale</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 bg-neutral-50 rounded-md dark:bg-gray-700">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                          <Smartphone size={14} className="text-neutral-600" />
                        </div>
                        <div>
                          <p className="text-xs font-medium">MacBook Air</p>
                          <p className="text-xs text-neutral-500 dark:text-gray-400">Chrome • Ultimo accesso: ieri</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <Button variant="outline" size="sm" className="w-full dark:text-gray-300 dark:hover:text-white">
                    Gestisci sincronizzazione
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

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
