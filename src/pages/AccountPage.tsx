import { useState, useEffect } from "react";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { User, LogOut, Settings, Bell, Moon, Lock, Smartphone, CreditCard, HelpCircle, Heart, ShoppingBag, History, MapPin, Share2, Check, X, Save, Trash2 } from "lucide-react";
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
    logout
  } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // Gestione del profilo
  const [profileName, setProfileName] = useState(user?.name || "");
  const [profileEmail, setProfileEmail] = useState(user?.email || "");
  useEffect(() => {
    if (user) {
      setProfileName(user.name);
      setProfileEmail(user.email);
    }
  }, [user]);
  const handleLogout = () => {
    logout();
    navigate("/auth");
    toast({
      title: "Logout effettuato",
      description: "Sei stato disconnesso con successo",
      duration: 3000
    });
  };
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast({
      title: darkMode ? "Tema chiaro attivato" : "Tema scuro attivato",
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

    // Simula aggiornamento profilo
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

    // Simula cambio password
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
  return <div className="min-h-screen relative overflow-hidden pb-20">
      {/* Decorative elements */}
      <div className="absolute top-20 right-[5%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-[5%] w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container px-3 py-4 relative z-10">
        <div className="max-w-md mx-auto">
          <Card className="border border-neutral-200 p-4 mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary text-xl font-bold">
                {profileName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{profileName}</h2>
                <p className="text-sm text-neutral-500">{profileEmail}</p>
                <div className="flex mt-1">
                  <Badge className="bg-primary-100 text-primary-700 border-primary-200 mr-2">
                    Utente Standard
                  </Badge>
                  <Badge variant="outline" className="text-neutral-600">
                    Dal 2023
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
          
          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList className="w-full grid grid-cols-3 h-12 rounded-lg p-1 bg-primary-50">
              <TabsTrigger value="profile" className="rounded-md data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all">
                Profilo
              </TabsTrigger>
              <TabsTrigger value="preferences" className="rounded-md data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all">
                Preferenze
              </TabsTrigger>
              <TabsTrigger value="activity" className="rounded-md data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all">
                Attività
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-4 space-y-4">
              <Card className="border border-neutral-200 overflow-hidden">
                <div className="p-3 bg-neutral-50 border-b border-neutral-200">
                  <h3 className="font-medium flex items-center gap-2">
                    <User size={16} className="text-primary" />
                    Gestione Account
                  </h3>
                </div>
                
                <div className="divide-y divide-neutral-100">
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-left">Modifica profilo</h4>
                      <p className="text-xs text-neutral-500">Nome, email, foto profilo</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8" onClick={handleEditProfile}>
                      <Settings size={16} />
                    </Button>
                  </div>
                  
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-left">Sicurezza</h4>
                      <p className="text-xs text-neutral-500">Password, autenticazione</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8" onClick={() => setShowPasswordDialog(true)}>
                      <Lock size={16} />
                    </Button>
                  </div>
                  
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Dispositivi collegati</h4>
                      <p className="text-xs text-neutral-500 text-left">Gestisci accessi</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8">
                      <Smartphone size={16} />
                    </Button>
                  </div>
                  
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-left">Metodi di pagamento</h4>
                      <p className="text-xs text-neutral-500 text-left">Carte e fatturazione</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8">
                      <CreditCard size={16} />
                    </Button>
                  </div>
                  
                  <div className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium text-red-600">Esci</h4>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 text-red-600" onClick={handleLogout}>
                      <LogOut size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
              
              <Card className="border border-neutral-200 overflow-hidden">
                <div className="p-3 bg-neutral-50 border-b border-neutral-200">
                  <h3 className="font-medium flex items-center gap-2">
                    <HelpCircle size={16} className="text-primary" />
                    Supporto
                  </h3>
                </div>
                
                <div className="divide-y divide-neutral-100">
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Centro assistenza</h4>
                      <p className="text-xs text-neutral-500 text-left">Domande frequenti</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8">
                      <Settings size={16} />
                    </Button>
                  </div>
                  
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-left">Contattaci</h4>
                      <p className="text-xs text-neutral-500 text-left">Email, telefono</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8">
                      <Settings size={16} />
                    </Button>
                  </div>
                  
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-left">Privacy e Termini</h4>
                      <p className="text-xs text-neutral-500 text-left">Informative legali</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8">
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
            
            <TabsContent value="preferences" className="mt-4 space-y-4">
              <Card className="border border-neutral-200 overflow-hidden">
                <div className="p-3 bg-neutral-50 border-b border-neutral-200">
                  <h3 className="font-medium flex items-center gap-2">
                    <Settings size={16} className="text-primary" />
                    Preferenze App
                  </h3>
                </div>
                
                <div className="divide-y divide-neutral-100">
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Tema scuro</h4>
                      <p className="text-xs text-neutral-500">Cambia l'aspetto dell'app</p>
                    </div>
                    <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
                  </div>
                  
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Notifiche</h4>
                      <p className="text-xs text-neutral-500">Gestisci avvisi e promemoria</p>
                    </div>
                    <Switch checked={notificationsEnabled} onCheckedChange={toggleNotifications} />
                  </div>
                  
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Lingua</h4>
                      <p className="text-xs text-neutral-500">Italiano</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8">
                      <Settings size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
              
              <Card className="border border-neutral-200 overflow-hidden">
                <div className="p-3 bg-neutral-50 border-b border-neutral-200">
                  <h3 className="font-medium flex items-center gap-2">
                    <ShoppingBag size={16} className="text-primary" />
                    Preferenze Spesa
                  </h3>
                </div>
                
                <div className="divide-y divide-neutral-100">
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Supermercati preferiti</h4>
                      <p className="text-xs text-neutral-500">Gestisci le tue preferenze</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8">
                      <Heart size={16} />
                    </Button>
                  </div>
                  
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Raggio di ricerca</h4>
                      <p className="text-xs text-neutral-500">5km</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8">
                      <MapPin size={16} />
                    </Button>
                  </div>
                  
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Categorie nascoste</h4>
                      <p className="text-xs text-neutral-500">Nascondi categorie non utilizzate</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8">
                      <Settings size={16} />
                    </Button>
                  </div>
                  
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Dieta e preferenze alimentari</h4>
                      <p className="text-xs text-neutral-500">Filtri per prodotti</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8">
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
            
            <TabsContent value="activity" className="mt-4 space-y-4">
              <Card className="border border-neutral-200 overflow-hidden">
                <div className="p-3 bg-neutral-50 border-b border-neutral-200">
                  <h3 className="font-medium flex items-center gap-2">
                    <History size={16} className="text-primary" />
                    Attività Recente
                  </h3>
                </div>
                
                <div className="divide-y divide-neutral-100">
                  <div className="p-3">
                    <div className="flex justify-between mb-1">
                      <h4 className="text-sm font-medium">Spesa completata</h4>
                      <span className="text-xs text-neutral-500">2 giorni fa</span>
                    </div>
                    <p className="text-xs text-neutral-600">Esselunga • 12 prodotti • €42,75</p>
                  </div>
                  
                  <div className="p-3">
                    <div className="flex justify-between mb-1">
                      <h4 className="text-sm font-medium">Lista salvata</h4>
                      <span className="text-xs text-neutral-500">5 giorni fa</span>
                    </div>
                    <p className="text-xs text-neutral-600">Lista "Cena speciale" • 8 prodotti</p>
                  </div>
                  
                  <div className="p-3">
                    <div className="flex justify-between mb-1">
                      <h4 className="text-sm font-medium">Prodotto aggiunto ai preferiti</h4>
                      <span className="text-xs text-neutral-500">1 settimana fa</span>
                    </div>
                    <p className="text-xs text-neutral-600">Parmigiano Reggiano • €4,99</p>
                  </div>
                </div>
                
                <div className="p-3 border-t border-neutral-200 bg-neutral-50">
                  <Button variant="ghost" size="sm" className="w-full text-neutral-600">
                    Vedi tutte le attività
                  </Button>
                </div>
              </Card>
              
              <Card className="border border-neutral-200 overflow-hidden">
                <div className="p-3 bg-neutral-50 border-b border-neutral-200">
                  <h3 className="font-medium flex items-center gap-2">
                    <Share2 size={16} className="text-primary" />
                    Sincronizzazione
                  </h3>
                </div>
                
                <div className="p-3">
                  <h4 className="text-sm font-medium mb-2">Dispositivi sincronizzati</h4>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-neutral-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                          <Smartphone size={14} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-medium">iPhone 12</p>
                          <p className="text-xs text-neutral-500">iOS 16 • Ultimo accesso: oggi</p>
                        </div>
                      </div>
                      <Badge>Attuale</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 bg-neutral-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
                          <Smartphone size={14} className="text-neutral-600" />
                        </div>
                        <div>
                          <p className="text-xs font-medium">MacBook Air</p>
                          <p className="text-xs text-neutral-500">Chrome • Ultimo accesso: ieri</p>
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

      {/* Dialog per la modifica del profilo */}
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

      {/* Dialog per il cambio password */}
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