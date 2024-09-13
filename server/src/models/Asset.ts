import mongoose, { Document, Schema } from 'mongoose';

export interface IAsset extends Document {
  tokenId: string;
  assetType: string;
  value: number;
  location: string;
  owner: string;
  metadata: string;
  createdAt: Date;
  updatedAt: Date;
}

const AssetSchema: Schema = new Schema({
  tokenId: { type: String, required: true, unique: true },
  assetType: { type: String, required: true },
  value: { type: Number, required: true },
  location: { type: String, required: true },
  owner: { type: String, required: true },
  metadata: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IAsset>('Asset', AssetSchema);