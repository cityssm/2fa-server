# Two-Factor Authentication Management Server

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/084cc0ff50fc407fa86b772c34755527)](https://www.codacy.com/gh/cityssm/2fa-server/dashboard?utm_source=github.com&utm_medium=referral&utm_content=cityssm/2fa-server&utm_campaign=Badge_Grade) [![Maintainability](https://api.codeclimate.com/v1/badges/4f2ffd81f5c8beb11870/maintainability)](https://codeclimate.com/github/cityssm/2fa-server/maintainability) ![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/cityssm/2fa-server)

![User Dashboard](docs/screenshot.png)

A server for users to initialize their secret two-factor authentication keys.

## Features

-   User manages their own secret keys.
-   Industry standard TOTP keys.

## Authenticator Apps

The server generates secret keys and corresponding QR codes
compatible with popular authenticator apps.

### Microsoft Authenticator

![Microsoft Authenticator App Icon](public/images/microsoftAuthenticator.png)

-   [Microsoft Authenticator on Google Play](https://play.google.com/store/apps/details?id=com.azure.authenticator)
-   [Microsoft Authenticator on Apple App Store](https://apps.apple.com/ca/app/microsoft-authenticator/id983156458)

### Google Authenticator

![Google Authenticator App Icon](public/images/googleAuthenticator.png)

-   [Google Authenticator on Google Play](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2)
-   [Google Authenticator on Apple App Store](https://apps.apple.com/ca/app/google-authenticator/id388497605)

## Need to Validate Tokens in Your Application?

There are many libraries that can be used to validate TOTP tokens.

If your application is implemented in Node.js,
[otplib](https://www.npmjs.com/package/otplib) is a fantastic choice!
