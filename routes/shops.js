const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');
const authenticateToken = require('../middlewares/auth');

// Create Shop - POST /shops (ต้องมี token)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, address } = req.body;
    if (!name || !address) return res.status(400).json({ message: 'Name and address required' });

    const shop = await Shop.create({ name, address });
    res.status(201).json({ message: 'Shop created successfully', shop });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Read all shops or filter by name - GET /shops?name=CoffeeKK
router.get('/', async (req, res) => {
  try {
    const { name } = req.query;
    let shops;

    if (name) {
      shops = await Shop.findAll({ where: { name } });
      if (shops.length === 0) return res.status(404).json({ message: 'Shop not found' });
    } else {
      shops = await Shop.findAll();
    }

    res.json(shops.map(shop => ({ name: shop.name, address: shop.address })));
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update Shop - PUT /shops/:id (ต้องมี token)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address } = req.body;
    if (!name || !address) return res.status(400).json({ message: 'Name and address required' });

    const shop = await Shop.findByPk(id);
    if (!shop) return res.status(404).json({ message: 'Shop not found' });

    shop.name = name;
    shop.address = address;
    await shop.save();

    res.json({ name: shop.name, address: shop.address });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete Shop - DELETE /shops/:id (ต้องมี token)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const shop = await Shop.findByPk(id);
    if (!shop) return res.status(404).json({ message: 'Shop not found' });

    await shop.destroy();
    res.json({ message: 'Shop deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
