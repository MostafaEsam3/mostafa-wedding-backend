import mongoose from 'mongoose';
import { Wish } from '../models/Wish.js';

export async function createWish(req, res, next) {
  try {
    const wish = await Wish.create(req.body);

    return res.status(201).json({
      success: true,
      message: 'Wish created successfully',
      data: wish,
    });
  } catch (error) {
    next(error);
  }
}

export async function getWishes(req, res, next) {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 5, 1), 100);
    const skip = (page - 1) * limit;

    const [items, totalItems] = await Promise.all([
      Wish.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Wish.countDocuments({}),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return res.json({
      success: true,
      data: items,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getWishById(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid id' });
    }

    const wish = await Wish.findById(id).lean();

    if (!wish) {
      return res.status(404).json({ success: false, message: 'Wish not found' });
    }

    return res.json({ success: true, data: wish });
  } catch (error) {
    next(error);
  }
}

export async function deleteWish(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid id' });
    }

    const deleted = await Wish.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Wish not found' });
    }

    return res.json({
      success: true,
      message: 'Wish deleted successfully',
    });
  } catch (error) {
    next(error);
  }
}
