exports = async function(payload) {
    const status = payload.query.status;

    if (status !== "active" && status !== "inactive") {
        return {
            status: 400,
            body: JSON.stringify({ error: "Invalid status. Must be 'active' or 'inactive'." })
        };
    }

    const usersCollection = context.services
        .get("mongodb-atlas")
        .db("peppermintt")
        .collection("users");

    const users = await usersCollection.find({ status }).toArray();

    return {
        status: 200,
        body: users
    };
};
