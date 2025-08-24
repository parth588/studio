import { AuthForm } from '@/components/auth/auth-form';
import Image from 'next/image';

const Logo = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 7L12 12L22 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 12V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


export default function Home() {
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="flex justify-center items-center gap-2">
                <Logo />
                <h1 className="text-3xl font-bold font-headline">Big4India</h1>
            </div>
            <p className="text-balance text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          <AuthForm />
        </div>
      </div>
      <div className="hidden bg-primary lg:flex items-center justify-center p-8">
        <Image
          src="https://placehold.co/800x600.png"
          alt="Image"
          width="800"
          height="600"
          className="h-auto w-auto max-w-lg rounded-lg shadow-2xl"
          data-ai-hint="consulting business"
        />
      </div>
    </div>
  );
}
