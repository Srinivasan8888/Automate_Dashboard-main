import express from 'express';
import {createAsset, jsonAsset, reportdata, chartjsondata, chartjsondate} from '../controller/api.js'

const router = express.Router();

router.get('/insertdata', createAsset);
router.get('/jsondata', jsonAsset);
router.get('/reportdata', reportdata);
router.get('/limitdata', chartjsondata);
router.get('/limitdate', chartjsondate);

export default router;