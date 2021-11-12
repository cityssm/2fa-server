import { enable2FA } from "../helpers/twoFactorDB/enable2FA.js";

import type { RequestHandler } from "express";


export const handler: RequestHandler = async (request, response) => {

  const userName = request.session.user.userName;

  const success = await enable2FA(userName);

  response.json({
    success
  });
};


export default handler;
