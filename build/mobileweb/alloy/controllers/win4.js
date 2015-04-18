function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "win4";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.win4 = Ti.UI.createWindow({
        id: "win4"
    });
    $.__views.win4 && $.addTopLevelView($.__views.win4);
    $.__views.label = Ti.UI.createLabel({
        text: "This is Collaboration",
        id: "label"
    });
    $.__views.win4.add($.__views.label);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.UI.createWindow({
        backgroundColor: "red",
        exitOnClose: true,
        fullscreen: false,
        layout: "vertical",
        title: "Join the Team"
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;