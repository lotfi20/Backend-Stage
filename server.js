import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';

import userRoutes from './routes/user.js';
import servicesRoutes from './routes/serviceSociauxRoute.js';
import experienceRoutes from './routes/experienceRouter.js';
import communityRoutes from './routes/communityRouter.js';
import formationRoutes from './routes/Formations.js';
import educationRoutes from './routes/Educations.js';
import stockRoutes from './routes/stockRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import technicianRoutes from './routes/technicianRoutes.js'; // Technicians
import interventionRoutes from './routes/interventionRoutes.js'; // Interventions
import paymentRouter from './routes/payment-router.js';
import supervisorRoutes from './routes/supervisorRoutes.js';
import SoinsRoutes from './routes/stockRoutes.js';
import opportuniteRoutes from './routes/OpportuniteRoutes.js'; // Import Opportunite routes

import { errorHandler, notFoundError } from './middlewares/error_handler.js';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// MongoDB connection
const port = process.env.PORT || 9090;
const databaseName = 'pdm';
mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose
  .connect(`mongodb://0.0.0.0:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch((err) => {
    console.log(err);
  });

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'yoursecret', resave: false, saveUninitialized: false }));

// Custom logging middleware
app.use((req, res, next) => {
  console.log('Middleware just ran!');
  next();
});

// Route setups
app.use('/gse', (req, res, next) => {
  console.log('Middleware just ran a gse route!');
  next();
});

app.use('/api/opportunite', opportuniteRoutes);
app.use('/api/supervisors', supervisorRoutes);
app.use('/user', userRoutes);
app.use('/service', servicesRoutes);
app.use('/community', communityRoutes);
app.use('/experience', experienceRoutes);
app.use('/formation', formationRoutes);
app.use('/education', educationRoutes);
app.use('/stock', stockRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/technicians', technicianRoutes);
app.use('/api/interventions', interventionRoutes);
app.use('/payment', paymentRouter);
app.use('/soin', SoinsRoutes); // Ensure this does not conflict with '/stock'

app.get('/api/interventions/technician/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const interventions = await Intervention.find({ technician: id });
    res.json(interventions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// 404 handler (placed after all routes)
app.use(notFoundError);

// Global error handler (placed after 404 handler)
app.use(errorHandler);

// Socket.io setup
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

export { io };
