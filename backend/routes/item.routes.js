import jwt from '../middleware/auth';
import { Router } from "express";
const itemRouter = Router();
const itemController = require('../controllers/item.controller.js');

// Retrieve All data
itemRouter.get('/list', jwt, itemController.findAll);

// Retrieve data with pagination
itemRouter.get('/', jwt, itemController.findPagination);

// Find one by ID
itemRouter.get('/:id', jwt, itemController.findOne);

// Create
itemRouter.post('/', jwt, itemController.create);

// Update
itemRouter.put('/:id', jwt, itemController.update);

// Delete
itemRouter.delete('/:id', jwt, itemController.delete);

export default itemRouter;
