import * as express from 'express';
import { createAsset, getAsset, getAllAssets } from '../controllers/assetController';

const router = express.Router();

router.post('/', createAsset);
router.get('/:tokenId', getAsset);
router.get('/', getAllAssets);

// Add more routes as needed

export default router;