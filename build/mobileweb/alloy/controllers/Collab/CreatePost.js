function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function createPost() {
        Cloud.Posts.create({
            content: $.content_text.value,
            title: $.title_text.value,
            custom_fields: {
                parentPost: "",
                childPost: "",
                createdBy: user.username
            }
        }, function(e) {
            if (e.success) {
                var post = e.posts[0];
                alert("Success:\nid: " + post.id + "\ntitle: " + post.title + "\ncontent: " + post.content + "\nupdated_at: " + post.updated_at);
                closeWindow();
            } else alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function closeWindow() {
        var window = Alloy.createController("win4").getView();
        window.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Collab/CreatePost";
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
    var __defers = {};
    $.__views.CreatePost = Ti.UI.createWindow({
        layout: "vertical",
        id: "CreatePost"
    });
    $.__views.CreatePost && $.addTopLevelView($.__views.CreatePost);
    $.__views.title_text = Ti.UI.createTextField({
        color: "#fff",
        height: 50,
        width: 100,
        align: "center",
        backgroundColor: "#2D3442",
        paddingLeft: 15,
        autocapitalize: false,
        autocorrect: false,
        borderWidth: 0,
        id: "title_text"
    });
    $.__views.CreatePost.add($.__views.title_text);
    $.__views.content_text = Ti.UI.createTextField({
        color: "#fff",
        height: 300,
        width: "80%",
        align: "center",
        backgroundColor: "#2D3442",
        paddingLeft: 15,
        autocapitalize: false,
        autocorrect: false,
        borderWidth: 0,
        id: "content_text"
    });
    $.__views.CreatePost.add($.__views.content_text);
    var __alloyId29 = [];
    $.__views.__alloyId30 = Ti.UI.createTableViewRow({
        layout: "horizontal",
        align: "center",
        id: "__alloyId30"
    });
    __alloyId29.push($.__views.__alloyId30);
    $.__views.postButton = Ti.UI.createButton({
        title: "Post",
        id: "postButton"
    });
    $.__views.__alloyId30.add($.__views.postButton);
    createPost ? $.__views.postButton.addEventListener("click", createPost) : __defers["$.__views.postButton!click!createPost"] = true;
    $.__views.cancelButton = Ti.UI.createButton({
        title: "Cancel",
        id: "cancelButton"
    });
    $.__views.__alloyId30.add($.__views.cancelButton);
    closeWindow ? $.__views.cancelButton.addEventListener("click", closeWindow) : __defers["$.__views.cancelButton!click!closeWindow"] = true;
    $.__views.__alloyId28 = Ti.UI.createTableView({
        data: __alloyId29,
        id: "__alloyId28"
    });
    $.__views.CreatePost.add($.__views.__alloyId28);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Cloud = require("ti.cloud");
    var win = Ti.UI.createWindow({
        backgroundColor: "blue",
        exitOnClose: true,
        fullscreen: false,
        layout: "vertical",
        title: "Join the Team"
    });
    win.open({
        activityEnterAnimation: Ti.Android.R.anim.fade_in,
        activityExitAnimation: Ti.Android.R.anim.fade_out
    });
    __defers["$.__views.postButton!click!createPost"] && $.__views.postButton.addEventListener("click", createPost);
    __defers["$.__views.cancelButton!click!closeWindow"] && $.__views.cancelButton.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;