import get2FAUser from "../helpers/twoFactorDB/get2FAUser.js";
import { authenticator } from "otplib";
import * as qrcode from "qrcode";

import type { RequestHandler } from "express";


export const handler: RequestHandler = async (req, res) => {

  const userName = req.session.user.userName;

  const twoFactorUser = await get2FAUser(userName);

  if (!twoFactorUser) {
    return res.redirect("/logout");
  }

  if (twoFactorUser.isRecentlySet) {

    const otpPathURL = authenticator.keyuri(userName, "Corporate Applications", twoFactorUser.secretKey);

    qrcode.toDataURL(otpPathURL, (err, imageURL: string) => {

      if (err) {
        twoFactorUser.isRecentlySet = false;

        return res.render("manage", {
          twoFactorUser
        });
      }

      return res.render("manage", {
        twoFactorUser,
        qrCode: imageURL
      });
    });
    
  } else {

    return res.render("manage", {
      twoFactorUser
    });
  }
};


export default handler;
