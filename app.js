require("dotenv").config();
require("express-async-errors");

const { connectDb } = require("./db/connect");

const express = require("express");
const port = process.env.PORT || 3000;

const productsRouter = require("./routes/products");
const app = express();

const notFoundMiddleware = require("./middleware/not-found");

const errorMiddleware = require("./middleware/error-handler");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Store API</h1><a href='/api/v1/products'>products route</a>");
});

app.use("/api/v1/products", productsRouter);

// routes
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log("Server is running on port: " + port);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
