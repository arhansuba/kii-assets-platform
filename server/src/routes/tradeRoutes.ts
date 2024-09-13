import * as express from 'express';
import { listAsset, buyAsset, getActiveTrades } from '../controllers/tradeController';

const router = express.Router();

router.post('/list', listAsset);
router.post('/buy', buyAsset);
router.get('/active', getActiveTrades);

// Add more routes as needed

export default router;