import { Router } from "express";
import * as configFns from "../helpers/configFns.js";
import * as authFns from "../helpers/authFns.js";
import debug from "debug";
const debugLogin = debug("2fa-server:routes:login");
const redirectURL = "/manage";
export const router = Router();
router.route("/")
    .get((req, res) => {
    const sessionCookieName = configFns.getProperty("session.cookieName");
    if (req.session.user && req.cookies[sessionCookieName]) {
        res.redirect(redirectURL);
    }
    else {
        res.render("login", {
            userName: "",
            message: ""
        });
    }
})
    .post(async (req, res) => {
    const userName = req.body.userName.toLowerCase();
    const passwordPlain = req.body.password;
    try {
        const isAuthenticated = await authFns.authenticate(userName, passwordPlain);
        if (isAuthenticated) {
            req.session.user = {
                userName: userName
            };
            return res.redirect(redirectURL);
        }
        return res.render("login", {
            userName,
            message: "Login Failed"
        });
    }
    catch (e) {
        debugLogin(e);
        return res.render("login", {
            userName,
            message: "Login Failed"
        });
    }
});
export default router;
