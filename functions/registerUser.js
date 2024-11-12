exports = async function(payload) {
    const { email, password, status } = JSON.parse(payload.body.text());
    
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
        status: status || "inactive",
        createdAt: new Date()
    };
    
    await usersCollection.insertOne(newUser);

    return { status: 201, body: JSON.stringify({ message: "User registered successfully" }) };
};
