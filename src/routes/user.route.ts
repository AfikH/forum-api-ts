import express from 'express';

import userController from '../controllers/user.controller';

const router = express.Router();

router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.get('/:id', userController.findUser);
router.get('/', userController.findUsers);
router.delete('/:id', userController.deleteUser);

export default router;