

import Stock from '../models/stock.js';

export const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createStock = async (req, res) => {
  const stock = new Stock({
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity,
    price: req.body.price,
    image: req.body.image
  });

  try {
    const newStock = await stock.save();
    res.status(201).json(newStock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateStock = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    stock.name = req.body.name;
    stock.description = req.body.description;
    stock.quantity = req.body.quantity;
    stock.price = req.body.price;
    stock.image = req.body.image;

    const updatedStock = await stock.save();
    res.status(200).json(updatedStock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteStock = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    await stock.remove();
    res.status(200).json({ message: 'Stock deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
