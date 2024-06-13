import express from 'express';
import {createAsset, jsonAsset, reportdata } from '../controller/api.js'

const router = express.Router();

router.get('/insertdata', createAsset);
router.get('/jsondata', jsonAsset);
router.get('/reportdata', reportdata);


export default router;