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
  
  return <div className="min-h-screen relative overflow-hidden pb-40 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="absolute top-20 right-[5%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-[5%] w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container px-3 py-4 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Profile Card */}
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
          
          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList className="w-full grid grid-cols-3 h-12 rounded-lg p-1 bg-gray-100 dark:bg-gray-800">
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
            
            <TabsContent value="profile" className="mt-4 space-y-4 hide-scrollbar smooth-scroll touch-scroll overflow-y-auto max-h-[calc(100vh-250px)]">
              {/* Profile content */}
              <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                <div className="section-header">
                  <h3 className="font-medium flex items-center gap-2 text-gray-900 dark:text-gray-100 p-4 text-left">
                    <User size={16} className="text-primary" />
                    Gestione Account
                  </h3>
                </div>
                
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="menu-item">
                    <div>
                      <h4 className="text-sm font-medium text-left text-gray-900 dark:text-gray-100">Modifica profilo</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Nome, email, foto profilo</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300" onClick={handleEditProfile}>
                      <Settings size={16} />
                    </Button>
                  </div>
                  
                  <div className="menu-item">
                    <div>
                      <h4 className="text-sm font-medium text-left text-gray-900 dark:text-gray-100">Sicurezza</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Password, autenticazione</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300" onClick={() => setShowPasswordDialog(true)}>
                      <Lock size={16} />
                    </Button>
                  </div>
                  
                  <div className="menu-item">
                    <div>
                      <h4 className="text-sm font-medium text-left text-gray-900 dark:text-gray-100">Dispositivi collegati</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 text-left">Gestisci accessi</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                      <Smartphone size={16} />
                    </Button>
                  </div>
                  
                  <div className="menu-item">
                    <div>
                      <h4 className="text-sm font-medium text-left text-gray-900 dark:text-gray-100">Metodi di pagamento</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 text-left">Carte e fatturazione</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
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
              
              <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                <div className="section-header">
                  <h3 className="font-medium flex items-center gap-2 text-gray-900 dark:text-gray-100 p-4">
                    <HelpCircle size={16} className="text-primary" />
                    Supporto
                  </h3>
                </div>
                
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Centro assistenza</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 text-left">Domande frequenti</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400">
                      <Settings size={16} />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <div>
                      <h4 className="text-sm font-medium text-left text-gray-900 dark:text-gray-100">Contattaci</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 text-left">Email, telefono</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400">
                      <Settings size={16} />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <div>
                      <h4 className="text-sm font-medium text-left text-gray-900 dark:text-gray-100">Privacy e Termini</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 text-left">Informative legali</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400">
                      <Settings size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences" className="mt-4 space-y-4 hide-scrollbar smooth-scroll touch-scroll overflow-y-auto max-h-[calc(100vh-250px)]">
              <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                <div className="section-header">
                  <h3 className="font-medium flex items-center gap-2 text-gray-900 dark:text-gray-100 p-4">
                    <Settings size={16} className="text-primary" />
                    Preferenze App
                  </h3>
                </div>
                
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <div className="flex flex-col">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 text-left">Tema scuro</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 text-left">Cambia l'aspetto dell'app</p>
                    </div>
                    <Switch checked={isDarkMode} onCheckedChange={handleThemeToggle} className="h-5 w-9 data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-gray-600" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <div className="flex flex-col">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 text-left">Notifiche</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 text-left">Gestisci avvisi e promemoria</p>
                    </div>
                    <Switch checked={notificationsEnabled} onCheckedChange={toggleNotifications} className="h-5 w-9 data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-gray-600" />
                  </div>
                  
                  <div className="menu-item">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 text-left">Lingua</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 text-left">Italiano</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                      <Settings size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
              
              <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                <div className="section-header">
                  <h3 className="font-medium flex items-center gap-2 text-gray-900 dark:text-gray-100 p-4">
                    <ShoppingBag size={16} className="text-primary" />
                    Preferenze Spesa
                  </h3>
                </div>
                
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="menu-item">
                    <div>
                      <h4 className="text-sm font-medium text-left text-gray-900 dark:text-gray-100">Supermercati preferiti</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 text-left">Gestisci le tue preferenze</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                      <Heart size={16} />
                    </Button>
                  </div>
                  
                  <div className="menu-item">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Raggio di ricerca</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 text-left">5km</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                      <MapPin size={16} />
                    </Button>
                  </div>
                  
                  <div className="menu-item">
                    <div>
                      <h4 className="text-sm font-medium text-left text-gray-900 dark:text-gray-100">Categorie nascoste</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Nascondi categorie non utilizzate</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                      <Settings size={16} />
                    </Button>
                  </div>
                  
                  <div className="menu-item">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Dieta e preferenze alimentari</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 text-left">Filtri per prodotti</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                      <Settings size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity" className="mt-4 space-y-4 hide-scrollbar smooth-scroll touch-scroll overflow-y-auto max-h-[calc(100vh-250px)]">
              {/* Activity content */}
              <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                <div className="section-header">
                  <h3 className="font-medium flex items-center gap-2 text-gray-900 dark:text-gray-100 p-4">
                    <History size={16} className="text-primary" />
                    Attività Recente
                  </h3>
                </div>
                
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <div className="flex justify-between mb-1">
                      <h4 className="text-sm font-medium text-left text-gray-900 dark:text-gray-100">Spesa completata</h4>
                      <span className="text-xs text-gray-600 dark:text-gray-400">2 giorni fa</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 text-left">Esselunga • 12 prodotti • €42,75</p>
                  </div>
                  
                  <div className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <div className="flex justify-between mb-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Lista salvata</h4>
                      <span className="text-xs text-gray-600 dark:text-gray-400">5 giorni fa</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 text-left">Lista "Cena speciale" • 8 prodotti</p>
                  </div>
                  
                  <div className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <div className="flex justify-between mb-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Prodotto aggiunto ai preferiti</h4>
                      <span className="text-xs text-gray-600 dark:text-gray-400">1 settimana fa</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 text-left">Parmigiano Reggiano • €4,99</p>
                  </div>
                </div>
                
                <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                  <Button variant="ghost" size="sm" className="w-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                    Vedi tutte le attività
                  </Button>
                </div>
              </Card>
              
              <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                <div className="section-header">
                  <h3 className="font-medium flex items-center gap-2 text-gray-900 dark:text-gray-100 p-4">
                    <Share2 size={16} className="text-primary" />
                    Sincronizzazione
                  </h3>
                </div>
                
                <div className="p-3">
                  <h4 className="text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Dispositivi sincronizzati</h4>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Smartphone size={14} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-900 dark:text-gray-100">iPhone 12</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">iOS 16 • Ultimo accesso: oggi</p>
                        </div>
                      </div>
                      <Badge className="bg-primary/10 text-primary border-primary/20">Attuale</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                          <Smartphone size={14} className="text-gray-500 dark:text-gray-400" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-900 dark:text-gray-100">MacBook Air</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Chrome • Ultimo accesso: ieri</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-3 bg-gray-200 dark:bg-gray-700" />
                  
                  <Button variant="outline" size="sm" className="w-full border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Gestisci sincronizzazione
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Dialogs with updated theme */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-100">Modifica profilo</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Modifica le informazioni del tuo account
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-900 dark:text-gray-100">Nome</Label>
              <Input id="name" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Il tuo nome" className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-900 dark:text-gray-100">Email</Label>
              <Input id="email" type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="la-tua-email@esempio.com" className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100" />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProfileDialog(false)} className="border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
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
        <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-100">Cambio password</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Crea una nuova password per il tuo account
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-gray-900 dark:text-gray-100">Password attuale</Label>
              <Input id="current-password" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-gray-900 dark:text-gray-100">Nuova password</Label>
              <Input id="new-password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-gray-900 dark:text-gray-100">Conferma password</Label>
              <Input id="confirm-password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100" />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)} className="border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
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
