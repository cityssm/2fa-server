import type { TwoFactorAuthUser } from "../../types/recordTypes";
export declare const get2FAUser: (userName: string) => Promise<TwoFactorAuthUser>;
export default get2FAUser;
