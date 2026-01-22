
import React, { useState, useEffect, useCallback } from 'react';
import { INITIAL_CMS_STATE } from './constants';
import { CMSState } from './types';
import AdminPanel from './components/AdminPanel';
import SiteRenderer from './components/SiteRenderer';
import { SetupWizard } from './components/SetupWizard';

const App: React.FC = () => {
  const [cmsState, setCmsState] = useState<CMSState>(() => {
    const saved = localStorage.getItem('sanjanalite_state');
    return saved ? JSON.parse(saved) : INITIAL_CMS_STATE;
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('sanjanalite_is_auth') === 'true';
  });
  
  const [isAdminPath, setIsAdminPath] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');
  const [loginPassword, setLoginPassword] = useState('');

  // Persist CMS state to localStorage
  useEffect(() => {
    localStorage.setItem('sanjanalite_state', JSON.stringify(cmsState));
  }, [cmsState]);

  // Optimized Routing Logic
  const handleHashRouting = useCallback(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/admin')) {
      setIsAdminPath(true);
    } else {
      setIsAdminPath(false);
      // Ensure we extract the clean path (e.g., #/services -> /services)
      const path = hash.replace('#', '') || '/';
      setCurrentPath(path === '' ? '/' : path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', handleHashRouting);
    handleHashRouting();
    return () => window.removeEventListener('hashchange', handleHashRouting);
  }, [handleHashRouting]);

  const handleUpdateState = (newState: Partial<CMSState>) => {
    setCmsState(prev => ({ ...prev, ...newState }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const savedCreds = localStorage.getItem('sanjanalite_auth');
    if (savedCreds) {
      const { password } = JSON.parse(savedCreds);
      if (loginPassword === password) {
        setIsAuthenticated(true);
        sessionStorage.setItem('sanjanalite_is_auth', 'true');
      } else {
        alert('Invalid passcode. Access Denied.');
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('sanjanalite_is_auth');
    window.location.hash = '#/';
  };

  if (cmsState.isFirstRun) {
    return (
      <SetupWizard 
        onComplete={(adminData) => {
          localStorage.setItem('sanjanalite_auth', JSON.stringify({
            email: adminData.email,
            password: adminData.password
          }));
          handleUpdateState({ isFirstRun: false, settings: { ...cmsState.settings, siteName: adminData.siteName } });
          setIsAuthenticated(true);
          sessionStorage.setItem('sanjanalite_is_auth', 'true');
          window.location.hash = '#/admin';
        }} 
      />
    );
  }

  if (isAdminPath) {
    if (!isAuthenticated) {
      return (
        <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-6">
          <form onSubmit={handleLogin} className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-12 border border-[#D2D2D7] text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="w-16 h-16 bg-[#1D1D1F] rounded-2xl flex items-center justify-center font-bold text-white text-3xl mx-auto mb-8 shadow-xl">S</div>
            <h1 className="text-2xl font-bold tracking-tight mb-8">Studio Authentication</h1>
            <input 
              type="password" 
              placeholder="Enter Passcode"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border border-[#D2D2D7] focus:border-[#1D1D1F] outline-none mb-6 text-center text-lg tracking-widest font-mono"
              autoFocus
            />
            <button type="submit" className="w-full bg-[#1D1D1F] text-white py-4 rounded-full font-bold hover:bg-black transition-all active:scale-[0.98]">
              Unlock Studio
            </button>
            <button type="button" onClick={() => window.location.hash = '#/'} className="mt-6 text-xs text-[#86868B] font-bold uppercase tracking-widest hover:text-black transition-colors">Return to Site</button>
          </form>
        </div>
      );
    }

    return (
      <AdminPanel 
        state={cmsState} 
        onUpdate={handleUpdateState} 
        onLogout={handleLogout}
      />
    );
  }

  return (
    <SiteRenderer 
      state={cmsState} 
      currentPath={currentPath}
      onNavigate={(path) => window.location.hash = `#${path}`}
    />
  );
};

export default App;
