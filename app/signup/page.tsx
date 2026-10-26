'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form Fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Google Sign-Up Handler
  const handleGoogleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/builder`,
        },
      });
      if (error) alert(error.message);
    } catch (err: any) {
      alert(err.message || 'Google Auth Error');
    }
  };

  // Email/Password Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!agreeTerms) {
      alert("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            full_name: `${firstName} ${lastName}`.trim(),
          },
        },
      });

      if (error) throw error;

      alert('Account created successfully! Redirecting to workspace...');
      router.push('/builder');
    } catch (error: any) {
      alert(error.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-900 font-sans text-slate-100">
      
      {/* 👈 LEFT PANEL: Dark Branding & Testimonials Section */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-12 border-r border-slate-800/60 relative overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

        {/* Top Header Logo */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-500 to-cyan-400 font-bold text-white shadow-lg shadow-blue-500/25">
            ✨
          </div>
          <span className="text-xl font-bold tracking-tight text-white">ResumeAI</span>
        </div>

        {/* Hero Pitch Content */}
        <div className="relative z-10 my-auto max-w-lg space-y-6 pt-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-400 backdrop-blur-md">
            <span>✨ Join 50,000+ career builders</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight">
            Your dream job <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">starts here</span>
          </h1>

          <p className="text-sm leading-relaxed text-slate-400">
            Create your free account and get access to AI-powered resume building, LinkedIn tools, and expert templates in minutes.
          </p>

          {/* Features List */}
          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
                📄
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-200">ATS-Optimized Resume Builder</h4>
                <p className="text-xs text-slate-400">Build resumes that pass automated screening systems at top companies.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
                🔗
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-200">LinkedIn Summary Generator</h4>
                <p className="text-xs text-slate-400">AI-crafted summaries that attract recruiters and showcase your unique value.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                💬
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-200">Personalized Outreach Messages</h4>
                <p className="text-xs text-slate-400">Smart networking messages that feel authentic and get real responses.</p>
              </div>
            </div>
          </div>

          {/* Social Proof Testimonial Card */}
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-lg shadow-xl">
            <p className="text-xs italic text-slate-300">
              "ResumeAI helped me land interviews at Google and Meta within 2 weeks. The ATS optimization feature is genuinely game-changing."
            </p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 font-bold text-white text-xs">
                  MJ
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-white">Mansi Jagetiya</h5>
                  <p className="text-[11px] text-slate-400">Software Engineer — hired at Meta</p>
                </div>
              </div>
              <div className="flex text-amber-400 text-xs gap-0.5">
                ★ ★ ★ ★ ★
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-500">
          <span>© 2026 ResumeAI. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition">Contact</a>
          </div>
        </div>
      </div>


      {/* 👉 RIGHT PANEL: White Clean Form Section */}
      <div className="flex w-full lg:w-1/2 flex-col justify-between bg-white px-6 py-8 sm:px-12 lg:px-16 text-slate-800">
        
        {/* Top Header Sign-in Switcher */}
        <div className="flex items-center justify-between">
          <div className="lg:hidden flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
              ✨
            </div>
            <span className="font-bold text-slate-900">ResumeAI</span>
          </div>

          <div className="ml-auto text-xs sm:text-sm text-slate-500">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2 ml-1"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Form Container */}
        <div className="mx-auto my-auto w-full max-w-md space-y-6 py-8">
          
          {/* Step Progress Bar (1. Account -> 2. Template -> 3. Build) */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-6 text-xs font-semibold text-slate-400">
            <div className="flex items-center gap-2 text-blue-600">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">1</span>
              <span>Account</span>
            </div>
            <div className="h-0.5 w-8 bg-slate-100"></div>
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px]">2</span>
              <span>Template</span>
            </div>
            <div className="h-0.5 w-8 bg-slate-100"></div>
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px]">3</span>
              <span>Build</span>
            </div>
          </div>

          {/* Form Title */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Create your account
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              Free forever — no credit card required
            </p>
          </div>

          {/* Social Sign-in Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition shadow-sm"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Google
            </button>

            <button
              type="button"
              onClick={() => alert("LinkedIn Signup can be configured in Supabase OAuth.")}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition shadow-sm"
            >
              <svg className="h-4 w-4 fill-[#0A66C2]" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
              LinkedIn
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-slate-200"></div>
            <span className="absolute bg-white px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              OR CONTINUE WITH EMAIL
            </span>
          </div>

          {/* Email / Password Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">First Name</label>
                <input
                  type="text"
                  required
                  placeholder="Sarah"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name</label>
                <input
                  type="text"
                  required
                  placeholder="Johnson"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Work or Personal Email</label>
              <input
                type="email"
                required
                placeholder="sarah@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password</label>
              <input
                type="password"
                required
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="terms" className="text-[11px] text-slate-500 leading-tight">
                I agree to the <a href="#" className="text-blue-600 font-medium">Terms of Service</a> and <a href="#" className="text-blue-600 font-medium">Privacy Policy</a>. You'll get occasional product updates.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-cyan-500/25 hover:opacity-95 transition disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Free Account →"}
            </button>
          </form>

          {/* Trust Badges */}
          <div className="pt-4 flex items-center justify-center gap-6 text-[11px] font-medium text-slate-400 border-t border-slate-100">
            <span className="flex items-center gap-1">🔒 SSL Secured</span>
            <span className="flex items-center gap-1">🛡️ GDPR Compliant</span>
            <span className="flex items-center gap-1">⭐ 4.9 / 5 Rating</span>
          </div>

        </div>

        {/* Mobile Footer */}
        <div className="lg:hidden text-center text-xs text-slate-400 py-2">
          © 2026 ResumeAI. All rights reserved.
        </div>

      </div>

    </div>
  );
}