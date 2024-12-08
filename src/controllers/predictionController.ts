import { Request, Response } from 'express';
import Prediction from '../models/prediction.model';

export async function createPrediction(req: Request, res: Response) {
    const { userId, predictionData } = req.body;

    try {
        const newPrediction = new Prediction({ user: userId, predictionData });
        await newPrediction.save();
        res.status(201).json(newPrediction);
    } catch (error) {
        res.status(500).json({ message: 'Error creating prediction' });
    }
}

export const getPredictions = async (req: Request, res: Response) => {
  try {
    const predictions = await Prediction.find().populate('user');
    res.status(200).json(predictions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching predictions' });
  }
};
