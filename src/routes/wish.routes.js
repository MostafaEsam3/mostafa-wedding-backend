import { Router } from 'express';
import {
  createWish,
  deleteWish,
  getWishById,
  getWishes,
} from '../controllers/wish.controller.js';
import { requireAdminKey } from '../middleware/adminKey.js';
import { validate } from '../middleware/validate.js';
import { createWishSchema } from '../validators/wish.validator.js';

const router = Router();

router.post('/', validate(createWishSchema), createWish);
router.get('/', getWishes);
router.get('/:id', getWishById);
router.delete('/:id', requireAdminKey, deleteWish);

export default router;
