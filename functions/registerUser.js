exports = async function(payload) {
    const { email, password } = JSON.parse(payload.body.text());
    
    const usersCollection = context.services
        .get("mongodb-atlas")
        .db("peppermint")
        .collection("users");

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
        return { status: 400, body: JSON.stringify({ message: "User already exists" }) };
    }

    const newUser = {
        email,
        passwordHash: password,
        status: "active",
        createdAt: new Date()
    };
    
    await usersCollection.insertOne(newUser);

    return { status: 201, body: JSON.stringify({ message: "User registered successfully" }) };
};

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
        body: JSON.stringify(users)
    };
};
