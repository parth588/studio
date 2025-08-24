import { AuthForm } from '@/components/auth/auth-form';
import { ShieldCheck, Zap, MessageSquareQuote } from 'lucide-react';

const Logo = () => (
    <div className="flex items-center">
        <svg width="240" height="72" viewBox="0 0 240 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="10" y="50" fontFamily="Poppins, sans-serif" fontSize="40" fontWeight="bold" fill="white">Big4India</text>
            <g transform="translate(185, 22)">
                <circle cx="0" cy="0" r="20" stroke="#FFFFFF" strokeWidth="3" fill="none" />
                <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
                {[...Array(24)].map((_, i) => (
                    <line
                        key={i}
                        x1="0"
                        y1="0"
                        x2={18 * Math.cos((i * 15 * Math.PI) / 180)}
                        y2={18 * Math.sin((i * 15 * Math.PI) / 180)}
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                    />
                ))}
            </g>
            <rect x="110" y="60" width="90" height="5" rx="2.5" fill="#F97316" />
        </svg>
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
