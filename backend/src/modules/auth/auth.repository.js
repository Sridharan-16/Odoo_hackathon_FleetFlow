import pool from '../../config/db.js';

class AuthRepository {
  async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT id, name, email, password_hash, role, status, created_at FROM users WHERE email = ?',
      [email]
    );
    return rows[0] || null;
  }

  async findById(id) {
    const [rows] = await pool.execute(
      'SELECT id, name, email, role, status, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  }

  async create(userData) {
    const { name, email, passwordHash, role } = userData;
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [name, email, passwordHash, role]
    );
    return result.insertId;
  }

  async emailExists(email) {
    const [rows] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );
    return rows.length > 0;
  }
}

export default new AuthRepository();
