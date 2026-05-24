import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';

const content = {
  en: {
    loginTitle: 'Welcome Back',
    loginDesc: 'Sign in to save your favorite properties',
    registerTitle: 'Create Account',
    registerDesc: 'Join to save and track properties you love',
    name: 'Full Name',
    email: 'Email',
    password: 'Password',
    loginBtn: 'Sign In',
    registerBtn: 'Create Account',
    switchToRegister: "Don't have an account?",
    switchToLogin: 'Already have an account?',
    signUp: 'Sign Up',
    signIn: 'Sign In',
    orContinueWith: 'or continue with',
    googleBtn: 'Continue with Google',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'your@email.com',
    passwordPlaceholder: 'Min 6 characters',
  },
  es: {
    loginTitle: 'Bienvenido',
    loginDesc: 'Inicia sesi\u00F3n para guardar tus propiedades favoritas',
    registerTitle: 'Crear Cuenta',
    registerDesc: '\u00DAnete para guardar y seguir las propiedades que te gustan',
    name: 'Nombre Completo',
    email: 'Correo Electr\u00F3nico',
    password: 'Contrase\u00F1a',
    loginBtn: 'Iniciar Sesi\u00F3n',
    registerBtn: 'Crear Cuenta',
    switchToRegister: '\u00BFNo tienes cuenta?',
    switchToLogin: '\u00BFYa tienes cuenta?',
    signUp: 'Reg\u00EDstrate',
    signIn: 'Inicia Sesi\u00F3n',
    orContinueWith: 'o continuar con',
    googleBtn: 'Continuar con Google',
    namePlaceholder: 'Tu nombre',
    emailPlaceholder: 'tu@email.com',
    passwordPlaceholder: 'M\u00EDn. 6 caracteres',
  },
  ar: {
    loginTitle: '\u0645\u0631\u062D\u0628\u0627\u064B \u0628\u0639\u0648\u062F\u062A\u0643',
    loginDesc: '\u0633\u062C\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0644\u062D\u0641\u0638 \u0627\u0644\u0639\u0642\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0641\u0636\u0644\u0629',
    registerTitle: '\u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628',
    registerDesc: '\u0627\u0646\u0636\u0645 \u0644\u062D\u0641\u0638 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0639\u0642\u0627\u0631\u0627\u062A \u0627\u0644\u062A\u064A \u062A\u0639\u062C\u0628\u0643',
    name: '\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644',
    email: '\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A',
    password: '\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631',
    loginBtn: '\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644',
    registerBtn: '\u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628',
    switchToRegister: '\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u062D\u0633\u0627\u0628\u061F',
    switchToLogin: '\u0644\u062F\u064A\u0643 \u062D\u0633\u0627\u0628 \u0628\u0627\u0644\u0641\u0639\u0644\u061F',
    signUp: '\u0633\u062C\u0644 \u0627\u0644\u0622\u0646',
    signIn: '\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644',
    orContinueWith: '\u0623\u0648 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0628\u0640',
    googleBtn: '\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0628\u062C\u0648\u062C\u0644',
    namePlaceholder: '\u0627\u0633\u0645\u0643',
    emailPlaceholder: 'your@email.com',
    passwordPlaceholder: '6 \u0623\u062D\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644',
  }
};

const AuthModal = ({ isOpen, onClose, defaultMode = 'register' }) => {
  const { language } = useLanguage();
  const { login, register } = useAuth();
  const isRTL = language === 'ar';
  const txt = content[language] || content.en;

  const [mode, setMode] = useState(defaultMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    setMode(defaultMode);
    setError('');
    setName('');
    setEmail('');
    setPassword('');
  }, [isOpen, defaultMode]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'register') {
        if (password.length < 6) { setError('Password must be at least 6 characters'); setLoading(false); return; }
        await register(name, email, password);
      } else {
        await login(email, password);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    const redirectUrl = window.location.origin + '/';
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        ref={modalRef}
        dir={isRTL ? 'rtl' : 'ltr'}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
        data-testid="auth-modal"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-[#0a1628] to-[#142240] p-6 text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors" data-testid="auth-modal-close">
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold text-white mb-1" data-testid="auth-modal-title">
            {mode === 'login' ? txt.loginTitle : txt.registerTitle}
          </h2>
          <p className="text-gray-300 text-sm">
            {mode === 'login' ? txt.loginDesc : txt.registerDesc}
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Google Auth */}
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700"
            data-testid="auth-google-btn"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            {txt.googleBtn}
          </button>

          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="flex-1 border-t border-gray-200" />
            <span className="px-4 text-sm text-gray-400">{txt.orContinueWith}</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="relative">
                <User className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3' : 'left-3'} w-4 h-4 text-gray-400`} />
                <Input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={txt.namePlaceholder}
                  required
                  className={`${isRTL ? 'pr-10' : 'pl-10'} h-12`}
                  data-testid="auth-name-input"
                />
              </div>
            )}
            <div className="relative">
              <Mail className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3' : 'left-3'} w-4 h-4 text-gray-400`} />
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={txt.emailPlaceholder}
                required
                className={`${isRTL ? 'pr-10' : 'pl-10'} h-12`}
                data-testid="auth-email-input"
              />
            </div>
            <div className="relative">
              <Lock className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3' : 'left-3'} w-4 h-4 text-gray-400`} />
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={txt.passwordPlaceholder}
                required
                className={`${isRTL ? 'pr-10 pl-10' : 'pl-10 pr-10'} h-12`}
                data-testid="auth-password-input"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-3' : 'right-3'} text-gray-400 hover:text-gray-600`}>
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm text-center" data-testid="auth-error">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#d4a650] hover:bg-[#c49640] text-[#0a1628] font-semibold text-base rounded-xl"
              data-testid="auth-submit-btn"
            >
              {loading ? '...' : (mode === 'login' ? txt.loginBtn : txt.registerBtn)}
            </Button>
          </form>

          {/* Switch mode */}
          <p className="text-center text-sm text-gray-500 mt-5">
            {mode === 'login' ? txt.switchToRegister : txt.switchToLogin}{' '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              className="text-[#d4a650] font-semibold hover:underline"
              data-testid="auth-switch-mode"
            >
              {mode === 'login' ? txt.signUp : txt.signIn}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
