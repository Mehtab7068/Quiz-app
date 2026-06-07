import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js';
import resultRouter from './routes/resultRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173',                 // For local development (Vite)
  'http://localhost:3000',                 // For local development (Alternative)
  'https://quiz-app-six-nu-78.vercel.app' // 🚀 Your brand new live Vercel URL
];

// Middleware
// app.use(cors())
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Insomnia, or Postman tools)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// Routes
app.use("/api/auth", userRouter);
app.use("/api/results", resultRouter);

app.get('/', (req, res) => {
    res.send('API Working');
});

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});
