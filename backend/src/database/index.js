/**
 * Database Abstraction Layer
 * 
 * Provides a unified interface for database operations
 * Supports easy switching between SQLite (local) and MongoDB (cloud)
 * 
 * @author Nissan Jammu Development Team
 * @version 1.0.0
 */

const { config, DB_TYPES } = require('../config/database.config');
const SQLiteAdapter = require('./adapters/sqlite.adapter');
const MongoDBAdapter = require('./adapters/mongodb.adapter');

class DatabaseManager {
  constructor() {
    this.adapter = null;
    this.isConnected = false;
  }

  /**
   * Initialize database connection based on configuration
   */
  async connect() {
    try {
      switch (config.type) {
        case DB_TYPES.SQLITE:
          this.adapter = new SQLiteAdapter(config.sqlite);
          break;
        case DB_TYPES.MONGODB:
          this.adapter = new MongoDBAdapter(config.mongodb);
          break;
        default:
          throw new Error(`Unsupported database type: ${config.type}`);
      }

      await this.adapter.connect();
      this.isConnected = true;
      console.log(`✅ Database connected: ${config.type.toUpperCase()}`);
      return true;
    } catch (error) {
      console.error(`❌ Database connection failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Disconnect from database
   */
  async disconnect() {
    if (this.adapter) {
      await this.adapter.disconnect();
      this.isConnected = false;
      console.log('📴 Database disconnected');
    }
  }

  /**
   * Get the current adapter for direct operations
   */
  getAdapter() {
    if (!this.adapter) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return this.adapter;
  }

  /**
   * Get database type
   */
  getType() {
    return config.type;
  }

  // ============================================
  // UNIFIED CRUD OPERATIONS
  // ============================================

  /**
   * Create a new record
   * @param {string} collection - Collection/Table name
   * @param {object} data - Data to insert
   */
  async create(collection, data) {
    return this.adapter.create(collection, data);
  }

  /**
   * Find records
   * @param {string} collection - Collection/Table name
   * @param {object} query - Query conditions
   * @param {object} options - Options (limit, skip, sort)
   */
  async find(collection, query = {}, options = {}) {
    return this.adapter.find(collection, query, options);
  }

  /**
   * Find one record
   * @param {string} collection - Collection/Table name
   * @param {object} query - Query conditions
   */
  async findOne(collection, query) {
    return this.adapter.findOne(collection, query);
  }

  /**
   * Find by ID
   * @param {string} collection - Collection/Table name
   * @param {string} id - Record ID
   */
  async findById(collection, id) {
    return this.adapter.findById(collection, id);
  }

  /**
   * Update records
   * @param {string} collection - Collection/Table name
   * @param {object} query - Query conditions
   * @param {object} data - Data to update
   */
  async update(collection, query, data) {
    return this.adapter.update(collection, query, data);
  }

  /**
   * Update by ID
   * @param {string} collection - Collection/Table name
   * @param {string} id - Record ID
   * @param {object} data - Data to update
   */
  async updateById(collection, id, data) {
    return this.adapter.updateById(collection, id, data);
  }

  /**
   * Delete records
   * @param {string} collection - Collection/Table name
   * @param {object} query - Query conditions
   */
  async delete(collection, query) {
    return this.adapter.delete(collection, query);
  }

  /**
   * Delete by ID
   * @param {string} collection - Collection/Table name
   * @param {string} id - Record ID
   */
  async deleteById(collection, id) {
    return this.adapter.deleteById(collection, id);
  }

  /**
   * Count records
   * @param {string} collection - Collection/Table name
   * @param {object} query - Query conditions
   */
  async count(collection, query = {}) {
    return this.adapter.count(collection, query);
  }
}

// Export singleton instance
const db = new DatabaseManager();
module.exports = db;
