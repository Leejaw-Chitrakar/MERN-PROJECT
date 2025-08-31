// ...existing code...
import connectToMongo from "./db.js";
import express from "express";
import {authRoutes} from "./routes/auth.js";
import notesRoutes from "./routes/notes.js";
connectToMongo();
const app = express();
const port = 5000;

// Middleware to parse JSON requests
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
// Available Routes 
app.use('/api/auth', authRoutes); 
app.use('/api/notes', notesRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
// ...existing code...