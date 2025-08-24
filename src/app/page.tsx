import { AuthForm } from '@/components/auth/auth-form';
import Image from 'next/image';
import { Lock } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="flex justify-center items-center gap-2">
                <Lock className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold font-headline">FinTrack Access</h1>
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
          data-ai-hint="finance security"
        />
      </div>
    </div>
  );
}
