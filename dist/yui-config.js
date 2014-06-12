var YUI_config = {
    modules: {
    	"button-base": {
            fullpath: "/dist/plugins/button-base.js",
            requires: ["base-build", "plugin", "button"]
        },

        "button-strong": {
            fullpath: "/dist/plugins/button-strong.js",
            requires: ["button-base"]
        },

        "button-em": {
            fullpath: "/dist/plugins/button-em.js",
            requires: ["button-base"]
        },

        "button-link": {
            fullpath: "/dist/plugins/button-link.js",
            requires: ["button-base"]
        },

        "button-h1": {
            fullpath: "/dist/plugins/button-h1.js",
            requires: ["button-base"]
        },

        "button-h2": {
            fullpath: "/dist/plugins/button-h2.js",
            requires: ["button-base"]
        },

        "button-u": {
            fullpath: "/dist/plugins/button-underline.js",
            requires: ["button-base"]
        }
    },
};