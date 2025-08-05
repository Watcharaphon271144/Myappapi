const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwtSecret } = require('../config');

// ตัวอย่าง users เก็บในหน่วยความจำ (จริงควรเก็บใน DB)
const users = [
  { id: 1, username: 'admin', password: bcrypt.hashSync('123456', 8) }
];

// POST /auth (login)
router.post('/', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: 'User not found' });

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) return res.status(401).json({ message: 'Invalid password' });

  const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
