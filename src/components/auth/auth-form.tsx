"use client";

import { useState, useTransition, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { GoogleSignInButton } from "./google-sign-in-button";
import { PasswordStrengthIndicator } from "./password-strength-indicator";
import {
  analyzePasswordStrength,
  type AnalyzePasswordStrengthOutput,
} from "@/ai/flows/password-strength-analyzer";
import { useToast } from "@/hooks/use-toast";

const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
});

const signUpSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export function AuthForm() {
  const [isPending, startTransition] = useTransition();
  const [password, setPassword] = useState("");
  const [strengthResult, setStrengthResult] =
    useState<AnalyzePasswordStrengthOutput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();
  const [formType, setFormType] = useState<"signIn" | "signUp">("signIn");

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "" },
  });

  const analyze = useCallback(async (passwordToAnalyze: string) => {
    setIsAnalyzing(true);
    try {
      const result = await analyzePasswordStrength({ password: passwordToAnalyze });
      setStrengthResult(result);
    } catch (error) {
      console.error("Failed to analyze password strength:", error);
      toast({
        title: "Error",
        description: "Failed to analyze password strength.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [toast]);

  useEffect(() => {
    const subscription = signUpForm.watch((value, { name }) => {
      if (name === "password") {
        setPassword(value.password || "");
      }
    });
    return () => subscription.unsubscribe();
  }, [signUpForm.watch]);
  
  useEffect(() => {
    if (!password || formType === 'signIn') {
      setStrengthResult(null);
      return;
    }
    const debouncedAnalyze = setTimeout(() => {
        analyze(password);
    }, 500);

    return () => clearTimeout(debouncedAnalyze);
  }, [password, analyze, formType]);


  const onSignInSubmit = (values: z.infer<typeof signInSchema>) => {
    startTransition(async () => {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        toast({
          title: "Success",
          description: "You have successfully signed in.",
        });
      } catch (error: any) {
        console.error("Sign in failed:", error.message);
        toast({
          title: "Sign In Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    });
  };

  const onSignUpSubmit = (values: z.infer<typeof signUpSchema>) => {
    startTransition(async () => {
      try {
        await createUserWithEmailAndPassword(auth, values.email, values.password);
        toast({
          title: "Account Created",
          description: "Your account has been successfully created.",
        });
        setFormType("signIn");
      } catch (error: any) {
        console.error("Sign up failed:", error.message);
        toast({
          title: "Sign Up Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="mx-auto grid w-full max-w-sm gap-6">
        {formType === 'signIn' ? (
          <>
            <div className="grid gap-2">
                <h1 className="text-3xl font-bold">Welcome Back</h1>
                <p className="text-balance text-muted-foreground">
                    Please sign in to access your dashboard.
                </p>
            </div>
            <Form {...signInForm}>
              <form
                onSubmit={signInForm.handleSubmit(onSignInSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={signInForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            {...field}
                            disabled={isPending}
                          />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signInForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                        <div className="flex items-center">
                            <FormLabel>Password</FormLabel>
                            <a href="#" className="ml-auto inline-block text-sm text-blue-600 hover:underline">
                                Forgot your password?
                            </a>
                        </div>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>
              </form>
            </Form>
          </>
        ) : (
            <>
                <div className="grid gap-2">
                    <h1 className="text-3xl font-bold">Create an Account</h1>
                    <p className="text-balance text-muted-foreground">
                        Enter your details to get started.
                    </p>
                </div>
                <Form {...signUpForm}>
                <form
                    onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
                    className="space-y-4"
                >
                    <FormField
                    control={signUpForm.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                            <Input
                                type="email"
                                placeholder="your@email.com"
                                {...field}
                                disabled={isPending}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={signUpForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                            disabled={isPending}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <PasswordStrengthIndicator result={strengthResult} isLoading={isAnalyzing} />
                    <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800" disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
                    </Button>
                </form>
                </Form>
            </>
        )}
        
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">
                OR
                </span>
            </div>
        </div>

        <GoogleSignInButton disabled={isPending} />
        
        <div className="text-center text-sm text-muted-foreground">
            By continuing, you agree to the{" "}
            <a href="#" className="underline text-gray-900 hover:text-blue-600">Terms of Service</a> &{" "}
            <a href="#" className="underline text-gray-900 hover:text-blue-600">Privacy Policy</a>.
        </div>
        
        <div className="text-center text-sm">
            {formType === 'signIn' ? "Don't have an account? " : "Already have an account? "}
            <button 
                onClick={() => setFormType(formType === 'signIn' ? 'signUp' : 'signIn')} 
                className="font-semibold text-blue-600 hover:underline"
                disabled={isPending}
            >
            {formType === 'signIn' ? 'Sign Up' : 'Sign In'}
            </button>
        </div>
    </div>
  );
}
