exports = async function(payload) {
    const { email, password, name } = JSON.parse(payload.body.text());

      const crypto = require("crypto");

    // Hash the password using SHA-256
    const hash = crypto.createHash("sha256");
    hash.update(password);
    const hashedPassword = hash.digest("hex");
  
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
        name,
        password: hashedPassword,
        status: "active",
        createdAt: new Date()
    };
    
    await usersCollection.insertOne(newUser);

    return { status: 201, body: JSON.stringify({ message: "User registered successfully" }) };
};
