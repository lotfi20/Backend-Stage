import Client from '../models/Client.js';
import jwt from 'jsonwebtoken';

export const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createClient = async (req, res) => {
  const client = new Client(req.body);

  try {
    const newClient = await client.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    Object.assign(client, req.body);
    const updatedClient = await client.save();
    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    await client.remove();
    res.status(200).json({ message: 'Client deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginClient = async (req, res) => {
    const { email, phone } = req.body;
  
    try {
      const client = await Client.findOne({ email, phone });
      if (!client) {
        return res.status(401).json({ message: 'Client not found' });
      }
  
      const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, client });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };