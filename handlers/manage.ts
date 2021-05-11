import get2FAUser from "../helpers/twoFactorDB/get2FAUser.js";

import type { RequestHandler } from "express";


export const handler: RequestHandler = async (req, res) => {

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
