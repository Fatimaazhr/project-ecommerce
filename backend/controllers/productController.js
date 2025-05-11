const Produk = require('../models/productModel');

exports.getAllProduk = async (req, res) => {
  try {
    const data = await Produk.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProdukById = async (req, res) => {
  try {
    const data = await Produk.getById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProduk = async (req, res) => {
  try {
    const newProduk = req.body;
    const result = await Produk.create(newProduk);
    res.status(201).json({ message: 'Produk ditambahkan', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduk = async (req, res) => {
  try {
    const updatedProduk = req.body;
    const result = await Produk.update(req.params.id, updatedProduk);
    res.json({ message: 'Produk diperbarui', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduk = async (req, res) => {
  try {
    const result = await Produk.delete(req.params.id);
    res.json({ message: 'Produk dihapus', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
