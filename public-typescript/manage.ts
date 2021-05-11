import type { cityssmGlobal } from "@cityssm/bulma-webapp-js/src/types";

declare const cityssm: cityssmGlobal;

(() => {

  // Enable Button

  const enableButtonEle = document.getElementById("button--enable");

  if (enableButtonEle) {

    enableButtonEle.addEventListener("click", () => {

      const enableFn = () => {

        cityssm.postJSON("/manage/doEnable", {}, (response: { success: boolean }) => {

          if (response.success) {
            window.location.reload();
            return;
          }

          cityssm.alertModal("Error",
            "An error occurred while attempting to enable two-factor authentication on this account.  Please try again.",
            "OK",
            "danger");
        });
      };

      cityssm.confirmModal("Enable Two-Factor Authentication?",
        "As part of the process, you will be shown a secret key generated just for you." +
        "The key will only be shown to you for a limited time, so be sure to have your mobile device nearby to record it.",
        "Enable 2FA Now",
        "info",
        enableFn);
    });
  }

  // Reset Button

  const resetButtonEle = document.getElementById("button--reset");

  if (resetButtonEle) {

    resetButtonEle.addEventListener("click", () => {

      const resetFn = () => {

        cityssm.postJSON("/manage/doReset", {},
          (response: { success: boolean; secretKey?: string; qrCode?: string }) => {

            if (response.success) {

              resetButtonEle.closest(".message").remove();

              const containerEle = document.getElementById("container--secretKey");

              containerEle.innerHTML =
                (response.qrCode
                  ? "<img src=\"" + response.qrCode + "\" alt=\"" + response.secretKey + "\" /><br />"
                  : "") +
                "<span class=\"is-size-4 has-text-weight-bold\">" + response.secretKey + "</span>";

              const mainContainerEle = document.getElementById("container--secretKeyInfo");

              mainContainerEle.classList.remove("is-hidden");
              mainContainerEle.scrollIntoView({
                behavior: "smooth",
                block: "start"
              });

            } else {

              cityssm.alertModal("Error",
                "An error occurred while attempting to reset the secret key on this account.  Please try again.",
                "OK",
                "danger");
            }
          });
      };

      cityssm.confirmModal("Reset Secret Key?",
        "Once your key has been reset, it will be shown on screen for you to record on your mobile device." +
        "It will not be available to you afterwards, so be sure to have your mobile device nearby to record it.",
        "Reset Secret Key",
        "info",
        resetFn);
    });
  }
})();
