/* eslint-disable unicorn/prevent-abbreviations */

import type * as sqlTypes from "mssql";
import type { ADWebAuthConfig } from "@cityssm/ad-web-auth-connector/types";

import { config } from "../data/config.js";

Object.freeze(config);


/*
 * SET UP FALLBACK VALUES
 */


const configOverrides: { [propertyName: string]: unknown } = {};

const configFallbackValues = new Map<string, unknown>();

configFallbackValues.set("application.httpPort", 27_272);

configFallbackValues.set("session.cookieName", "2fa-server-user-sid");
configFallbackValues.set("session.secret", "cityssm/2fa-server");
configFallbackValues.set("session.maxAgeMillis", 20 * 60 * 1000);
configFallbackValues.set("session.doKeepAlive", false);


export function getProperty(propertyName: "application.httpPort"): number;
export function getProperty(propertyName: "application.userDomain"): string;

export function getProperty(propertyName: "session.cookieName"): string;
export function getProperty(propertyName: "session.doKeepAlive"): boolean;
export function getProperty(propertyName: "session.maxAgeMillis"): number;
export function getProperty(propertyName: "session.secret"): string;

export function getProperty(propertyName: "mssqlConfig"): sqlTypes.config;
export function getProperty(propertyName: "adWebAuthConfig"): ADWebAuthConfig;


export function getProperty(propertyName: string): unknown {

  if (Object.prototype.hasOwnProperty.call(configOverrides, propertyName)) {
    return configOverrides[propertyName];
  }

  const propertyNameSplit = propertyName.split(".");

  let currentObj = config;

  for (const element of propertyNameSplit) {

    currentObj = currentObj[element];

    if (!currentObj) {
      return configFallbackValues.get(propertyName);
    }
  }

  return currentObj;
}
