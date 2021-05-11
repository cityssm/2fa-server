import updateSecretKey from "../helpers/twoFactorDB/updateSecretKey.js";
import { authenticator } from "otplib";
import * as qrcode from "qrcode";

import type { RequestHandler } from "express";


export const handler: RequestHandler = async (req, res) => {

  const userName = req.session.user.userName;
  const secretKey = authenticator.generateSecret();

  console.log(secretKey);

  const success = await updateSecretKey(userName, secretKey);

  if (success) {

    const otpPathURL = authenticator.keyuri(userName, "Corporate Applications", secretKey);

    qrcode.toDataURL(otpPathURL, (err, imageURL: string) => {

      if (err) {

        return res.json({
          success: true,
          secretKey
        });
      }

      return res.json({
        success: true,
        secretKey,
        qrCode: imageURL
      });

    });

  } else {
    return res.json({
      success: false
    });
  }

};


export default handler;
