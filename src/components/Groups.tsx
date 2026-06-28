import React, { useState } from 'react';
import { Search, Plus, UserCheck, X, Check, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { Squad, Invite } from '../types';
import { CardCorners } from './BackgroundGrid';
import Mascot from './Mascot';

interface GroupsProps {
  onNavigateToCreate: () => void;
}

export default function Groups({ onNavigateToCreate }: GroupsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pending Invites state
  const [invites, setInvites] = useState<Invite[]>([]);

  // Active Squads state
  const [squads, setSquads] = useState<Squad[]>([]);

  const handleAcceptInvite = (inviteId: string) => {
    const invite = invites.find(i => i.id === inviteId);
    if (!invite) return;

    // Remove from invites
    setInvites(invites.filter(i => i.id !== inviteId));

    // Add to active squads
    setSquads([
      ...squads,
      {
        id: `sq-${Date.now()}`,
        name: invite.name,
        membersActive: 1,
        membersTotal: 8,
        impactAmount: 0.00,
        reliabilityIndex: 100
      }
    ]);
  };

  const handleDeclineInvite = (inviteId: string) => {
    setInvites(invites.filter(i => i.id !== inviteId));
  };

  const handleJoinSquad = () => {
    if (!searchQuery.trim()) return;
    
    // Add joined squad
    setSquads([
      ...squads,
      {
        id: `sq-${Date.now()}`,
        name: searchQuery,
        membersActive: 1,
        membersTotal: 12,
        impactAmount: 10.00,
        reliabilityIndex: 100
      }
    ]);
    setSearchQuery('');
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-24 relative z-10 px-5 pt-4">
      
      {/* Header with Mascot */}
      <div className="flex items-center gap-4 mb-6">
        <Mascot type="megaphone" className="w-12 h-12 flex-shrink-0 animate-bounce" />
        <div className="flex-1">
          <h2 className="font-sans font-black text-2xl text-black tracking-tight leading-none">
            Your Squads
          </h2>
          <span className="font-mono text-[9px] text-black/40 uppercase tracking-[0.2em] font-semibold mt-1 block">
            SOCIAL ACCOUNTABILITY
          </span>
        </div>
      </div>

      {/* Search Input bar matching Nothing OS style */}
      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-black/40" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search or Enter SQUAD_ID..."
            className="w-full bg-black/5 border border-black/10 rounded-lg py-2.5 pl-11 pr-4 text-xs font-mono text-black focus:outline-none focus:border-brand-orange focus:bg-white transition-all placeholder:text-black/35"
          />
        </div>
        <button 
          onClick={handleJoinSquad}
          className="bg-brand-orange text-white text-xs font-sans font-bold px-5 rounded-lg active:scale-95 transition-all hover:bg-brand-orange/95 flex items-center justify-center uppercase tracking-wider"
        >
          JOIN
        </button>
      </div>

      {/* Pending Invites list section */}
      {invites.length > 0 && (
        <div className="mb-6">
          <h3 className="font-mono text-[10px] text-black/50 font-bold uppercase tracking-widest mb-3">
            PENDING_INVITES // {invites.length}
          </h3>

          <div className="space-y-3">
            {invites.map((invite) => (
              <div 
                key={invite.id}
                className="glass-card rounded-2xl p-4 flex items-center justify-between relative"
              >
                <CardCorners color="border-brand-orange/10" />

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-black/10 bg-black/5">
                    <img 
                      src={invite.avatarUrl} 
                      alt={invite.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-black leading-snug">
                      {invite.name}
                    </h4>
                    <p className="font-mono text-[9px] text-black/40 uppercase mt-0.5 tracking-wider">
                      Invited by {invite.invitedBy}
                    </p>
                  </div>
                </div>

                {/* Accept/Decline action triggers */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleDeclineInvite(invite.id)}
                    className="w-8 h-8 rounded-full bg-black/5 text-black/60 hover:bg-black/10 active:scale-90 transition-all flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleAcceptInvite(invite.id)}
                    className="w-8 h-8 rounded-full bg-brand-orange text-white hover:bg-brand-orange/90 active:scale-90 transition-all flex items-center justify-center shadow-md shadow-brand-orange/20"
                  >
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Squads List Section */}
      <div className="mb-8">
        <h3 className="font-mono text-[10px] text-black/50 font-bold uppercase tracking-widest mb-4">
          ACTIVE SQUADS // {squads.length}
        </h3>

        <div className="space-y-4">
          {squads.map((squad, idx) => {
            const isRedAccent = squad.reliabilityIndex >= 90;
            return (
              <div 
                key={squad.id}
                className={`glass-card rounded-2xl p-5 relative border-l-2 transition-all duration-300 hover:translate-y-[-2px]
                  ${isRedAccent ? 'border-brand-orange/80' : 'border-black/30'}
                `}
              >
                <CardCorners color={isRedAccent ? 'border-brand-orange/30' : 'border-black/10'} />

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="font-mono text-[8px] text-black/40 uppercase block mb-1">
                      ID: PX-SQUAD-10{idx + 1}
                    </span>
                    <h4 className="font-sans font-bold text-lg text-black leading-tight">
                      {squad.name}
                    </h4>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-black/5 text-black hover:bg-black/10 flex items-center justify-center cursor-pointer">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Sub-grid stats details */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {/* Members count */}
                  <div className="bg-black/[0.02] border border-black/[0.04] rounded-lg p-2.5">
                    <span className="font-mono text-[8px] text-black/40 uppercase block mb-0.5">
                      MEMBERS
                    </span>
                    <span className="font-sans font-bold text-xs text-black">
                      {squad.membersActive} <span className="font-mono text-[10px] text-black/40 font-medium">/{squad.membersTotal} Active</span>
                    </span>
                  </div>

                  {/* Escrow pool stake impact */}
                  <div className="bg-black/[0.02] border border-black/[0.04] rounded-lg p-2.5">
                    <span className="font-mono text-[8px] text-black/40 uppercase block mb-0.5">
                      IMPACT
                    </span>
                    <span className="font-sans font-bold text-xs text-brand-orange tabular-nums">
                      ₹{squad.impactAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Progress bar and reliability index percentage */}
                <div className="pt-3 border-t border-black/[0.04]">
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="text-black/40">RELIABILITY_INDEX</span>
                    <span className={`font-bold ${isRedAccent ? 'text-brand-orange' : 'text-black'}`}>
                      {squad.reliabilityIndex}%
                    </span>
                  </div>
                  <div className="w-full h-1 bg-black/[0.05] rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-700 ${isRedAccent ? 'bg-brand-orange' : 'bg-black'}`}
                      style={{ width: `${squad.reliabilityIndex}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Discovery / Create Squad Bottom Container */}
      <div className="mb-6">
        <h3 className="font-mono text-[10px] text-black/50 font-bold uppercase tracking-widest mb-3">
          DISCOVERY_SYS
        </h3>

        <div className="border border-dashed border-black/20 rounded-2xl p-6 text-center relative bg-black/[0.01]">
          <div className="w-11 h-11 rounded-lg bg-black/5 flex items-center justify-center mx-auto mb-3">
            <Plus className="w-6 h-6 text-black/50" />
          </div>
          <h4 className="font-sans font-bold text-sm text-black">
            Initialize New Squad
          </h4>
          <p className="font-sans text-xs text-black/45 mt-0.5 leading-snug mb-5">
            Deploy a custom pact logic group.
          </p>

          <button 
            onClick={onNavigateToCreate}
            className="px-6 py-2.5 border border-brand-orange text-brand-orange font-mono text-[10px] font-bold tracking-widest uppercase rounded-lg hover:bg-brand-orange/5 active:scale-95 transition-all"
          >
            CREATE_SYS
          </button>
        </div>
      </div>

    </div>
  );
}
