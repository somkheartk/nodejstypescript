import express from 'express';
import { createPrediction, getPredictions } from '../controllers/predictionController';

const router = express.Router();

// Create prediction route
router.post('/', createPrediction);

// Get all predictions route
router.get('/', getPredictions);

export default router;
