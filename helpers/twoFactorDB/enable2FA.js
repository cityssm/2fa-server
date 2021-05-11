import * as sqlPool from "@cityssm/mssql-multi-pool";
import * as configFns from "../configFns.js";
import debug from "debug";
const debugSQL = debug("2fa-server:enable2FA");
export const enable2FA = async (userName) => {
    try {
        const pool = await sqlPool.connect(configFns.getProperty("mssqlConfig"));
        const userResult = await pool.request()
            .input("userName", userName)
            .query("select enforce2FA" +
            " from TwoFactor" +
            " where userName = @userName");
        if (userResult.recordset && userResult.recordset.length > 0) {
            if (userResult.recordset[0].enforce2FA) {
                return true;
            }
            await pool.request()
                .input("userName", userName)
                .query("update TwoFactor" +
                " set enforce2FA = 1," +
                " allowUserReset = 1," +
                " secretKey = null," +
                " secretKeyDate = null" +
                " where userName = @userName");
        }
        else {
            await pool.request()
                .input("userName", userName)
                .query("insert into TwoFactor" +
                " (userName, secretKey, secretKeyDate, enforce2FA, allowUserReset)" +
                " values (@userName, null, null, 1, 1)");
        }
        return true;
    }
    catch (e) {
        debugSQL(e);
    }
    return false;
};
export default enable2FA;
