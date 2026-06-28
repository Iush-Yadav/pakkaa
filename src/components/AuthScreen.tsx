import React, { useState } from 'react';
import Logo from './Logo';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import BackgroundGrid from './BackgroundGrid';
import BorderGlow from './BorderGlow';
import MagicBento from './MagicBento';
import Mascot from './Mascot';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function AuthScreen({ onLogin }: { onLogin: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      if (result.user) {
        // Initialize UserStats if not exists
        const userStatsRef = doc(db, 'userStats', result.user.uid);
        const docSnap = await getDoc(userStatsRef);
        if (!docSnap.exists()) {
          await setDoc(userStatsRef, {
            userId: result.user.uid,
            reliabilityDays: 14,
            forfeitedAmount: 0,
            updatedAt: serverTimestamp()
          });
        }
        
        onLogin();
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert("Failed to authenticate with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 bg-white z-[90] flex flex-col items-center justify-start overflow-y-auto no-scrollbar py-12 px-6 animate-fade-in-delayed">
      <BackgroundGrid />
      
      {/* Outer Flex Container for Dual-Pane SaaS Presentation */}
      <div className="w-full max-w-6xl relative z-10 flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        
        {/* LEFT COLUMN: GORGEOUS BENTO FEATURES PANEL (Takes up 7 cols on large screens) */}
        <div className="w-full lg:col-span-7 flex flex-col justify-center text-left order-2 lg:order-1 mt-10 lg:mt-0">
          <div className="max-w-xl mb-6">
            <span className="font-mono text-[10px] text-brand-orange font-bold tracking-[0.25em] uppercase px-3 py-1 bg-brand-orange/5 rounded-full inline-block mb-3 border border-brand-orange/10 animate-pulse">
              TRUST ARCHITECTURE v2.4
            </span>
            <h2 className="font-sans font-black text-3xl lg:text-4xl text-black tracking-tighter leading-none">
              Commitment Escrow, Simplified.
            </h2>
            <p className="font-sans text-sm text-black/60 mt-3 leading-relaxed">
              Unlock the power of social commitments. Pakka enforces squad check-ins, locks real financial stakes, and redirects forfeits to world-changing charity protocols.
            </p>
          </div>

          {/* GSAP-Powered Interactive Magic Bento Grid */}
          <div className="w-full">
            <MagicBento 
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              glowColor="255, 77, 0"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: REQUISITE AUTH CONTAINER (Takes up 5 cols on large screens) */}
        <div className="w-full lg:col-span-5 flex justify-center order-1 lg:order-2">
          {/* BorderGlow wraps the Authentication form to draw stunning neon boundaries tracking cursor */}
          <BorderGlow
            glowColor="255 77 0"
            backgroundColor="rgba(255, 255, 255, 0.72)"
            borderRadius={28}
            glowRadius={220}
            glowIntensity={1.3}
            className="w-full max-w-md shadow-2xl backdrop-blur-xl border border-black/[0.03]"
          >
            <div className="p-8 sm:p-10 flex flex-col relative">
              <div className="absolute top-4 right-4 animate-bounce">
                <Mascot type="hello" className="w-12 h-12" />
              </div>
              <div className="flex flex-col items-center mb-8">
                <Logo className="w-14 h-14 mb-3 animate-pulse" />
                <h1 className="font-sans font-black text-2xl tracking-tighter text-black text-center">
                  Authenticate Identity
                </h1>
                <p className="font-mono text-[9px] text-black/40 font-bold tracking-widest uppercase mt-1.5">
                  INITIALIZE SOCIAL PROTOCOL
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full mt-2 py-4 bg-brand-orange hover:bg-brand-orange/95 active:scale-[0.99] transition-all rounded-xl text-white font-sans font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Authenticating...' : 'Sign In with Google'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-10 flex items-center justify-center gap-2 font-mono text-[9px] font-bold text-black/30 uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-orange/50" />
                <span>End-to-End Encrypted Escrow</span>
              </div>
            </div>
          </BorderGlow>
        </div>

      </div>
    </div>
  );
}
