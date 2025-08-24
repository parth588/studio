"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.64 9.20455C17.64 8.56682 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.9705 13.0009 12.9232 12.0477 13.5618V15.705H14.6182C16.4523 14.0559 17.64 11.8395 17.64 9.20455Z" fill="#4285F4"/>
        <path d="M9 18C11.43 18 13.4673 17.1941 14.6182 15.705L12.0477 13.5618C11.2418 14.0918 10.2109 14.4205 9 14.4205C6.96182 14.4205 5.24182 13.0127 4.60364 11.1886H1.95818V13.4118C3.09682 16.0818 5.79409 18 9 18Z" fill="#34A853"/>
        <path d="M4.60364 11.1886C4.41364 10.6586 4.30909 10.0918 4.30909 9.5C4.30909 8.90818 4.41364 8.34136 4.60364 7.81136V5.58818H1.95818C1.42818 6.74 1.125 8.055 1.125 9.5C1.125 10.945 1.42818 12.26 1.95818 13.4118L4.60364 11.1886Z" fill="#FBBC05"/>
        <path d="M9 4.57955C10.3214 4.57955 11.5077 5.05318 12.4382 5.93545L14.6718 3.70182C13.4632 2.59273 11.4259 1.875 9 1.875C5.79409 1.875 3.09682 3.91818 1.95818 5.58818L4.60364 7.81136C5.24182 5.98727 6.96182 4.57955 9 4.57955Z" fill="#EA4335"/>
    </svg>
);

export function GoogleSignInButton(props: ButtonProps) {
  const { toast } = useToast();
  const handleClick = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: "Success",
        description: "You have successfully signed in with Google.",
      });
    } catch (error: any) {
      console.error("Google sign in failed:", error.message);
      toast({
        title: "Google Sign In Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Button variant="outline" className="w-full bg-gray-50 hover:bg-gray-100 text-gray-600" onClick={handleClick} {...props}>
      <GoogleIcon />
      <span className="ml-2">Sign in with Google</span>
    </Button>
  );
}
