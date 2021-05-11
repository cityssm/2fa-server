"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
(function () {
    var enableButtonEle = document.getElementById("button--enable");
    if (enableButtonEle) {
        enableButtonEle.addEventListener("click", function () {
            var enableFn = function () {
                cityssm.postJSON("/manage/doEnable", {}, function (response) {
                    if (response.success) {
                        window.location.reload();
                        return;
                    }
                    cityssm.alertModal("Error", "An error occurred while attempting to enable two-factor authentication on this account.  Please try again.", "OK", "danger");
                });
            };
            cityssm.confirmModal("Enable Two-Factor Authentication?", "As part of the process, you will be shown a secret key generated just for you." +
                "The key will only be shown to you for a limited time, so be sure to have your mobile device nearby to record it.", "Enable 2FA Now", "info", enableFn);
        });
    }
    var resetButtonEle = document.getElementById("button--reset");
    if (resetButtonEle) {
        resetButtonEle.addEventListener("click", function () {
            var resetFn = function () {
                cityssm.postJSON("/manage/doReset", {}, function (response) {
                    if (response.success) {
                        resetButtonEle.closest(".message").remove();
                        var containerEle = document.getElementById("container--secretKey");
                        containerEle.innerHTML =
                            (response.qrCode
                                ? "<img src=\"" + response.qrCode + "\" alt=\"" + response.secretKey + "\" /><br />"
                                : "") +
                                "<span class=\"is-size-4 has-text-weight-bold\">" + response.secretKey + "</span>";
                        var mainContainerEle = document.getElementById("container--secretKeyInfo");
                        mainContainerEle.classList.remove("is-hidden");
                        mainContainerEle.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });
                    }
                    else {
                        cityssm.alertModal("Error", "An error occurred while attempting to reset the secret key on this account.  Please try again.", "OK", "danger");
                    }
                });
            };
            cityssm.confirmModal("Reset Secret Key?", "Once your key has been reset, it will be shown on screen for you to record on your mobile device." +
                "It will not be available to you afterwards, so be sure to have your mobile device nearby to record it.", "Reset Secret Key", "info", resetFn);
        });
    }
})();
