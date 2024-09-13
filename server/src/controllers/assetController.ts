import { Request, Response } from 'express';
import Asset, { IAsset } from '../models/Asset';
import { tokenizationService } from '../services/tokenization';
import { kiiChainService } from '../services/kiichain';

export const createAsset = async (req: Request, res: Response): Promise<void> => {
  try {
    const { assetType, value, location, owner, metadata } = req.body;
    const newAsset: IAsset = new Asset({
      assetType,
      value,
      location,
      owner,
      metadata
    });

    const savedAsset = await newAsset.save();
    const tokenId = await tokenizationService.tokenizeAsset(savedAsset, process.env.OWNER_PRIVATE_KEY!);
    
    savedAsset.tokenId = tokenId;
    await savedAsset.save();

    res.status(201).json(savedAsset);
  } catch (error) {
    res.status(500).json({ message: 'Error creating asset', error });
  }
};

export const getAsset = async (req: Request, res: Response): Promise<void> => {
  try {
    const asset = await Asset.findOne({ tokenId: req.params.tokenId });
    if (!asset) {
      res.status(404).json({ message: 'Asset not found' });
      return;
    }

    const onChainDetails = await kiiChainService.getAssetDetails(asset.tokenId);
    const mergedAsset = { ...asset.toObject(), onChainDetails };

    res.status(200).json(mergedAsset);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching asset', error });
  }
};

export const getAllAssets = async (req: Request, res: Response): Promise<void> => {
  try {
    const assets = await Asset.find();
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assets', error });
  }
};

// Add more controller methods as needed