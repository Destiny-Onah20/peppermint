exports = async function(changeEvent) {
    // Get the full document of the newly registered user
    const newUser = changeEvent.fullDocument;

    console.log("New user registered:", newUser);

    // Access the `users` collection
    const usersCollection = context.services
        .get("mongodb-atlas")
        .db("peppermint") 
        .collection("users");

    try {
        await usersCollection.updateOne(
            { _id: newUser._id }, 
            { $set: { registeredAt: new Date() } }
        );
        
        console.log(`Timestamp added to user ${newUser._id}`);
    } catch (error) {
        console.error("Failed to add registration timestamp:", error);
    }
};
