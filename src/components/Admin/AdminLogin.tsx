import React, { useState } from 'react';
import { BrandLogo } from '../BrandLogo';
import { ShieldCheck, Lock, User, ArrowRight, AlertCircle, X } from 'lucide-react';
import { setAdminAuth } from '../../services/api';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  if (!isOpen) return null;

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('Boulevard@2026');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        const data = await res.json();
        setAdminAuth(data.token);
        onLoginSuccess();
        return;
      }
    } catch (err) {
      // Local check fallback
    }

    if ((username === 'admin' && (password === 'Boulevard@2026' || password === '122436')) || password === 'Boulevard@2026') {
      setAdminAuth('admin-authenticated-session-token');
      onLoginSuccess();
    } else {
      setError('Invalid username or password credentials. Please check with F&B Management.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs transition-opacity animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#C5A059]/40 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Banner */}
        <div className="p-8 bg-gradient-to-br from-[#0B192C] via-[#152A4A] to-[#070F1A] text-white text-center relative">
          <div className="mb-3 flex justify-center">
            <BrandLogo size="md" variant="light" showSubtitle={false} />
          </div>
          <h3 className="font-serif font-bold text-2xl text-white">
            Staff & F&B Portal
          </h3>
          <p className="text-xs text-[#E6C280] tracking-wider uppercase font-medium mt-1">
            Hotel Atithi — TGI Grand
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
              Staff Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl text-xs sm:text-sm border border-slate-300 focus:border-[#C5A059] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">
              Secure Password / PIN
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl text-xs sm:text-sm border border-slate-300 focus:border-[#C5A059] focus:outline-none"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick Demo Credentials Info for Testing */}
          <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#C5A059]/30 text-[11px] text-[#9A7730]">
            <p className="font-bold">Authorized Default Credentials:</p>
            <p>Username: <code className="bg-white/80 px-1 py-0.5 rounded text-[#0B192C]">admin</code></p>
            <p>Password: <code className="bg-white/80 px-1 py-0.5 rounded text-[#0B192C]">Boulevard@2026</code> (or PIN: <code className="bg-white/80 px-1 py-0.5 rounded text-[#0B192C]">122436</code>)</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#0B192C] to-[#152A4A] hover:from-[#152A4A] hover:to-[#0B192C] border border-[#C5A059] shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4 text-[#E6C280]" />
          </button>
        </form>
      </div>
    </div>
  );
};
