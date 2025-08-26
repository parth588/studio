import { AuthForm } from '@/components/auth/auth-form';
import { ShieldCheck, Zap, MessageSquareQuote } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl grid lg:grid-cols-2">
        <div className="bg-blue-600 text-white p-12 rounded-l-2xl flex-col justify-between hidden lg:flex">
          <div>
            <div className="flex items-center">
                <h1 className="text-4xl font-bold text-white">Big4India</h1>
            </div>
            <div className="mt-16">
              <h1 className="text-4xl font-bold tracking-tight">Streamline Your Finances.</h1>
              <p className="mt-4 text-blue-100">
                Your all-in-one platform for taxation and compliance.
              </p>
            </div>
          </div>
          <div className="mt-16 space-y-8">
            <div className="flex items-start gap-4">
              <ShieldCheck className="h-8 w-8 text-blue-300 mt-1" />
              <div>
                <h3 className="font-semibold">Bank-Level Security</h3>
                <p className="text-blue-200 text-sm">Your data is encrypted and protected with the highest standards.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Zap className="h-8 w-8 text-blue-300 mt-1" />
              <div>
                <h3 className="font-semibold">Instant Calculations</h3>
                <p className="text-blue-200 text-sm">Get real-time updates and lightning-fast financial processing.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MessageSquareQuote className="h-8 w-8 text-blue-300 mt-1" />
              <div>
                <h3 className="font-semibold">Expert Support</h3>
                <p className="text-blue-200 text-sm">Our dedicated team is here to help you every step of the way.</p>
              </div>
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
