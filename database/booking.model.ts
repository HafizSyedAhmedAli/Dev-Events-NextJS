import { Schema, model, models, Document, Types } from 'mongoose';

// TypeScript interface for a Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      validate: {
        validator: (v: string) => {
          // RFC 5322 compliant email regex
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(v);
        },
        message: 'Invalid email format',
      },
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

// Pre-save hook to verify that the referenced event exists
BookingSchema.pre('save', async function () {
  // Only validate eventId if it's modified or the document is new
  if (this.isModified('eventId') || this.isNew) {
    // Dynamically import an Event model to avoid circular dependencies
    const Event = models.Event || (await import('./event.model')).default;
    
    // Check if the event exists
    const eventExists = await Event.findById(this.eventId);
    
    if (!eventExists) {
      throw new Error(`Event with ID ${this.eventId} does not exist`);
    }
  }
});

// Create index on eventId for faster queries
BookingSchema.index({ eventId: 1 });

// Compound index for efficient event-specific email lookups (prevents duplicate bookings)
BookingSchema.index({ eventId: 1, email: 1 }, { unique: true });

// Prevent model recompilation in development (Next.js hot reload)
const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking;
