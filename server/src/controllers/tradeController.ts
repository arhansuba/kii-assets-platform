import { Request, Response } from 'express';
import Trade, { ITrade } from '../models/Trade';
import Asset from '../models/Asset';
import { kiiChainService } from '../services/kiichain';

export const listAsset = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tokenId, price, sellerPrivateKey } = req.body;
    const asset = await Asset.findOne({ tokenId });
    if (!asset) {
      res.status(404).json({ message: 'Asset not found' });
      return;
    }

    const tx = await kiiChainService.listAsset(tokenId, price, sellerPrivateKey);
    const receipt = await tx.wait();

    const newTrade: ITrade = new Trade({
      assetId: tokenId,
      seller: asset.owner,
      price,
      status: 'listed',
      transactionHash: receipt.transactionHash
    });

    await newTrade.save();
    res.status(201).json(newTrade);
  } catch (error) {
    res.status(500).json({ message: 'Error listing asset', error });
  }
};

export const buyAsset = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tokenId, buyerPrivateKey } = req.body;
    const trade = await Trade.findOne({ assetId: tokenId, status: 'listed' });
    if (!trade) {
      res.status(404).json({ message: 'Listed asset not found' });
      return;
    }

    const tx = await kiiChainService.buyAsset(tokenId, trade.price.toString(), buyerPrivateKey);
    const receipt = await tx.wait();

    trade.status = 'sold';
    trade.buyer = receipt.from;
    trade.transactionHash = receipt.transactionHash;
    await trade.save();

    const asset = await Asset.findOne({ tokenId });
    if (asset) {
      asset.owner = receipt.from;
      await asset.save();
    }

    res.status(200).json(trade);
  } catch (error) {
    res.status(500).json({ message: 'Error buying asset', error });
  }
};

export const getActiveTrades = async (req: Request, res: Response): Promise<void> => {
  try {
    const trades = await Trade.find({ status: 'listed' });
    res.status(200).json(trades);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching active trades', error });
  }
};

// Add more controller methods as needed