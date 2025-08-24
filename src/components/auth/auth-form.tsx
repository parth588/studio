"use client";

import { useState, useTransition, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [strengthResult, setStrengthResult] =
    useState<AnalyzePasswordStrengthOutput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

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
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  useEffect(() => {
    const subscription = signUpForm.watch((value, { name }) => {
      if (name === "password") {
        setPassword(value.password || "");
      }
    });
    return () => subscription.unsubscribe();
  }, [signUpForm.watch]);
  
  useEffect(() => {
    if (!password) {
      setStrengthResult(null);
      return;
    }
    const debouncedAnalyze = setTimeout(() => {
        analyze(password);
    }, 500);

    return () => clearTimeout(debouncedAnalyze);
  }, [password, analyze]);


  const onSignInSubmit = (values: z.infer<typeof signInSchema>) => {
    startTransition(async () => {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        // Handle successful sign-in (e.g., redirect)
      } catch (error: any) {
        console.error("Sign in failed:", error.message);
      }
    });
  };

  const onSignUpSubmit = (values: z.infer<typeof signUpSchema>) => {
    startTransition(async () => {
      try {
        await createUserWithEmailAndPassword(auth, values.email, values.password);
        // Handle successful sign-up (e.g., redirect)
      } catch (error: any) {
        console.error("Sign up failed:", error.message);
      }
    });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Tabs defaultValue="sign-in" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="sign-in">Sign In</TabsTrigger>
        <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="sign-in">
        <Form {...signInForm}>
          <form
            onSubmit={signInForm.handleSubmit(onSignInSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={signInForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                   <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input
                        className="pl-10"
                        type="email"
                        placeholder="your@email.com"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                  </div>
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
                        <a href="#" className="ml-auto inline-block text-sm underline">
                            Forgot your password?
                        </a>
                    </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input
                        className="pl-10 pr-10"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                      onClick={togglePasswordVisibility}
                      disabled={isPending}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>
        </Form>
        <Separator className="my-6" />
        <GoogleSignInButton disabled={isPending} />
      </TabsContent>
      <TabsContent value="sign-up">
        <Form {...signUpForm}>
          <form
            onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={signUpForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input
                        className="pl-10"
                        type="email"
                        placeholder="your@email.com"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                  </div>
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
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input
                        className="pl-10 pr-10"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                      onClick={togglePasswordVisibility}
                      disabled={isPending}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <PasswordStrengthIndicator result={strengthResult} isLoading={isAnalyzing} />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
          </form>
        </Form>
        <Separator className="my-6" />
        <GoogleSignInButton disabled={isPending} />
      </TabsContent>
    </Tabs>
  );
}
