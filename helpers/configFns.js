import { config } from "../data/config.js";
Object.freeze(config);
const configOverrides = {};
const configFallbackValues = new Map();
configFallbackValues.set("application.httpPort", 27272);
configFallbackValues.set("session.cookieName", "2fa-server-user-sid");
configFallbackValues.set("session.secret", "cityssm/2fa-server");
configFallbackValues.set("session.maxAgeMillis", 20 * 60 * 1000);
configFallbackValues.set("session.doKeepAlive", false);
export function getProperty(propertyName) {
    if (configOverrides.hasOwnProperty(propertyName)) {
        return configOverrides[propertyName];
    }
    const propertyNameSplit = propertyName.split(".");
    let currentObj = config;
    for (let index = 0; index < propertyNameSplit.length; index += 1) {
        currentObj = currentObj[propertyNameSplit[index]];
        if (!currentObj) {
            return configFallbackValues.get(propertyName);
        }
    }
    return currentObj;
}
