

import Stock from '../models/stock.js';

// In your controller (e.g., stockController.js)
export const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find().lean(); // Returns a plain JavaScript object with an `id` field
    res.status(200).json(stocks);
  } catch (error) {
    res.status(400).json({ message: 'Failed to retrieve stocks', error: error.message });
  }
};



export const createStock = async (req, res) => {
  try {
    const { name, description, quantity, price, image } = req.body;

    if (!name || !description || !quantity || !price || !image) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newStock = new Stock({ name, description, quantity, price, image });
    await newStock.save();
    res.status(201).json(newStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await Stock.findByIdAndUpdate(id, req.body, { new: true });

    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    res.status(200).json(stock);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update stock', error: error.message });
  }
};




export const deleteStock = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await Stock.findById(id);

    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    // Use deleteOne() or findByIdAndDelete() instead of remove()
    await Stock.deleteOne({ _id: id });

    res.status(200).json({ message: 'Stock deleted successfully' });
  } catch (error) {
    console.error('Error deleting stock:', error);
    res.status(500).json({ message: 'Failed to delete stock' });
  }
};

