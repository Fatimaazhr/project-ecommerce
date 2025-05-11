const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProduk);
router.get('/:id', productController.getProdukById);
router.post('/', productController.createProduk);
router.put('/:id', productController.updateProduk);
router.delete('/:id', productController.deleteProduk);

module.exports = router;
