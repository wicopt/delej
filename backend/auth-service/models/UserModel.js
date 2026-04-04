const { pool } = require('../config/dbConfig');

class UserModel {
  // ========== CREATE ==========

  // Создать нового пользователя
  static async create({ username, name, email, password_hash }) {
    const query = `
      INSERT INTO app_user (username, name, email, password_hash)
      VALUES ($1, $2, $3, $4)
      RETURNING user_id, username, name, email
    `;
    const values = [username, name, email, password_hash];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // ========== READ ==========

  // Найти пользователя по ID
  static async findById(userId) {
    const query = 'SELECT * FROM app_user WHERE user_id = $1';
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  }

  // Найти пользователя по email
  static async findByEmail(email) {
    const query = 'SELECT * FROM app_user WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  // Найти пользователя по username
  static async findByUsername(username) {
    const query = 'SELECT * FROM app_user WHERE username = $1';
    const result = await pool.query(query, [username]);
    return result.rows[0];
  }
  static async findByEmailOrUsername(email) {
    const query = 'SELECT * FROM app_user WHERE email = $1 or username = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  // Получить всех пользователей
  static async findAll() {
    const query = 'SELECT user_id, username, name, email, created_at FROM app_user ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  // ========== UPDATE ==========

  // Обновить данные пользователя
  static async update(userId, updates) {
    // Динамически строим запрос только для переданных полей
    const allowedFields = ['username', 'name', 'email', 'password_hash'];
    const fields = [];
    const values = [];
    let paramIndex = 1;

    for (const [key, value] of Object.entries(updates)) {
      if (allowedFields.includes(key) && value !== undefined) {
        fields.push(`${key} = $${paramIndex}`);
        values.push(value);
        paramIndex++;
      }
    }

    if (fields.length === 0) return null;

    values.push(userId);
    const query = `
      UPDATE app_user 
      SET ${fields.join(', ')} 
      WHERE user_id = $${paramIndex}
      RETURNING user_id, username, name, email, created_at
    `;

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Обновить только пароль
  static async updatePassword(userId, newPasswordHash) {
    const query = `
      UPDATE app_user 
      SET password_hash = $1 
      WHERE user_id = $2
      RETURNING user_id
    `;
    const result = await pool.query(query, [newPasswordHash, userId]);
    return result.rows[0];
  }

  // ========== DELETE ==========

  // Удалить пользователя
  static async delete(userId) {
    const query = 'DELETE FROM app_user WHERE user_id = $1 RETURNING user_id';
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  }

  // ========== UTILS ==========

  // Проверить, существует ли пользователь с таким email или username
  static async exists(email, username) {
    const query = `
      SELECT 
        EXISTS(SELECT 1 FROM app_user WHERE email = $1) as email_exists,
        EXISTS(SELECT 1 FROM app_user WHERE username = $2) as username_exists
    `;
    const result = await pool.query(query, [email, username]);
    return result.rows[0];
  }

  // Поиск пользователей по имени (частичное совпадение)
  static async searchByName(searchTerm) {
    const query = `
      SELECT user_id, username, name, email 
      FROM app_user 
      WHERE name ILIKE $1 OR username ILIKE $1
      ORDER BY name
      LIMIT 20
    `;
    const result = await pool.query(query, [`%${searchTerm}%`]);
    return result.rows;
  }
}

module.exports = UserModel;