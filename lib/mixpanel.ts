/* 
  lib/mixpanel.ts
  ------------------------
  A quick series of functions that relate to Mixpanel.
 */

import mixpanel from "mixpanel-browser";

export function mixpanelInit() {
  mixpanel.init("c65635ca1d6461267733659d2c821911", {
    debug: process.env.NODE_ENV === "development",
  });
}
