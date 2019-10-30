cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cc.fovea.cordova.purchase.InAppPurchase",
      "file": "plugins/cc.fovea.cordova.purchase/www/store-ios.js",
      "pluginId": "cc.fovea.cordova.purchase",
      "clobbers": [
        "store"
      ]
    },
    {
      "id": "cordova-plugin-inapppurchase.PaymentsPlugin",
      "file": "plugins/cordova-plugin-inapppurchase/www/index-ios.js",
      "pluginId": "cordova-plugin-inapppurchase",
      "clobbers": [
        "inAppPurchase"
      ]
    },
    {
      "id": "cordova-plugin-splashscreen.SplashScreen",
      "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
      "pluginId": "cordova-plugin-splashscreen",
      "clobbers": [
        "navigator.splashscreen"
      ]
    }
  ];
  module.exports.metadata = {
    "cc.fovea.cordova.purchase": "7.4.3",
    "cordova-plugin-inapppurchase": "1.1.0",
    "cordova-plugin-splashscreen": "5.0.2",
    "cordova-plugin-whitelist": "1.3.3",
    "cordova-plugin-websql": "0.0.10"
  };
});