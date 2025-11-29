import mongoose from 'mongoose';

// Define the MongoDB connection string type
const MONGODB_URI = process.env.MONGODB_URI as string;

// Validate that the MONGODB_URI environment variable is defined
if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

// Define types for the cached connection
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

// Extend the NodeJS global type to include our mongoose cache
declare global {
    // eslint-disable-next-line no-var
    var mongoose: MongooseCache | undefined;
}

// Initialize the cached connection object
// In development, use a global variable to preserve the connection across hot reloads
// In production, the cache will be created fresh on each cold start
let cached: MongooseCache = global.mongoose || {conn: null, promise: null};

if (!global.mongoose) {
    global.mongoose = cached;
}

/**
 * Establishes a connection to MongoDB using Mongoose
 *
 * This function implements connection caching to prevent multiple
 * simultaneous connections in serverless environments like Next.js
 *
 * @returns {Promise<typeof mongoose>} The mongoose instance
 */
async function connectDB(): Promise<typeof mongoose> {
    // Return existing connection if already established
    if (cached.conn) {
        return cached.conn;
    }

    // If no connection promise exists, create a new one
    if (!cached.promise) {
        const opts = {
            bufferCommands: false, // Disable buffering to fail fast in serverless environments
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log('✅ MongoDB connected successfully');
            return mongoose;
        });
    }

    try {
        // Wait for the connection promise to resolve
        cached.conn = await cached.promise;
    } catch (error) {
        // Reset the promise on error so the next call will retry
        cached.promise = null;
        console.error('❌ MongoDB connection error:', error);
        throw error;
    }

    return cached.conn;
}

export default connectDB;
