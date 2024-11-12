exports = async function(payload) {
    const { name, price } = JSON.parse(payload.body.text());

    // Validate required fields
    if (!name || !price || !category) {
        return {
            status: 400,
            body: JSON.stringify({ error: "Product name, price, and category are required." })
        };
    }

    // Define the collection
    const productsCollection = context.services
        .get("mongodb-atlas")
        .db("peppermint") // Replace with your database name
        .collection("products");

    // Create a new product document
    const product = {
        name,
        price,
        inStock: true,
        createdAt: new Date()
    };

    try {
        // Insert the product into the collection
        const result = await productsCollection.insertOne(product);

        return {
            status: 201,
            body: {
                message: "Product created successfully",
                product: result
            }
        };
    } catch (error) {
        return {
            status: 500,
            body: { error: "Failed to create product" }
        };
    }
};
