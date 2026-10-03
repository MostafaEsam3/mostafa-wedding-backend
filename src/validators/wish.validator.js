import { z } from 'zod';

export const createWishSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
  relationship: z.enum(['Friend', 'Family', 'Colleague', 'Well-wisher'], {
    required_error: 'Relationship is required',
  }),
  message: z
    .string({ required_error: 'Message is required' })
    .trim()
    .min(2, 'Message must be at least 2 characters')
    .max(1000, 'Message must be at most 1000 characters'),
  willAttend: z.boolean().optional().default(false),
});
