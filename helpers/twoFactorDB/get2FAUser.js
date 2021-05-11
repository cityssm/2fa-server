import * as sqlPool from "@cityssm/mssql-multi-pool";
import * as configFns from "../configFns.js";
import debug from "debug";
const debugSQL = debug("2fa-server:get2FAUser");
export const get2FAUser = async (userName) => {
    try {
        const pool = await sqlPool.connect(configFns.getProperty("mssqlConfig"));
        const userResult = await pool.request()
            .input("userName", userName)
            .query("select enforce2FA, allowUserReset" +
            " from TwoFactor" +
            " where userName = @userName");
        if (!userResult.recordset || userResult.recordset.length === 0) {
            return {
                enforce2FA: false,
                allowUserReset: false
            };
        }
        const user = userResult.recordset[0];
        return user;
    }
    catch (e) {
        debugSQL(e);
    }
    return null;
};
export default get2FAUser;
