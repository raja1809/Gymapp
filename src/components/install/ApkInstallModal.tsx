import React, { useState, useEffect } from 'react';
import { X, Smartphone, Download, QrCode, CheckCircle2, Copy, ExternalLink, Terminal, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ApkInstallModal: React.FC = () => {
  const { showApkModal, setShowApkModal } = useApp();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  if (!showApkModal) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'http://localhost:5173';

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstallSuccess(true);
      }
      setDeferredPrompt(null);
    } else {
      alert("To install on Android: Open this page in Chrome on her phone, tap the three dots in the top right corner, and select 'Install App' or 'Add to Home Screen'!");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold leading-tight">
                Install App on Mom's Phone
              </h3>
              <p className="text-xs text-teal-100 mt-0.5">
                Android WebAPK & Standalone Home Screen App
              </p>
            </div>
          </div>

          <button onClick={() => setShowApkModal(false)} className="text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[72vh] overflow-y-auto">
          {/* Quick 1-Tap PWA Install Button */}
          <div className="p-5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-900/60 text-center space-y-3">
            <h4 className="text-sm font-bold text-teal-950 dark:text-teal-200">
              Direct Phone Installation
            </h4>
            <p className="text-xs text-teal-800 dark:text-teal-300 max-w-sm mx-auto leading-relaxed">
              Installs FamilyFit directly as an Android app with its own home screen icon, fullscreen view (no browser bars), and offline support!
            </p>

            <button
              onClick={handleInstallClick}
              className="w-full max-w-xs mx-auto py-3 px-5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-md transition active:scale-95 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{installSuccess ? 'Installed on Phone! ✓' : 'Install FamilyFit App'}</span>
            </button>
          </div>

          {/* 3-Step Phone Installation Guide */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              How to install onto her Android phone in 10 seconds:
            </h4>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 font-bold flex items-center justify-center flex-shrink-0">1</span>
                <div>
                  <strong>Send Link to her Phone:</strong> Open Chrome on her phone and visit your deployed URL or local IP address.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 font-bold flex items-center justify-center flex-shrink-0">2</span>
                <div>
                  <strong>Tap Chrome Menu:</strong> Tap the <strong>three vertical dots (⋮)</strong> in the top-right corner of Chrome.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 font-bold flex items-center justify-center flex-shrink-0">3</span>
                <div>
                  <strong>Tap 'Install App' or 'Add to Home screen':</strong> Android automatically packages it into a native WebAPK on her home screen with the FamilyFit icon.
                </div>
              </div>
            </div>
          </div>

          {/* Shareable Link Box */}
          <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2">
            <span className="text-xs font-mono text-slate-600 dark:text-slate-300 truncate max-w-xs">
              {currentUrl}
            </span>
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 flex items-center gap-1 flex-shrink-0"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>

          {/* Capacitor Native APK Build Instructions for Developers */}
          <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 text-xs space-y-2 font-mono">
            <div className="flex items-center gap-2 text-teal-400 font-bold">
              <Terminal className="w-4 h-4" />
              <span>To compile a standalone .APK via Capacitor:</span>
            </div>
            <div className="space-y-1 text-[11px] text-slate-300 bg-slate-950 p-2.5 rounded-lg">
              <div>npm run build</div>
              <div>npx cap add android</div>
              <div>npx cap open android &gt; Click Build APK in Android Studio</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={() => setShowApkModal(false)}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

