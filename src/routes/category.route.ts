import express from 'express';

import categoryController from '../controllers/category.controller';

const router = express.Router();

router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.get('/:id', categoryController.findCategory);
router.get('/', categoryController.findCategories);
router.delete('/:id', categoryController.deleteCategory);

export default router;