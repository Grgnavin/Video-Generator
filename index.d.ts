interface UserMetadata {
  createdAt: string;
  creationTime: string;
  lastLoginAt: string;
  lastSignInTime: string;
}

interface StsTokenManager {
  accessToken: string;
  expirationTime: number;
  refreshToken: string;
  isExpired: boolean;
}

interface ProviderData {
  providerId: string;
  uid: string;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
}

interface ProactiveRefresh {
  user: UserData;
  isRunning: boolean;
  timerId: null | number;
  errorBackoff: number;
}

interface ReloadUserInfo {
  localId: string;
  email: string;
  displayName: string;
  photoUrl: string;
  emailVerified: boolean;
}

declare interface UserData {
  uid: string;
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: UserMetadata;
  phoneNumber: string | null;
  photoURL: string | null;
  proactiveRefresh: ProactiveRefresh;
  providerData: ProviderData[];
  providerId: string;
  reloadListener: null;
  reloadUserInfo: ReloadUserInfo;
  stsTokenManager: StsTokenManager;
  tenantId: string | null;
  accessToken?: string;
  auth: any;

  getIdToken(forceRefresh?: boolean): Promise<string>;
  getIdTokenResult(forceRefresh?: boolean): Promise<IdTokenResult>;
  reload(): Promise<void>;
}



interface AuthProps {
  children: React.ReactNode;
  onUserAuthenticated?: (user: UserData) => void;
  onError?: (error: Error) => void;
}

// Required to treat this file as a module
export {};
