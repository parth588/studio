import { AuthForm } from '@/components/auth/auth-form';
import { ShieldCheck, Zap, MessageSquareQuote } from 'lucide-react';

const Logo = () => (
    <div className="flex items-center gap-2">
        <span className="font-bold text-2xl text-white">Big4India</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#FDBA74"/>
            <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4.5V19.5" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19.071 4.92896C15.1658 1.0237 8.83418 1.0237 4.92893 4.92896" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21.2929 7.15178C17.3877 3.24653 11.056 3.24653 7.15076 7.15178" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
);


export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl grid lg:grid-cols-2">
        <div className="bg-blue-600 text-white p-12 rounded-l-2xl flex flex-col justify-between">
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
        <div className="p-12">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
