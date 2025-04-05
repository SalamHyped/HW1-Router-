const express = require("express");
const router = express.Router();
const data = require("../data");
const path = require("path");

router.get("/", (req, res) => {
  res.json(data.products);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    exist = data.products.find((e) => e.id == Number(id));
    if (exist) res.json(exist);
    else res.status(404).json({ message: `User not found` });
  } else res.status(404).json({ message: `User not found` });
});

router.post("/", (req, res) => {
  const { id, price, name ,stock} = req.body;
  const exist = data.products.find((e) => e.id == id);
  if (exist) res.status(404).json({ message: `User already found` });
  else if (price > 0 &&stock>0&& name)
    data.products.push({ id: id, name: name, price: price });
  res.status(404).json({ message: `User has added` });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const productData = req.body;
  //find index of user by id into array
  const userInd = data.users.findIndex((item) => product.id === parseInt(id));

  if (userInd !== -1 && productData.stock && productData.stock>0) {
    //change user into array
    data.products[userInd] = productData;
    res.json({ message: `User with ID: ${id} updated`, users: data.products });
  } else {
    res.status(404).json({ message: `Product not found` });
  }
});
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const userInd = data.products.findIndex((item) => item.id === parseInt(id));

  if (userInd !== -1) {
    //delete user into array
    data.products.splice(userInd, 1);
    res.json({
      message: `Product with ID: ${id} deleted`,
      users: data.products,
    });
  } else {
    res.status(404).json({ message: `Product not found` });
  }
});

module.exports = router;
