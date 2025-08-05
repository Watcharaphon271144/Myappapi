const express = require('express');
const app = express();
const sequelize = require('./middlewares/database');
const shopsRoutes = require('./routes/shops');
const authRoutes = require('./routes/auth');
const { port } = require('./config');

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/shops', shopsRoutes);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(err => {
  console.error('Failed to sync db:', err);
});
