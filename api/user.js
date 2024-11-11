exports = async function({ email, password }) {
    const usersCollection = context.services
      .get("mongodb-atlas")
      .db("userDB")
      .collection("users");
    
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }
    
    const newUser = await context.functions.execute(
      "auth.createUserWithEmail",
      email,
      password
    );
  
    await usersCollection.insertOne({
      _id: newUser._id,
      email: newUser.email,
      createdAt: new Date(),
    });
    return { message: "User registered successfully" };
  };

  exports = async function({ email, password }) {
    const auth = context.services.get("mongodb-atlas").auth;
    const credentials = context.functions.execute(
      "auth.loginWithEmail",
      email,
      password
    );
  
    if (!credentials) {
      throw new Error("Invalid login credentials");
    }
  
    return { message: "Login successful", user: credentials.user };
  };

  