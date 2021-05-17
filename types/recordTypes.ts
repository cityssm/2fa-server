export interface User {
  userName: string;
};


declare module "express-session" {
  interface Session {
    user: User;
  }
};


export interface TwoFactorAuthUser {
  userName?: string;
  enforce2FA: boolean;
  secretKey?: string;
  allowUserReset: boolean;
  isRecentlySet: boolean;
};
