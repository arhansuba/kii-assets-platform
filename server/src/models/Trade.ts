import mongoose, { Document, Schema } from 'mongoose';

export interface ITrade extends Document {
  assetId: string;
  seller: string;
  buyer: string;
  price: number;
  status: 'listed' | 'sold' | 'cancelled';
  transactionHash: string;
  createdAt: Date;
  updatedAt: Date;
}

const TradeSchema: Schema = new Schema({
  assetId: { type: String, required: true },
  seller: { type: String, required: true },
  buyer: { type: String },
  price: { type: Number, required: true },
  status: { type: String, enum: ['listed', 'sold', 'cancelled'], default: 'listed' },
  transactionHash: { type: String },
}, { timestamps: true });

export default mongoose.model<ITrade>('Trade', TradeSchema);