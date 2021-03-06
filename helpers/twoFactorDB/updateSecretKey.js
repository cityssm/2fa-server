import * as sqlPool from "@cityssm/mssql-multi-pool";
import * as configFns from "../configFns.js";
import debug from "debug";
const debugSQL = debug("2fa-server:updateSecretKey");
export const updateSecretKey = async (userName, secretKey) => {
    try {
        const pool = await sqlPool.connect(configFns.getProperty("mssqlConfig"));
        await pool.request()
            .input("secretKey", secretKey)
            .input("userName", userName)
            .query("update TwoFactor" +
            " set secretKey = @secretKey," +
            " secretKeyDate = getdate()," +
            " allowUserReset = 0" +
            " where userName = @userName" +
            " and enforce2FA = 1" +
            " and (allowUserReset = 1 or isRecentlySet = 1)");
        return true;
    }
    catch (e) {
        debugSQL(e);
    }
    return false;
};
export default updateSecretKey;
