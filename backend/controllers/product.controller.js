const { Product } = require("../models");

const createProduct = async (req, res) => {
  const productInfo = req.body;

  try {
    const newProduct = await Product.create({
      name: productInfo.name,
      price: productInfo.price,
      image: productInfo.image,
      category: productInfo.category,
      color: productInfo.color.split(" "),
      size: productInfo.size.split(" "),
    });

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to connect to the db" });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    await Product.deleteOne({ _id: productId });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to connect to the db" });
  }
};

const allProducts = async (req, res) => {
  const { category, color, size } = req.query;
  const filter = {};

  if (category) filter.category = category;
  if (color) filter.color = color;
  if (size) filter.size = size;

  try {
    const allProducts = await Product.find(filter);

    res.status(200).json({ products: allProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to connect to the db" });
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  allProducts,
};
