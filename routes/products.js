const express = require('express');
const router = express.Router();
const products = require('../products.json'); 

router.get('/', (req, res) => {
  res.json(products);
});

router.get('/instock/:qt', (req, res) => {
    const quantity = parseInt(req.params.qt, 10);

    if (isNaN(quantity) || quantity < 0) {
        return res.status(400).json({ error: 'Quantité invalide' });
    }
  const inStockProducts = Object.values(products).filter(product => product.stock >= quantity);

    if (inStockProducts.length === 0) {
        return res.status(404).json({ error: 'Aucun produit en stock trouvé' });
    }

    res.json(inStockProducts);
});

router.get('/:id', (req, res) => {
    const product = products[req.params.id]; 
    if (!product) {
        return res.status(404).json({ error: 'Produit non trouvé' });
    }
    res.json(product);
});

router.get('/:id/:qt', (req, res) => {
    const product = products[req.params.id];
    const quantity = parseInt(req.params.qt, 10);

    if (!product) {
        return res.status(404).json({ error: 'Produit non trouvé' });
    }
    
    if (isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ error: 'Quantité invalide' });
    }
    const price=product.price;
    const id=product.id;
    const totalPrice = price * quantity;
    res.json({id,quantity ,price,totalPrice });
});
module.exports = router;