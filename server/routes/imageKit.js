const { Router } = require('express');
// const { authMiddleware } = require('../middleware/auth');
const imagetKitRouter = Router();

const {getEndPoints}=require('../controllers/imageKitController');

imagetKitRouter.get('/status',getEndPoints);

module.exports = imagetKitRouter;