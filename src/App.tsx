import React, { useState, useEffect } from 'react';
import { 
  Home as HomeIcon, 
  Users as UsersIcon, 
  Plus, 
  BarChart2, 
  User as UserIcon, 
  Menu, 
  Bell, 
  Settings as SettingsIcon, 
  HelpCircle,
  TrendingUp,
  ShieldAlert,
  Flame,
  X,
  AlertTriangle
} from 'lucide-react';
import { auth, db } from './lib/firebase';
import { collection, query, where, onSnapshot, addDoc, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import confetti from 'canvas-confetti';

// Components
import BackgroundGrid from './components/BackgroundGrid';
import Logo from './components/Logo';
import WelcomeScreen from './components/WelcomeScreen';
import AuthScreen from './components/AuthScreen';
import Dashboard from './components/Dashboard';
import LivePact from './components/LivePact';
import Scanner from './components/Scanner';
import SplitBill from './components/SplitBill';
import Confirmation from './components/Confirmation';
import CreatePact from './components/CreatePact';
import CharityConsequence from './components/CharityConsequence';
import Groups from './components/Groups';
import Settings from './components/Settings';
import StakeLocked from './components/StakeLocked';

// Types
import { Pact, AppSettings } from './types';

export default function App() {
  // App Entry State
  const [appState, setAppState] = useState<'welcome' | 'auth' | 'app'>('welcome');
  const [userId, setUserId] = useState<string | null>(null);

  // Navigation States
  const [currentTab, setCurrentTab] = useState<string>('home'); // 'home' | 'groups' | 'create' | 'stats' | 'profile'
  const [activeScreen, setActiveScreen] = useState<string>('dashboard_home'); // 'dashboard_home' | 'live_pact' | 'split_bill' | 'confirmation' | 'consequence' | 'stake_locked'

  
  // Side Menu Drawer Toggle
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  
  // Data States
  const [pacts, setPacts] = useState<Pact[]>([]);

  const [selectedPact, setSelectedPact] = useState<Pact | null>(null);
  const [reliabilityDays, setReliabilityDays] = useState(14);
  const [forfeitedAmount, setForfeitedAmount] = useState(25);
  
  const [billData, setBillData] = useState({ amount: 150, recipient: 'Dharpur Dhaba', payor: 'Alex Khanna' });
  const [draftedPactAmount, setDraftedPactAmount] = useState(50);

  const [settings, setSettings] = useState<AppSettings>({
    phone: '+91 98765 43210',
    upiId: 'alex@ybl',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    isPro: true,
    biometricLock: true
  });

  // Load from local storage if available
  useEffect(() => {
    const savedSettings = localStorage.getItem('pakka_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        if (appState !== 'app') {
          setAppState('app');
        }
      } else {
        setUserId(null);
        if (appState === 'app') {
          setAppState('welcome');
        }
      }
    });

    return () => unsubscribeAuth();
  }, [appState]);

  useEffect(() => {
    if (!userId) return;

    // Listen to user stats
    const unsubscribeStats = onSnapshot(doc(db, 'userStats', userId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setReliabilityDays(data.reliabilityDays || 0);
        setForfeitedAmount(data.forfeitedAmount || 0);
      }
    });

    // Listen to pacts
    const q = query(collection(db, 'pacts'), where('ownerId', '==', userId));
    const unsubscribePacts = onSnapshot(q, (snapshot) => {
      const fetchedPacts: Pact[] = [];
      snapshot.forEach((doc) => {
        fetchedPacts.push({ id: doc.id, ...doc.data() } as Pact);
      });
      setPacts(fetchedPacts);
    });

    return () => {
      unsubscribeStats();
      unsubscribePacts();
    };
  }, [userId]);

  // Sync to local storage for settings
  const handleUpdateSettings = (updates: Partial<AppSettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    localStorage.setItem('pakka_settings', JSON.stringify(newSettings));
  };

  // Check In Solo Pact from Dashboard
  const handleCheckInPact = async (pactId: string) => {
    if (!userId) return;
    try {
      await updateDoc(doc(db, 'pacts', pactId), {
        completionRate: 100
      });
      await updateDoc(doc(db, 'userStats', userId), {
        reliabilityDays: reliabilityDays + 1,
        updatedAt: serverTimestamp()
      });
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d00', '#ff7300', '#ffffff']
      });
    } catch (e) {
      console.error(e);
    }
  };

  // User Check-In completed from Geolocation radar
  const handleLiveCheckedIn = async () => {
    if (selectedPact && userId) {
      try {
        await updateDoc(doc(db, 'pacts', selectedPact.id), {
          successRate: 100,
          completionRate: 100
        });
        await updateDoc(doc(db, 'userStats', userId), {
          reliabilityDays: reliabilityDays + 1,
          updatedAt: serverTimestamp()
        });
        
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ff4d00', '#ff7300', '#ffffff']
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Final Bill Settlement release trigger
  const handleConfirmReleaseBill = (amount: number, recipient: string, payor: string) => {
    setBillData({ amount, recipient, payor });
    setActiveScreen('confirmation');
  };

  // Locking a newly drafted pact from builder
  const handleLockNewPact = async (newPactData: Partial<Pact>) => {
    if (!userId) return;
    
    const newPact = {
      title: newPactData.title || 'Untitled Commitment',
      membersCount: 1,
      endsInDays: newPactData.endsInDays || 7,
      successRate: 100,
      completionRate: 0,
      isSolo: true,
      frequency: 'Daily',
      stakeAmount: newPactData.stakeAmount || 50,
      consequenceType: newPactData.consequenceType || 'anti-charity',
      status: 'locked',
      date: newPactData.date || new Date().toISOString(),
      time: newPactData.time || '08:00',
      locationName: 'Designated Target Radius',
      locationCoords: newPactData.locationCoords || { lat: 0, lng: 0 },
      ownerId: userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    try {
      await addDoc(collection(db, 'pacts'), newPact);
      setDraftedPactAmount(newPact.stakeAmount);
      setActiveScreen('stake_locked');
    } catch (e) {
      console.error(e);
      alert('Failed to create pact');
    }
  };

  // Handle Tab Switch Actions
  const handleTabClick = (tab: string) => {
    setCurrentTab(tab);
    setDrawerOpen(false);
    
    if (tab === 'home') {
      setActiveScreen('dashboard_home');
    } else if (tab === 'stats') {
      setActiveScreen('scanner');
    } else if (tab === 'create') {
      setActiveScreen('create_pact');
    } else {
      setActiveScreen('sub_page');
    }
  };

  // Simulated missed commitment trigger to view Screen 7 (Donation/Consequence results page)
  const triggerSimulatedForfeit = async () => {
    if (userId) {
      try {
        await updateDoc(doc(db, 'userStats', userId), {
          forfeitedAmount: forfeitedAmount + 600,
          reliabilityDays: 0,
          updatedAt: serverTimestamp()
        });
      } catch (e) {
        console.error(e);
      }
    }
    setDrawerOpen(false);
    setActiveScreen('consequence');
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center py-0 sm:py-6 relative overflow-hidden font-sans select-none antialiased">
      
      {/* Smartphone Outer Bezel chassis design */}
      <div className="w-full max-w-[480px] h-screen sm:h-[860px] sm:rounded-[40px] sm:shadow-[0_24px_80px_rgba(0,0,0,0.18)] bg-white relative flex flex-col overflow-hidden border border-black/5">
        
        {/* Notch details on smartphone */}
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-50 pointer-events-none" />

        {appState === 'welcome' && (
          <WelcomeScreen onComplete={() => setAppState('auth')} />
        )}

        {appState === 'auth' && (
          <AuthScreen onLogin={() => setAppState('app')} />
        )}

        {appState === 'app' && (
          <>
            {/* Technical Background Dots grid */}
            <BackgroundGrid />

            {/* Top Navbar Header bar (always visible except in live check in or full screen Receipts) */}
            {activeScreen !== 'live_pact' && activeScreen !== 'stake_locked' && activeScreen !== 'consequence' && (
              <header className="px-6 pt-7 pb-4 bg-white/40 backdrop-blur-md border-b border-black/[0.04] flex items-center justify-between relative z-40">
                {/* Hamburger Side Menu */}
                <button 
                  onClick={() => setDrawerOpen(true)}
                  className="w-10 h-10 rounded-full bg-white/60 hover:bg-white active:scale-95 transition-all flex items-center justify-center border border-black/5 text-black"
                >
                  <Menu className="w-5 h-5" />
                </button>

                {/* Pakka text logo */}
                <div className="flex items-center gap-1.5">
                  <Logo className="w-8 h-8" />
                  <span className="font-sans font-black text-2xl tracking-tighter text-black hidden sm:inline-block">
                    Pakka<span className="text-brand-orange font-black">.</span>
                  </span>
                </div>

                {/* Notification bell trigger */}
                <button 
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="w-10 h-10 rounded-full bg-white/60 hover:bg-white active:scale-95 transition-all flex items-center justify-center border border-black/5 text-black relative"
                >
                  <Bell className="w-5 h-5" />
                  {/* Alert indicator dot */}
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                </button>
              </header>
            )}

            {/* Floating notifications panel */}
            {notificationOpen && (
              <div className="absolute top-20 right-6 w-72 glass-modal rounded-2xl p-4 shadow-xl z-50 border border-black/10">
                <div className="flex justify-between items-center pb-2 border-b border-black/[0.04] mb-2">
                  <span className="font-mono text-[9px] text-black/50 font-bold uppercase tracking-widest">
                    SYSTEM EVENTS
                  </span>
                  <button onClick={() => setNotificationOpen(false)} className="text-black/40 hover:text-black">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="bg-brand-orange/5 p-2 rounded-lg border border-brand-orange/10 text-left cursor-pointer" onClick={() => { setNotificationOpen(false); triggerSimulatedForfeit(); }}>
                    <p className="font-sans text-[11px] text-black font-semibold">Vikas Forfeited Cricket Pact!</p>
                    <p className="font-sans text-[10px] text-brand-orange font-bold mt-0.5">Click to process ₹600 payout protocol.</p>
                  </div>
                  <div className="bg-black/5 p-2 rounded-lg text-left">
                    <p className="font-sans text-[11px] text-black font-medium">Design System Guild invite received.</p>
                    <p className="font-mono text-[8px] text-black/40 mt-0.5">FROM: @ALEX_D</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Content Router Panels */}
            <main className="flex-1 flex flex-col relative overflow-hidden z-10">
              
              {/* SCREEN: HOME - Dashboard overview */}
              {currentTab === 'home' && activeScreen === 'dashboard_home' && (
                <Dashboard 
                  pacts={pacts}
                  onSelectPact={(p) => {
                    setSelectedPact(p);
                    setActiveScreen('live_pact');
                  }}
                  onCheckInPact={handleCheckInPact}
                  onNavigateToTab={handleTabClick}
                  reliabilityDays={reliabilityDays}
                  forfeitedAmount={forfeitedAmount}
                />
              )}

              {/* SCREEN: LIVE PACT - Countdown and check in radar */}
              {activeScreen === 'live_pact' && selectedPact && (
                <LivePact 
                  pact={selectedPact}
                  onClose={() => setActiveScreen('dashboard_home')}
                  onUserCheckedIn={handleLiveCheckedIn}
                />
              )}

              {/* SCREEN: STATS / SCANNER - QR Code checkout viewfinder */}
              {currentTab === 'stats' && activeScreen === 'scanner' && (
                <Scanner 
                  onEnterIdManually={() => setActiveScreen('split_bill')}
                />
              )}

              {/* SCREEN: SPLIT BILL - Dharpur Dhaba settle details */}
              {activeScreen === 'split_bill' && (
                <SplitBill 
                  onBack={() => setActiveScreen('scanner')}
                  onConfirmRelease={handleConfirmReleaseBill}
                />
              )}

              {/* SCREEN: CONFIRMATION - Receipt checkout release screen */}
              {activeScreen === 'confirmation' && (
                <Confirmation 
                  amount={billData.amount}
                  recipient={billData.recipient}
                  payor={billData.payor}
                  onDone={() => {
                    setActiveScreen('dashboard_home');
                    setCurrentTab('home');
                  }}
                  onViewPacts={() => {
                    setActiveScreen('dashboard_home');
                    setCurrentTab('home');
                  }}
                />
              )}

              {/* SCREEN: CREATE PACT - Lock contract slider */}
              {currentTab === 'create' && activeScreen === 'create_pact' && (
                <CreatePact 
                  onBack={() => {
                    setCurrentTab('home');
                    setActiveScreen('dashboard_home');
                  }}
                  onLockPact={handleLockNewPact}
                />
              )}

              {/* SCREEN: STAKE LOCKED - Technical receipt layout */}
              {activeScreen === 'stake_locked' && (
                <StakeLocked 
                  amount={draftedPactAmount}
                  onGoToDashboard={() => {
                    setActiveScreen('dashboard_home');
                    setCurrentTab('home');
                  }}
                />
              )}

              {/* SCREEN: GROUPS - Social invites active lists */}
              {currentTab === 'groups' && (
                <Groups 
                  onNavigateToCreate={() => handleTabClick('create')}
                />
              )}

              {/* SCREEN: PROFILE / SETTINGS - Config values */}
              {currentTab === 'profile' && (
                <Settings 
                  settings={settings}
                  onUpdateSettings={handleUpdateSettings}
                />
              )}

              {/* SCREEN: CONSEQUENCE - Failed charity payout screen */}
              {activeScreen === 'consequence' && (
                <CharityConsequence 
                  onClose={() => {
                    setActiveScreen('dashboard_home');
                    setCurrentTab('home');
                  }}
                  onShareToStories={() => {
                    alert('Shared status packet to social platforms successfully!');
                    setActiveScreen('dashboard_home');
                    setCurrentTab('home');
                  }}
                />
              )}

            </main>

            {/* Global Bottom Tab Bar matching Nothing OS + iOS glass layout */}
            {activeScreen !== 'live_pact' && activeScreen !== 'stake_locked' && activeScreen !== 'consequence' && (
              <nav className="absolute bottom-0 inset-x-0 h-20 bg-white/70 backdrop-blur-md border-t border-black/[0.04] flex items-center justify-around px-2 pb-5 z-40">
                {/* Tab 1: Home Dashboard */}
                <button 
                  onClick={() => handleTabClick('home')}
                  className={`flex flex-col items-center justify-center w-12 h-12 rounded-full relative transition-colors
                    ${currentTab === 'home' ? 'text-brand-orange' : 'text-black/40 hover:text-black/60'}
                  `}
                >
                  <HomeIcon className="w-5 h-5" />
                  <span className="font-mono text-[8px] mt-0.5 tracking-wider uppercase font-bold">HOME</span>
                  {currentTab === 'home' && (
                    <span className="absolute bottom-[-2px] w-1 h-1 rounded-full bg-brand-orange" />
                  )}
                </button>

                {/* Tab 2: Groups/Squads */}
                <button 
                  onClick={() => handleTabClick('groups')}
                  className={`flex flex-col items-center justify-center w-12 h-12 rounded-full relative transition-colors
                    ${currentTab === 'groups' ? 'text-brand-orange' : 'text-black/40 hover:text-black/60'}
                  `}
                >
                  <UsersIcon className="w-5 h-5" />
                  <span className="font-mono text-[8px] mt-0.5 tracking-wider uppercase font-bold">Groups</span>
                  {currentTab === 'groups' && (
                    <span className="absolute bottom-[-2px] w-1 h-1 rounded-full bg-brand-orange" />
                  )}
                </button>

                {/* Tab 3: Create (BIG RED PLUS BUTTON CENTERED matching mockup) */}
                <div className="relative -translate-y-4">
                  <button 
                    onClick={() => handleTabClick('create')}
                    className={`w-14 h-14 rounded-full text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center
                      ${currentTab === 'create'
                        ? 'bg-black hover:bg-black/90 shadow-black/20'
                        : 'bg-brand-orange hover:bg-brand-orange/95 shadow-brand-orange/30'
                      }
                    `}
                  >
                    <Plus className={`w-7 h-7 transform transition-transform duration-300 ${currentTab === 'create' ? 'rotate-45' : ''}`} strokeWidth={3} />
                  </button>
                </div>

                {/* Tab 5: Profile/Settings */}
                <button 
                  onClick={() => handleTabClick('profile')}
                  className={`flex flex-col items-center justify-center w-12 h-12 rounded-full relative transition-colors
                    ${currentTab === 'profile' ? 'text-brand-orange' : 'text-black/40 hover:text-black/60'}
                  `}
                >
                  <UserIcon className="w-5 h-5" />
                  <span className="font-mono text-[8px] mt-0.5 tracking-wider uppercase font-bold">Profile</span>
                  {currentTab === 'profile' && (
                    <span className="absolute bottom-[-2px] w-1 h-1 rounded-full bg-brand-orange" />
                  )}
                </button>
              </nav>
            )}

            {/* Drawer Side Navigation Overlays */}
            {drawerOpen && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 transition-all flex justify-start">
                <div className="w-4/5 max-w-[320px] h-full bg-white relative p-6 shadow-2xl flex flex-col justify-between">
                  
                  {/* Top Drawer Brand */}
                  <div>
                    <div className="flex justify-between items-center mb-8">
                      <div className="flex items-center gap-1.5">
                        <Logo className="w-8 h-8" />
                        <span className="font-sans font-black text-2xl tracking-tighter text-black">
                          Pakka<span className="text-brand-orange font-black">.</span>
                        </span>
                      </div>
                      <button 
                        onClick={() => setDrawerOpen(false)}
                        className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-black/60 hover:bg-black/10"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Simulated Forfeit trigger widget */}
                    <div className="bg-black/5 rounded-xl p-4 border border-black/[0.04] mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4.5 h-4.5 text-brand-orange" />
                        <span className="font-sans font-bold text-xs text-black">
                          Consequence Test Bench
                        </span>
                      </div>
                      <p className="font-sans text-[11px] text-black/50 mb-4 leading-relaxed">
                        Test what happens when a team member fails their commitment contract and forces social escrow payouts.
                      </p>
                      <button 
                        onClick={triggerSimulatedForfeit}
                        className="w-full py-2 bg-brand-orange hover:bg-brand-orange/90 text-white font-mono text-[10px] font-bold tracking-widest uppercase rounded"
                      >
                        FORFEIT_SYS_PACT
                      </button>
                    </div>

                    {/* Sub-directories tech indicators */}
                    <div className="space-y-4 font-mono text-[11px] uppercase tracking-widest text-left">
                      <div className="p-2.5 rounded hover:bg-black/5 cursor-pointer flex items-center gap-2" onClick={() => handleTabClick('home')}>
                        <HomeIcon className="w-4 h-4 text-brand-orange" />
                        <span>DASHBOARD</span>
                      </div>
                      <div className="p-2.5 rounded hover:bg-black/5 cursor-pointer flex items-center gap-2" onClick={() => handleTabClick('groups')}>
                        <UsersIcon className="w-4 h-4 text-brand-orange" />
                        <span>SQUADS</span>
                      </div>
                      <div className="p-2.5 rounded hover:bg-black/5 cursor-pointer flex items-center gap-2" onClick={() => handleTabClick('create')}>
                        <Plus className="w-4 h-4 text-brand-orange" />
                        <span>DRAFT PACT</span>
                      </div>
                      <div className="p-2.5 rounded hover:bg-black/5 cursor-pointer flex items-center gap-2" onClick={() => handleTabClick('stats')}>
                        <BarChart2 className="w-4 h-4 text-brand-orange" />
                        <span>QR CHECKOUT</span>
                      </div>
                      <div className="p-2.5 rounded hover:bg-black/5 cursor-pointer flex items-center gap-2" onClick={() => handleTabClick('profile')}>
                        <SettingsIcon className="w-4 h-4 text-brand-orange" />
                        <span>SYSTEM SETTINGS</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom footer specs */}
                  <div className="font-mono text-[8.5px] text-black/35 leading-normal text-left">
                    <p>OWNER: {settings.phone}</p>
                    <p>ESCROW STATUS: ACTIVE</p>
                    <p className="mt-2 text-[8px]">PAKKA DIGITAL DRAFT CO // 2026</p>
                  </div>

                </div>

                {/* Click outside to close drawer */}
                <div className="flex-1" onClick={() => setDrawerOpen(false)} />
              </div>
            )}
          </>
        )}

      </div>

    </div>
  );
}
