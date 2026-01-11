/**
 * Database Configuration - Easy Switch Between Local SQLite and Cloud MongoDB
 * 
 * USAGE:
 * - For local development: Set DB_TYPE=sqlite in .env
 * - For production/cloud: Set DB_TYPE=mongodb in .env
 * 
 * This abstraction layer allows one-click database switching
 */

const DB_TYPES = {
  SQLITE: 'sqlite',
  MONGODB: 'mongodb',
  POSTGRESQL: 'postgresql', // Future support
};

const config = {
  // Current database type - controlled by environment variable
  type: process.env.DB_TYPE || DB_TYPES.SQLITE,
  
  // SQLite Configuration (Local)
  sqlite: {
    filename: process.env.SQLITE_PATH || './data/nissan.db',
    options: {
      verbose: process.env.NODE_ENV === 'development',
    },
  },
  
  // MongoDB Configuration (Cloud)
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/nissan_jammu',
    options: {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    },
  },
  
  // PostgreSQL Configuration (Future)
  postgresql: {
    host: process.env.PG_HOST || 'localhost',
    port: process.env.PG_PORT || 5432,
    database: process.env.PG_DATABASE || 'nissan',
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD || '',
  },
};

module.exports = { config, DB_TYPES };
