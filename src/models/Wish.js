import mongoose from 'mongoose';

const wishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    relationship: {
      type: String,
      required: true,
      enum: ['Friend', 'Family', 'Colleague', 'Well-wisher'],
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 1000,
    },
    willAttend: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

wishSchema.index({ createdAt: -1 });

export const Wish = mongoose.model('Wish', wishSchema);
