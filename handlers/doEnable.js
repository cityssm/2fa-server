import enable2FA from "../helpers/twoFactorDB/enable2FA.js";
export const handler = async (req, res) => {
    const userName = req.session.user.userName;
    const success = enable2FA(userName);
    res.json({
        success
    });
};
export default handler;
