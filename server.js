import express from 'express';

const app = express();

// Middleware
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Root route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Data
let products = [
  { id: 1, name: "mi" },
  { id: 2, name: "iphone" },
  { id: 3, name: "oppo" }
];

// GET all products
app.get('/products', (req, res) => {
  res.json(products);
});

// GET product by ID
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  res.json(product);
});

// POST add product
app.post('/products', (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.json(newProduct);
});

// PUT update product
app.put('/products/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  Object.assign(product, req.body);
  res.json(product);
});

// DELETE product
app.delete('/products/:id', (req, res) => {
  products = products.filter(p => p.id != req.params.id);
  res.send("Deleted successfully");
});

// Server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});