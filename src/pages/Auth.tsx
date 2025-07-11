import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Label } from "@/components/ui/label";
const Auth = () => {
  const location = useLocation();
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
  useEffect(() => {
    if (location.state && location.state.tab === "register") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [location.state]);
  useEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, [user, navigate]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password, rememberMe);
        toast({
          title: "Login successful",
          description: "Welcome to Shop Quest Finder!"
        });
      } else {
        await signup(name, email, password);
        toast({
          title: "Registration complete",
          description: "Welcome to Shop Quest Finder!"
        });
      }
      navigate("/app");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (error as Error).message || "An error occurred"
      });
      console.error("Auth error:", error);
    }
  };
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword(resetEmail);
      toast({
        title: "Email sent",
        description: "If the email exists in our system, you will receive instructions to reset your password shortly."
      });
      setShowResetForm(false);
      setResetEmail("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Unable to send password reset email. Please try again later."
      });
      console.error("Reset password error:", error);
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
            <p className="text-gray-600 text-sm">Reset your password</p>
          </div>
          
          <form onSubmit={handleResetPassword} className="space-y-3">
            <div className="space-y-1">
              <label htmlFor="resetEmail" className="text-sm font-medium">
                Email
              </label>
              <Input id="resetEmail" type="email" value={resetEmail} onChange={e => setResetEmail(e.target.value)} required className="border-gray-300 focus:border-primary/30 focus:ring focus:ring-primary/20 h-9" />
              <p className="text-xs text-gray-500 mt-1">
                Enter your email and we'll send you instructions to reset your password.
              </p>
            </div>
            
            <div className="flex gap-2 pt-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setShowResetForm(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-medium py-2 h-10" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send email"}
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
          <p className="text-gray-600 text-sm">Access to manage your shopping list</p>
        </div>
        
        <div className="tabs flex border-b mb-4">
          <div className={`w-1/2 text-center py-2 cursor-pointer ${isLogin ? 'font-medium text-primary' : 'text-gray-600'}`} onClick={() => setIsLogin(true)}>
            Login
          </div>
          <div className={`w-1/2 text-center py-2 cursor-pointer ${!isLogin ? 'font-medium text-primary' : 'text-gray-600'}`} onClick={() => setIsLogin(false)}>
            Register
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          {!isLogin && <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium">
                Name
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
                Demo: use any email with password: "password"
              </p>}
          </div>
          
          {isLogin && <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-1">
                <input 
                  type="checkbox" 
                  id="rememberMe" 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)} 
                  className="h-3 w-3 rounded border-gray-300 text-primary focus:ring-primary focus:ring-1"
                />
                <Label htmlFor="rememberMe" className="text-xs cursor-pointer">
                  Remember me
                </Label>
              </div>
              <button type="button" className="text-primary hover:underline text-xs" onClick={() => setShowResetForm(true)}>
                Forgot password?
              </button>
            </div>}
          
          <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-medium h-10 text-sm mt-2" disabled={isLoading}>
            {isLoading ? <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span> : isLogin ? "Login" : "Register"}
          </Button>
        </form>
      </div>
    </div>;
};
export default Auth;