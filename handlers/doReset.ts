import { updateSecretKey } from "../helpers/twoFactorDB/updateSecretKey.js";
import { authenticator } from "otplib";
import * as qrcode from "qrcode";

import type { RequestHandler } from "express";


export const handler: RequestHandler = async (request, response) => {

  const userName = request.session.user.userName;
  const secretKey = authenticator.generateSecret();

  const success = await updateSecretKey(userName, secretKey);

  if (success) {

    const otpPathURL = authenticator.keyuri(userName, "Corporate Applications", secretKey);

    qrcode.toDataURL(otpPathURL, (error, imageURL: string) => {

      if (error) {

        return response.json({
          success: true,
          secretKey
        });
      }

      return response.json({
        success: true,
        secretKey,
        qrCode: imageURL
      });

    });

  } else {
    return response.json({
      success: false
    });
  }

};


export default handler;
