import enable2FA from "../helpers/twoFactorDB/enable2FA.js";

import type { RequestHandler } from "express";


export const handler: RequestHandler = async (req, res) => {

  const userName = req.session.user.userName;

  const success = enable2FA(userName);

  res.json({
    success
  });
};


export default handler;
