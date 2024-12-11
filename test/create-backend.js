const Acl = require("../");

module.exports = async function createBackend(backendType) {
    backendType = backendType || process.env.ACL_BACKEND;

    if (backendType === "memory") return new Acl.memoryBackend();

    if (backendType === "mongo") {
        const { MongoClient } = await require("mongodb");
        const client = await MongoClient.connect("mongodb://localhost:27017/acl_test");

        await client.db("acl_test").dropDatabase();
        return new Acl.mongodbBackend({ client, prefix: "acl_" });
    }

    if (backendType === "mongo_single") {
        const { MongoClient } = await require("mongodb");
        const client = await MongoClient.connect("mongodb://localhost:27017/acl_test");

        await client.db("acl_test").dropDatabase();
        return new Acl.mongodbBackend({ client, prefix: "acl_", useSingle: true });
    }

    throw new Error("Please assign ACL_BACKEND env const to one of: memory, mongo, mongo_single");
};
