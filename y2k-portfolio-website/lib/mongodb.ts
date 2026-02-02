import mongoose, { Connection } from 'mongoose';

/**
 * MongoDB connection management
 * Uses singleton pattern to prevent connection pool exhaustion
 * Caches connection in development mode
 */

interface CachedConnection {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

// Global to use across hot reloads in development
const globalWithMongo = global as typeof globalThis & {
  mongoConnection: CachedConnection;
};

if (!globalWithMongo.mongoConnection) {
  globalWithMongo.mongoConnection = {
    conn: null,
    promise: null,
  };
}

/**
 * Connect to MongoDB database
 * Implements singleton pattern for safe connection pooling
 * 
 * @returns {Promise<Connection>} Mongoose connection object
 * @throws {Error} If connection fails or MONGODB_URI is not set
 * 
 * @example
 * ```typescript
 * await connectDB();
 * const project = await Project.findById(id);
 * ```
 */
export async function connectDB(): Promise<Connection> {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error(
      'Please add your MONGODB_URI to .env.local'
    );
  }

  // If connection already exists, return it
  if (globalWithMongo.mongoConnection.conn) {
    return globalWithMongo.mongoConnection.conn;
  }

  // If connection promise exists, wait for it
  if (globalWithMongo.mongoConnection.promise) {
    return globalWithMongo.mongoConnection.promise;
  }

  // Create new connection promise
  const promise = mongoose
    .connect(mongoUri, {
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 2,
    })
    .then((mongodb) => {
      return mongodb.connection;
    })
    .catch((error) => {
      console.error('MongoDB connection failed:', error);
      throw error;
    });

  globalWithMongo.mongoConnection.promise = promise;

  try {
    // Wait for connection and cache it
    globalWithMongo.mongoConnection.conn = await promise;
    return globalWithMongo.mongoConnection.conn;
  } catch (error) {
    globalWithMongo.mongoConnection.promise = null;
    throw error;
  }
}

/**
 * Disconnect from MongoDB
 * Use sparingly - mainly for cleanup in tests
 * 
 * @example
 * ```typescript
 * await disconnectDB();
 * ```
 */
export async function disconnectDB(): Promise<void> {
  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
    globalWithMongo.mongoConnection.conn = null;
    globalWithMongo.mongoConnection.promise = null;
  }
}

export default connectDB;
