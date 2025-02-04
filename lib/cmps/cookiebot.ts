import { click, elementExists, wait, waitForElement } from '../rule-executors';
import AutoConsentCMPBase from './base';

export default class Cookiebot extends AutoConsentCMPBase {
  name = 'Cybotcookiebot';
  prehideSelectors = ["#CybotCookiebotDialog,#dtcookie-container,#cookiebanner,#cb-cookieoverlay"]

  get hasSelfTest(): boolean {
    return true;
  }

  get isIntermediate(): boolean {
    return false;
  }

  get isCosmetic(): boolean {
    return false;
  }

  async detectCmp() {
    return elementExists('#CybotCookiebotDialogBodyLevelButtonPreferences');
  }

  async detectPopup() {
    return elementExists('#CybotCookiebotDialog,#dtcookie-container,#cookiebanner,#cb-cookiebanner');
  }

  async optOut() {
    if (click('.cookie-alert-extended-detail-link')) {
      await waitForElement('.cookie-alert-configuration', 2000);
      click('.cookie-alert-configuration-input:checked', true);
      click('.cookie-alert-extended-button-secondary');
      return true;
    }

    if (elementExists('#dtcookie-container')) {
      return click('.h-dtcookie-decline');
    }

    if (click('.cookiebot__button--settings')) {
      return true;
    }

    if (click('#CybotCookiebotDialogBodyButtonDecline')) {
      return true;
    }

    click('.cookiebanner__link--details');

    click('.CybotCookiebotDialogBodyLevelButton:checked:enabled,input[id*="CybotCookiebotDialogBodyLevelButton"]:checked:enabled', true);

    click('#CybotCookiebotDialogBodyButtonDecline');

    click('input[id^=CybotCookiebotDialogBodyLevelButton]:checked', true);

    if (elementExists('#CybotCookiebotDialogBodyButtonAcceptSelected')) {
      click('#CybotCookiebotDialogBodyButtonAcceptSelected');
    } else {
      click('#CybotCookiebotDialogBodyLevelButtonAccept,#CybotCookiebotDialogBodyButtonAccept,#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection', true);
    }

    // some sites have custom submit buttons with no obvious selectors. In this case we just call the submitConsent API.
    if (await this.mainWorldEval('EVAL_COOKIEBOT_1')) {
      await this.mainWorldEval('EVAL_COOKIEBOT_2');
      await wait(500);
    }

    // site with 3rd confirm settings modal
    if (elementExists('#cb-confirmedSettings')) {
      await this.mainWorldEval('EVAL_COOKIEBOT_3');
    }

    return true;
  }

  async optIn() {
    if (elementExists('#dtcookie-container')) {
      return click('.h-dtcookie-accept');
    }

    click('.CybotCookiebotDialogBodyLevelButton:not(:checked):enabled', true);
    click('#CybotCookiebotDialogBodyLevelButtonAccept');
    click('#CybotCookiebotDialogBodyButtonAccept');
    return true;
  }

  async test() {
    return this.mainWorldEval('EVAL_COOKIEBOT_4');
  }
}
