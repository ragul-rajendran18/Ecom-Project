const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productsRoute = require('./routes/products');
const cartRoute = require('./routes/cart');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productsRoute);
app.use('/api/cart', cartRoute);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Mongo connect error', err);
});
