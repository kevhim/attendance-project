require('dotenv/config');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { sequelize } = require('./db.js');
const adminRoutes = require('./routes/adminRoutes.js');
const publicRoutes = require('./routes/publicRoutes.js');

const app = express();
app.use(bodyParser.json());

app.use('/api/admin', adminRoutes);
app.use('/api', publicRoutes);

const buildPath = path.resolve(__dirname, '../frontend/dist');
app.use(express.static(buildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const PORT = process.env.PORT || 4000;

sequelize.sync()
  .then(() => {
    console.log('✅ SQLite database connected and synced.');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ DB connection error:', err);
  });
