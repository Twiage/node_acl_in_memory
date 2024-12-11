const Acl = require("../");

module.exports = async function createBackend(backendType) {
    backendType = backendType || process.env.ACL_BACKEND;

    if (backendType === "memory") return new Acl.memoryBackend();

    throw new Error("Please assign ACL_BACKEND env const to one of: memory");
};
