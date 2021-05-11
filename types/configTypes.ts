import type * as sqlTypes from "mssql";
import type { ADWebAuthConfig } from "@cityssm/ad-web-auth-connector/types";


export interface Config {

  application?: {
    httpPort?: number;
    userDomain?: string;
  };

  session?: {
    cookieName?: string;
    secret?: string;
    maxAgeMillis?: number;
    doKeepAlive?: boolean;
  };

  mssqlConfig: sqlTypes.config;

  adWebAuthConfig: ADWebAuthConfig;

  allowedAuthIPs: string[];
}
