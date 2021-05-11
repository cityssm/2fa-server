import get2FAUser from "../helpers/twoFactorDB/get2FAUser.js";
export const handler = async (req, res) => {
    const userName = req.session.user.userName;
    const twoFactorUser = await get2FAUser(userName);
    if (!twoFactorUser) {
        return res.redirect("/logout");
    }
    return res.render("manage", {
        twoFactorUser
    });
};
export default handler;
