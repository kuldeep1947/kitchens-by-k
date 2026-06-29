"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, WifiOff, X } from "lucide-react";

interface BIPEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * PWAManager — custom "Add to Home Screen" prompt + an offline indicator.
 * Makes the site feel like a native app. No backend involved.
 */
export default function PWAManager() {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
    };
    const onInstalled = () => setDeferred(null);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);

    setOffline(!navigator.onLine);
    const goOnline = () => setOffline(false);
    const goOffline = () => setOffline(true);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
  };

  const showInstall = deferred && !dismissed;

  return (
    <>
      <AnimatePresence>
        {offline && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            role="status"
            className="glass-strong fixed left-1/2 top-4 z-[80] flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium text-slate-700 dark:text-slate-200"
          >
            <WifiOff size={15} className="text-amber-500" />
            You’re offline — showing cached content
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showInstall && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="glass-strong fixed bottom-6 left-6 z-50 flex max-w-xs items-center gap-3 rounded-2xl p-3 glow-ring"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-saffron/15 text-saffron">
              <Download size={18} />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-slate-900 dark:text-white">Install Kitchens by K</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Add to your home screen for instant access.</p>
            </div>
            <button
              onClick={install}
              className="shrink-0 rounded-xl bg-saffron px-3 py-1.5 text-[12px] font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Install
            </button>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss install prompt"
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300"
            >
              <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
