export interface Member {
  name: string;
  avatarUrl?: string;
  status: 'checked_in' | 'action_required' | 'pending';
  checkedInTime?: string;
}

export interface Pact {
  id: string;
  title: string;
  membersCount: number;
  membersList?: Member[];
  endsInDays?: number;
  successRate: number; // e.g. 92
  completionRate: number; // e.g. 60
  isSolo: boolean;
  frequency: 'Daily' | 'Onetime';
  stakeAmount: number;
  consequenceType: 'anti-charity' | 'buy-dinner';
  status: 'active' | 'locked' | 'completed' | 'forfeited';
  date?: string;
  time?: string;
  locationName?: string;
  locationCoords?: { lat: number; lng: number };
}

export interface Squad {
  id: string;
  name: string;
  membersActive: number;
  membersTotal: number;
  impactAmount: number;
  reliabilityIndex: number;
}

export interface Invite {
  id: string;
  name: string;
  invitedBy: string;
  avatarUrl?: string;
}

export interface Transaction {
  id: string;
  recipient: string;
  amount: number;
  status: 'SUCCESSFUL' | 'PENDING' | 'FAILED';
  payor: string;
  timestamp: string;
  refNo: string;
  description: string;
}

export interface AppSettings {
  phone: string;
  upiId: string;
  avatarUrl: string;
  isPro: boolean;
  biometricLock: boolean;
}
