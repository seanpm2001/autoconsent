import generateCMPTests from "../playwright/runner";

generateCMPTests('Cybotcookiebot', [
  'https://www.wohnen.de/',
  'https://www.zwilling.com/de/',
  'https://forums.cpanel.net/',
  'https://tfl.gov.uk',
  // "https://www.ab-in-den-urlaub.de/", // often blocked by botwall
  "https://www.vatera.hu/",
], {
  skipRegions: ['US']
});
