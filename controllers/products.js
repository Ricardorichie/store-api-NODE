const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } });
  // throw new Error("testing async errors");
  res.status(200).json({ msg: "products testing route" });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  // if (company) {
  //   queryObject.company = company;
  // }
  // if (name) {
  //   queryObject.name = { $regex: name, $options: "i" };
  // }
  // if (numericFilters) {
  //   const operatorMap = {
  //     ">": "$gt",
  //     ">=": "$gte",
  //     "=": "$eq",
  //     "<": "$lt",
  //     "<=": "$lte",
  //   };
  //   const regEx = /\b(<|>|>=|=|<|<=)\b/g;
  //   let filters = numericFilters.replace(
  //     regEx,
  //     (match) => `-${operatorMap[match]}-`
  //   );

  const products = await Product.find(queryObject);
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProductsStatic, getAllProducts };
