import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Label } from "@/components/ui/label";
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const {
    login,
    signup,
    resetPassword,
    isLoading,
    user
  } = useAuth();
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  if (user) {
    navigate("/");
    return null;
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password, rememberMe);
      } else {
        await signup(name, email, password);
      }
      toast({
        title: isLogin ? "Accesso effettuato" : "Registrazione completata",
        description: "Benvenuto su Shop Quest Finder!"
      });
      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Errore",
        description: (error as Error).message || "Si è verificato un errore"
      });
    }
  };
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword(resetEmail);
      toast({
        title: "Email inviata",
        description: "Se l'email esiste nel nostro sistema, riceverai a breve le istruzioni per reimpostare la password."
      });
      setShowResetForm(false);
      setResetEmail("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Errore",
        description: "Non è stato possibile inviare l'email di reset. Riprova più tardi."
      });
    }
  };
  if (showResetForm) {
    return <div className="min-h-screen flex items-center justify-center px-4">
        <div className="absolute top-40 right-[5%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-[5%] w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
        
        <div className="w-full max-w-sm glass-effect p-6 rounded-xl shadow-lg">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-2 mb-3">
              <ShoppingCart className="w-5 h-5 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Shop Quest</h1>
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <p className="text-gray-600 text-sm">Reimposta la tua password</p>
          </div>
          
          <form onSubmit={handleResetPassword} className="space-y-3">
            <div className="space-y-1">
              <label htmlFor="resetEmail" className="text-sm font-medium">
                Email
              </label>
              <Input id="resetEmail" type="email" value={resetEmail} onChange={e => setResetEmail(e.target.value)} required className="border-gray-300 focus:border-primary/30 focus:ring focus:ring-primary/20 h-9" />
              <p className="text-xs text-gray-500 mt-1">
                Inserisci la tua email e ti invieremo le istruzioni per reimpostare la password.
              </p>
            </div>
            
            <div className="flex gap-2 pt-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setShowResetForm(false)} disabled={isLoading}>
                Annulla
              </Button>
              <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-medium py-2 h-10" disabled={isLoading}>
                {isLoading ? "Invio in corso..." : "Invia email"}
              </Button>
            </div>
          </form>
        </div>
      </div>;
  }
  return <div className="min-h-screen flex items-center justify-center px-4">
      <div className="absolute top-40 right-[5%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-[5%] w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="w-full max-w-sm glass-effect p-6 rounded-xl shadow-lg">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-3">
            <ShoppingCart className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Shop Quest</h1>
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          <p className="text-gray-600 text-sm">Accedi per gestire la tua lista della spesa</p>
        </div>
        
        <div className="tabs flex border-b mb-4">
          <div className={`w-1/2 text-center py-2 cursor-pointer ${isLogin ? 'font-medium text-primary' : 'text-gray-600'}`} onClick={() => setIsLogin(true)}>
            Accedi
          </div>
          <div className={`w-1/2 text-center py-2 cursor-pointer ${!isLogin ? 'font-medium text-primary' : 'text-gray-600'}`} onClick={() => setIsLogin(false)}>
            Registrati
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          {!isLogin && <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium">
                Nome
              </label>
              <Input id="name" type="text" value={name} onChange={e => setName(e.target.value)} required={!isLogin} className="border-gray-300 focus:border-primary/30 focus:ring focus:ring-primary/20 h-9" />
            </div>}
          
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="border-gray-300 focus:border-primary/30 focus:ring focus:ring-primary/20 h-9" />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="border-gray-300 focus:border-primary/30 focus:ring focus:ring-primary/20 h-9" />
            {isLogin && <p className="text-xs text-gray-500 mt-1">
                Demo: usa qualsiasi email con password: "password"
              </p>}
          </div>
          
          {isLogin && <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="rememberMe" checked={rememberMe} onCheckedChange={checked => setRememberMe(checked === true)} className="size-2 mx-0" />
                <Label htmlFor="rememberMe" className="text-sm cursor-pointer">
                  Ricordami
                </Label>
              </div>
              <button type="button" className="text-primary hover:underline text-sm" onClick={() => setShowResetForm(true)}>
                Password dimenticata?
              </button>
            </div>}
          
          <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-medium h-10 text-sm mt-2" disabled={isLoading}>
            {isLoading ? <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Caricamento...
              </span> : isLogin ? "Accedi" : "Registrati"}
          </Button>
        </form>
      </div>
    </div>;
};
export default Auth;