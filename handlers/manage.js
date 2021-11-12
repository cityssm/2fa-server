import { get2FAUser } from "../helpers/twoFactorDB/get2FAUser.js";
import { authenticator } from "otplib";
import * as qrcode from "qrcode";
export const handler = async (request, response) => {
    const userName = request.session.user.userName;
    const twoFactorUser = await get2FAUser(userName);
    if (!twoFactorUser) {
        return response.redirect("/logout");
    }
    if (twoFactorUser.isRecentlySet) {
        const otpPathURL = authenticator.keyuri(userName, "Corporate Applications", twoFactorUser.secretKey);
        qrcode.toDataURL(otpPathURL, (error, imageURL) => {
            if (error) {
                twoFactorUser.isRecentlySet = false;
                return response.render("manage", {
                    twoFactorUser
                });
            }
            return response.render("manage", {
                twoFactorUser,
                qrCode: imageURL
            });
        });
    }
    else {
        return response.render("manage", {
            twoFactorUser
        });
    }
};
export default handler;
