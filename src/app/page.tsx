import { AuthForm } from '@/components/auth/auth-form';
import { ShieldCheck, Zap, MessageSquareQuote } from 'lucide-react';

const Logo = () => (
  <div className="flex items-center">
    <svg width="240" height="72" viewBox="0 0 240 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="10" y="50" fontFamily="Poppins, sans-serif" fontSize="40" fontWeight="bold" fill="#0D2E5E">
        Big4
      </text>
      <g clipPath="url(#clip0_1_2)">
        <text x="105" y="50" fontFamily="Poppins, sans-serif" fontSize="40" fontWeight="bold" fill="#0D2E5E">
          India
        </text>
      </g>
      <defs>
        <clipPath id="clip0_1_2">
          <rect x="105" y="0" width="135" height="40" />
        </clipPath>
      </defs>
      <circle cx="185" cy="22" r="20" stroke="#F97316" strokeWidth="3" fill="none"/>
      <circle cx="185" cy="22" r="2" fill="#F97316"/>
      {[...Array(24)].map((_, i) => (
        <line
          key={i}
          x1="185"
          y1="22"
          x2={185 + 18 * Math.cos((i * 15 * Math.PI) / 180)}
          y2={22 + 18 * Math.sin((i * 15 * Math.PI) / 180)}
          stroke="#F97316"
          strokeWidth="1.5"
        />
      ))}
      <rect x="110" y="60" width="90" height="5" rx="2.5" fill="#F97316" />
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
