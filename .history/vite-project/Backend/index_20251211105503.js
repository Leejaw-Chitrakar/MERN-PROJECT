// ...existing code...
import connectToMongo from "./db.js";
import express from "express";
import authRoutes from "./routes/auth.js";
import notesRoutes from "./routes/notes.js";
import productsRoutes from "./routes/products.js";

// Connect to MongoDB
connectToMongo();
const app = express();
const port = 5000;
import cors from 'cors';
app.use(cors());
// import cors from 'cors';
// Middleware to parse JSON requests
app.use(express.json());
// app.use(cors());

app.get('/', (req, res) => {
  res.send('Backend is running successfully');
})

app.get('/api/notes', (req, res) => {
  res.send('Backend is running successfully');
})
// Available Routes 
app.use('/api/auth', authRoutes); 
app.use('/api/notes', notesRoutes);
app.use('/api/products', productsRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost: ${port}`)
})
// ...existing code...