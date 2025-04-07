
import { useEffect } from "react";

export function useAuthTabs() {
  useEffect(() => {
    const handleTabClick = () => {
      const hash = window.location.hash;
      const signinTab = document.getElementById('signin-tab');
      const signupTab = document.getElementById('signup-tab');
      const signinForm = document.getElementById('signin');
      const signupForm = document.getElementById('signup');
      
      if (hash === '#signup') {
        // Show signup
        signinTab?.querySelector('a')?.classList.replace('text-primary', 'text-gray-600');
        signupTab?.querySelector('a')?.classList.replace('text-gray-600', 'text-primary');
        signinForm!.style.display = 'none';
        signupForm!.style.display = 'block';
      } else {
        // Show signin
        signinTab?.querySelector('a')?.classList.replace('text-gray-600', 'text-primary');
        signupTab?.querySelector('a')?.classList.replace('text-primary', 'text-gray-600');
        signinForm!.style.display = 'block';
        signupForm!.style.display = 'none';
      }
    };

    // Set up initial state based on hash
    handleTabClick();

    // Listen for hash changes
    window.addEventListener('hashchange', handleTabClick);
    
    // Clean up
    return () => {
      window.removeEventListener('hashchange', handleTabClick);
    };
  }, []);
}
