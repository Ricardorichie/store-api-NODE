require("dotenv").config();

//This is the file that we will run to populate our database with the products.json file.
const { connectDb } = require("./db/connect");
const Product = require("./models/product");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDb();
    await Product.deleteMany();
    await Product.create(jsonProducts);
    // app.listen(port, () => {
    //   console.log("Server is running on port: " + port);
    // });
    process.exit(0);
  } catch (error) {
    console.log("error", error);
    process.exit(1);
  }
};
start();
