exports = async function( ) {

    // Define the collection
    const productsCollection = context.services
        .get("mongodb-atlas")
        .db("peppermint")
        .collection("products");


    try {
        // Retrieve products from the collection
        const products = await productsCollection.find().toArray();

        return {
            status: 200,
            body: products
        };
    } catch (error) {

        return {
            status: 500,
            body: JSON.stringify({ error: "Failed to fetch products" })
        };
    }
};
