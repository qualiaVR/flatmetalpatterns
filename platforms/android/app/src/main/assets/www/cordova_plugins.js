cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-splashscreen.SplashScreen",
    "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
    "pluginId": "cordova-plugin-splashscreen",
    "clobbers": [
      "navigator.splashscreen"
    ]
  },
  {
    "id": "cc.fovea.cordova.purchase.InAppBillingPlugin",
    "file": "plugins/cc.fovea.cordova.purchase/www/store-android.js",
    "pluginId": "cc.fovea.cordova.purchase",
    "clobbers": [
      "store"
    ]
  },
  {
    "id": "cordova-plugin-inapppurchase.InAppBillingV3",
    "file": "plugins/cordova-plugin-inapppurchase/www/index-android.js",
    "pluginId": "cordova-plugin-inapppurchase",
    "merges": [
      "inAppPurchase"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-splashscreen": "5.0.2",
  "cc.fovea.cordova.purchase": "7.4.3",
  "cordova-plugin-inapppurchase": "1.1.0"
};
// BOTTOM OF METADATA
});