/**
 * SQLite Database Adapter
 * 
 * Local file-based database for development and small deployments
 * Uses better-sqlite3 for synchronous, fast operations
 * 
 * @author Nissan Jammu Development Team
 */

const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

class SQLiteAdapter {
  constructor(config) {
    this.config = config;
    this.db = null;
  }

  /**
   * Connect to SQLite database
   */
  async connect() {
    try {
      // Ensure data directory exists
      const dbDir = path.dirname(this.config.filename);
      if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
      }

      // Initialize database
      this.db = new Database(this.config.filename, {
        verbose: this.config.options?.verbose ? console.log : null,
      });

      // Enable WAL mode for better performance
      this.db.pragma('journal_mode = WAL');
      this.db.pragma('foreign_keys = ON');

      // Initialize tables
      await this.initializeTables();

      console.log(`📁 SQLite database: ${this.config.filename}`);
      return true;
    } catch (error) {
      console.error('SQLite connection error:', error);
      throw error;
    }
  }

  /**
   * Initialize database tables
   */
  async initializeTables() {
    // Users table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        phone TEXT,
        avatar TEXT,
        role TEXT DEFAULT 'user',
        isVerified INTEGER DEFAULT 0,
        isActive INTEGER DEFAULT 1,
        refreshToken TEXT,
        resetPasswordToken TEXT,
        resetPasswordExpires TEXT,
        lastLogin TEXT,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Sessions table for token management
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        token TEXT NOT NULL,
        userAgent TEXT,
        ipAddress TEXT,
        expiresAt TEXT NOT NULL,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Inquiries table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        car TEXT,
        variant TEXT,
        message TEXT,
        preferredDate TEXT,
        preferredTime TEXT,
        status TEXT DEFAULT 'new',
        assignedTo TEXT,
        notes TEXT,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Cars table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS cars (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        tagline TEXT,
        category TEXT NOT NULL,
        priceExShowroom INTEGER NOT NULL,
        priceOnRoad INTEGER NOT NULL,
        priceEmi INTEGER,
        imageMain TEXT,
        imageGallery TEXT,
        specifications TEXT,
        features TEXT,
        variants TEXT,
        colors TEXT,
        highlights TEXT,
        description TEXT,
        isNewLaunch INTEGER DEFAULT 0,
        isBestSeller INTEGER DEFAULT 0,
        isElectric INTEGER DEFAULT 0,
        isActive INTEGER DEFAULT 1,
        rating REAL DEFAULT 0,
        reviewCount INTEGER DEFAULT 0,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Testimonials table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        rating INTEGER NOT NULL,
        review TEXT NOT NULL,
        car TEXT,
        image TEXT,
        isActive INTEGER DEFAULT 1,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Accessories table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS accessories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        category TEXT NOT NULL,
        price INTEGER NOT NULL,
        originalPrice INTEGER,
        image TEXT,
        compatibleModels TEXT,
        description TEXT,
        inStock INTEGER DEFAULT 1,
        isBestSeller INTEGER DEFAULT 0,
        isNew INTEGER DEFAULT 0,
        rating REAL DEFAULT 0,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes one at a time to avoid SQL parsing issues
    try {
      this.db.exec(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`);
      this.db.exec(`CREATE INDEX IF NOT EXISTS idx_sessions_userId ON sessions(userId)`);
      this.db.exec(`CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token)`);
      this.db.exec(`CREATE INDEX IF NOT EXISTS idx_cars_slug ON cars(slug)`);
      this.db.exec(`CREATE INDEX IF NOT EXISTS idx_cars_category ON cars(category)`);
      this.db.exec(`CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status)`);
      this.db.exec(`CREATE INDEX IF NOT EXISTS idx_accessories_category ON accessories(category)`);
    } catch (e) {
      // Indexes may already exist
    }

    console.log('📊 SQLite tables initialized');
  }

  /**
   * Disconnect from database
   */
  async disconnect() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  /**
   * Generate unique ID
   */
  generateId() {
    return uuidv4();
  }

  /**
   * Convert query object to SQL WHERE clause
   */
  buildWhereClause(query) {
    const conditions = [];
    const values = [];

    for (const [key, value] of Object.entries(query)) {
      if (value === null || value === undefined) {
        conditions.push(`${key} IS NULL`);
      } else if (typeof value === 'boolean') {
        conditions.push(`${key} = ?`);
        values.push(value ? 1 : 0);
      } else if (typeof value === 'object' && value.$in) {
        const placeholders = value.$in.map(() => '?').join(', ');
        conditions.push(`${key} IN (${placeholders})`);
        values.push(...value.$in);
      } else if (typeof value === 'object' && value.$like) {
        conditions.push(`${key} LIKE ?`);
        values.push(`%${value.$like}%`);
      } else if (typeof value === 'object' && value.$gt) {
        conditions.push(`${key} > ?`);
        values.push(value.$gt);
      } else if (typeof value === 'object' && value.$gte) {
        conditions.push(`${key} >= ?`);
        values.push(value.$gte);
      } else if (typeof value === 'object' && value.$lt) {
        conditions.push(`${key} < ?`);
        values.push(value.$lt);
      } else if (typeof value === 'object' && value.$lte) {
        conditions.push(`${key} <= ?`);
        values.push(value.$lte);
      } else {
        conditions.push(`${key} = ?`);
        values.push(value);
      }
    }

    return {
      clause: conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '',
      values,
    };
  }

  // ============================================
  // CRUD OPERATIONS
  // ============================================

  async create(collection, data) {
    const id = data.id || this.generateId();
    const now = new Date().toISOString();
    const record = {
      ...data,
      id,
      createdAt: data.createdAt || now,
      updatedAt: data.updatedAt || now,
    };

    // Convert objects/arrays to JSON strings
    const processedRecord = {};
    for (const [key, value] of Object.entries(record)) {
      if (typeof value === 'object' && value !== null) {
        processedRecord[key] = JSON.stringify(value);
      } else if (typeof value === 'boolean') {
        processedRecord[key] = value ? 1 : 0;
      } else if (value === undefined) {
        processedRecord[key] = null;
      } else {
        processedRecord[key] = value;
      }
    }

    const columns = Object.keys(processedRecord).join(', ');
    const placeholders = Object.keys(processedRecord).map(() => '?').join(', ');
    const values = Object.values(processedRecord);

    const stmt = this.db.prepare(`INSERT INTO ${collection} (${columns}) VALUES (${placeholders})`);
    stmt.run(...values);

    return { ...record, id };
  }

  async find(collection, query = {}, options = {}) {
    const { clause, values } = this.buildWhereClause(query);
    let sql = `SELECT * FROM ${collection} ${clause}`;

    if (options.sort) {
      const sortParts = [];
      for (const [key, order] of Object.entries(options.sort)) {
        sortParts.push(`${key} ${order === -1 ? 'DESC' : 'ASC'}`);
      }
      sql += ` ORDER BY ${sortParts.join(', ')}`;
    }

    if (options.limit) {
      sql += ` LIMIT ${options.limit}`;
    }

    if (options.skip) {
      sql += ` OFFSET ${options.skip}`;
    }

    const stmt = this.db.prepare(sql);
    const rows = stmt.all(...values);

    return rows.map(this.parseRow);
  }

  async findOne(collection, query) {
    const { clause, values } = this.buildWhereClause(query);
    const sql = `SELECT * FROM ${collection} ${clause} LIMIT 1`;
    const stmt = this.db.prepare(sql);
    const row = stmt.get(...values);
    return row ? this.parseRow(row) : null;
  }

  async findById(collection, id) {
    return this.findOne(collection, { id });
  }

  async update(collection, query, data) {
    const { clause, values: whereValues } = this.buildWhereClause(query);
    const now = new Date().toISOString();
    const updateData = { ...data, updatedAt: now };

    // Process data
    const processedData = {};
    for (const [key, value] of Object.entries(updateData)) {
      if (typeof value === 'object' && value !== null) {
        processedData[key] = JSON.stringify(value);
      } else if (typeof value === 'boolean') {
        processedData[key] = value ? 1 : 0;
      } else {
        processedData[key] = value;
      }
    }

    const setParts = Object.keys(processedData).map(key => `${key} = ?`).join(', ');
    const setValues = Object.values(processedData);

    const sql = `UPDATE ${collection} SET ${setParts} ${clause}`;
    const stmt = this.db.prepare(sql);
    const result = stmt.run(...setValues, ...whereValues);

    return { modifiedCount: result.changes };
  }

  async updateById(collection, id, data) {
    return this.update(collection, { id }, data);
  }

  async delete(collection, query) {
    const { clause, values } = this.buildWhereClause(query);
    const sql = `DELETE FROM ${collection} ${clause}`;
    const stmt = this.db.prepare(sql);
    const result = stmt.run(...values);
    return { deletedCount: result.changes };
  }

  async deleteById(collection, id) {
    return this.delete(collection, { id });
  }

  async count(collection, query = {}) {
    const { clause, values } = this.buildWhereClause(query);
    const sql = `SELECT COUNT(*) as count FROM ${collection} ${clause}`;
    const stmt = this.db.prepare(sql);
    const row = stmt.get(...values);
    return row?.count || 0;
  }

  /**
   * Parse row data - convert JSON strings back to objects
   */
  parseRow(row) {
    if (!row) return null;

    const parsed = { ...row };
    const jsonFields = [
      'imageGallery', 'specifications', 'features', 'variants', 
      'colors', 'highlights', 'compatibleModels'
    ];

    for (const field of jsonFields) {
      if (parsed[field] && typeof parsed[field] === 'string') {
        try {
          parsed[field] = JSON.parse(parsed[field]);
        } catch (e) {
          // Keep as string if not valid JSON
        }
      }
    }

    // Convert integer booleans back to booleans
    const boolFields = [
      'isVerified', 'isActive', 'isNewLaunch', 'isBestSeller', 
      'isElectric', 'inStock', 'isNew'
    ];
    for (const field of boolFields) {
      if (field in parsed) {
        parsed[field] = Boolean(parsed[field]);
      }
    }

    return parsed;
  }

  /**
   * Execute raw SQL query
   */
  async raw(sql, params = []) {
    const stmt = this.db.prepare(sql);
    if (sql.trim().toUpperCase().startsWith('SELECT')) {
      return stmt.all(...params);
    }
    return stmt.run(...params);
  }

  /**
   * Transaction support
   */
  async transaction(callback) {
    const transaction = this.db.transaction(callback);
    return transaction();
  }
}

module.exports = SQLiteAdapter;
