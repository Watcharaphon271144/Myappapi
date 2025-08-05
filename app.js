const express = require('express');
const app = express();
const sequelize = require('./middlewares/database');
const shopsRoutes = require('./routes/shops');
const loginRoutes = require('./routes/login'); // ✅ เปลี่ยนชื่อ
const { port } = require('./config');

app.use(express.json());

// ✅ เปลี่ยน path /auth → /login
app.use('/login', loginRoutes);
app.use('/shops', shopsRoutes);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(err => {
  console.error('Failed to sync db:', err);
});
