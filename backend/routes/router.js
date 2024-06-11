import express from 'express';
import {createAsset, jsonAsset } from '../controller/api.js'

const router = express.Router();

router.get('/insertdata', createAsset);
router.get('/jsondata', jsonAsset);



export default router;