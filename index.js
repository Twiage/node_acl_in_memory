module.exports = require("./lib/acl.js");
module.exports.__defineGetter__("memoryBackend", function () {
    return require("./lib/memory-backend.js");
});
