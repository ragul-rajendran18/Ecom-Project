const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();
console.log('Mongo URI from env:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const products = [
  {
    name: 'Men Classic Watch',
    image: 'https://images.unsplash.com/photo-1519751138087-5a123a49a3c7',
    price: 2999,
    category: 'Watch',
    description: 'Elegant classic analog watch with leather strap and premium finish.',
  },
  {
    name: 'Women Summer Dress',
    image: 'https://images.unsplash.com/photo-1520975922171-48b1e9b8e91b',
    price: 1999,
    category: 'Dress',
    description: 'Lightweight and stylish summer dress made of soft cotton fabric.',
  },
  {
    name: 'Running Shoes',
    image: 'https://images.unsplash.com/photo-1513105737059-ff0cf0580e2d',
    price: 3499,
    category: 'Shoes',
    description: 'Comfortable and durable running shoes for everyday fitness.',
  },
  {
    name: 'Leather Handbag',
    image: 'https://images.unsplash.com/photo-1618354691373-d850f3d1c27e',
    price: 2599,
    category: 'Bags',
    description: 'Premium leather handbag with elegant design and spacious interior.',
  },
  {
    name: 'Wireless Earbuds',
    image: 'https://images.unsplash.com/photo-1583225023369-51e43a14a48f',
    price: 1499,
    category: 'Electronics',
    description: 'High-quality wireless earbuds with long battery life and noise cancellation.',
  },
];

async function seedData() {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('✅ Sample data inserted!');
    process.exit();
  } catch (error) {
    console.error('❌ Error inserting data:', error);
    process.exit(1);
  }
}

seedData();
