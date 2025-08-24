import { AuthForm } from '@/components/auth/auth-form';
import { ShieldCheck, Zap, MessageSquareQuote } from 'lucide-react';

const Logo = () => (
    <div className="flex items-center">
        <h1 className="text-4xl font-bold text-white">Big4India</h1>
    </div>
);


export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl grid lg:grid-cols-2">
        <div className="bg-blue-600 text-white p-12 rounded-l-2xl flex-col justify-between hidden lg:flex">
          <div>
            <Logo />
            <div className="mt-16">
              <h1 className="text-4xl font-bold tracking-tight">Streamline Your Finances.</h1>
              <p className="mt-4 text-blue-100">
                Your all-in-one platform for taxation and compliance.
              </p>
            </div>
          </div>
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <ShieldCheck className="h-6 w-6 text-blue-300" />
              <span>Bank-level security for your data</span>
            </div>
            <div className="flex items-center gap-4">
              <Zap className="h-6 w-6 text-blue-300" />
              <span>Instant calculations & real-time updates</span>
            </div>
            <div className="flex items-center gap-4">
              <MessageSquareQuote className="h-6 w-6 text-blue-300" />
              <span>Dedicated expert support</span>
            </div>
          </div>
        </div>
        <div className="p-6 sm:p-12 flex items-center justify-center">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
