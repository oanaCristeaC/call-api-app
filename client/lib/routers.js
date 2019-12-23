import "/imports/ui/body.js";
import "/imports/ui/pack.js";
import "/imports/ui/wolves.js";

Router.route("home", {
    path: "/",
    template: "home" //change template target
});

Router.route("pack", {
    path: "/pack",
    template: "pack"
});

Router.route("wolves", {
    path: "/wolves",
    template: "wolves"
});