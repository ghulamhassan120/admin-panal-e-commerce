
"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  Flame,
  ShieldCheck,
  Zap,
  LockKeyhole,
} from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
 const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
const router = useRouter();
const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const response = await axios.post('https://e-cormarce-8qgn.vercel.app/api/auth/login', {
      email,
      password
    });

    // LocalStorage mein user data save karein
    localStorage.setItem('userInfo', JSON.stringify(response.data));

    // Role check karke redirection
    if (response.data.user.role === 'admin') {
      toast.success('Welcome Admin!');
      router.push('/'); // Admin panel ka route
    } else {
      toast.error('Login successful!');
      router.push('/'); // Client home page
    }
  } catch (err:any) {
    alert(err.response?.data?.error || 'Login failed');
  }finally {
      setLoading(false);
    }
};
  return (
    <main className="min-h-screen bg-[#0e1933] flex flex-col items-center justify-center px-4 py-8">

      {/* Login Card */}
      <div className="w-full max-w-[427px] rounded-lg bg-[#202c49] px-5 sm:px-[21px] py-7 sm:py-6">

        {/* Logo */}
        <div className="flex justify-center items-center gap-2 mb-9">
          <div className="text-3xl">🫐</div>
          <h1 className="text-white font-bold text-lg tracking-tight">
            BERRY
          </h1>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-[#9147ff] text-[22px] font-bold mb-2">
            Hi, Welcome Back
          </h2>
          <p className="text-[#91a8d8] text-sm">
            Enter your credentials to continue
          </p>
        </div>

        {/* Login Form */}
        <form
          className="space-y-3.5"
          onSubmit={handleLogin}
        >
          {/* Email */}
          <div className="border border-[#3a4965] rounded-lg px-3 py-2.5 bg-[#182541] focus-within:border-[#8747ff] transition">
            <label className="block text-[#91a8d8] text-[10px] mb-0.5">
              Email Address / Username
            </label>
            <input
              type="text"
              placeholder="admin@shop.co"
              name="email"
              value={email}
            onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-white text-sm outline-none placeholder:text-blue-200"
              required
            />
          </div>

          {/* Password */}
          <div className="border border-[#3a4965] rounded-lg px-3 py-2.5 bg-[#182541] flex items-center focus-within:border-[#8747ff] transition">
            <div className="flex-1">
              <label className="block text-[#91a8d8] text-[10px] mb-0.5">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="*******"
                name="password"
                value={password}
            onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-white text-sm outline-none"
                required
              />
            </div>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[#60718f] hover:text-white ml-2"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <Eye size={17} />
              ) : (
                <EyeOff size={17} />
              )}
            </button>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between py-1">
            <label className="flex items-center gap-2.5 text-white text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 accent-[#8747ff] cursor-pointer"
              />
              Keep me logged in
            </label>

            <a
              href="/forgot-password"
              className="text-[#9147ff] hover:text-purple-300 text-xs font-medium"
            >
              Forgot Password?
            </a>
          </div>

          {/* Sign In */}
          <button
            type="submit"
            className="w-full h-[41px] rounded-lg bg-[#8545f7] hover:bg-[#7435e8] text-white text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Divider */}
        <div className="border-t border-[#35435e] mt-3 mb-4" />

        {/* Register */}
        <p className="text-center text-xs text-white">
          Don't have an account?{" "}
        </p>
      </div>

      {/* Authentication Providers */}
      <div className="w-full max-w-[427px] grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5">

        <button className="h-[40px] border border-[#64728a] rounded-lg flex items-center justify-center gap-2 text-white text-xs font-semibold hover:bg-[#202c49] transition">
          <Flame size={17} className="text-orange-400 fill-orange-400" />
          Firebase
        </button>

        <button className="h-[40px] border border-[#64728a] rounded-lg flex items-center justify-center gap-2 text-white text-xs font-semibold hover:bg-[#202c49] transition">
          <ShieldCheck size={17} className="text-green-500" />
          Auth0
        </button>

        <button className="h-[40px] border border-[#64728a] rounded-lg flex items-center justify-center gap-2 text-white text-xs font-semibold hover:bg-[#202c49] transition">
          <span className="text-orange-400 font-bold">aws</span>
          Aws
        </button>

        <button className="h-[40px] border border-[#64728a] rounded-lg flex items-center justify-center gap-2 text-white text-xs font-semibold hover:bg-[#202c49] transition">
          <Zap size={17} className="text-green-500 fill-green-500" />
          Supabase
        </button>

      </div>
    </main>
  );
}
