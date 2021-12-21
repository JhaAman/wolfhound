import mixpanel from "mixpanel-browser";
// or with require() syntax:
// const mixpanel = require('mixpanel-browser');

// Enabling the debug mode flag is useful during implementation,
// but it's recommended you remove it for production

export function mixpanelInit() {
  mixpanel.init("c65635ca1d6461267733659d2c821911", {
    debug: process.env.NODE_ENV === "development",
  });
}
