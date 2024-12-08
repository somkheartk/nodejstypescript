import mongoose, { Document, Schema } from 'mongoose';

export interface IPrediction extends Document {
  user: mongoose.Schema.Types.ObjectId;
  predictionData: string; // สามารถเปลี่ยนเป็นชนิดข้อมูลที่คุณต้องการ
}

const predictionSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  predictionData: { type: String, required: true }, // สามารถเปลี่ยนเป็นประเภทข้อมูลอื่นได้
}, { timestamps: true });

const Prediction = mongoose.model<IPrediction>('Prediction', predictionSchema);
export default Prediction;
