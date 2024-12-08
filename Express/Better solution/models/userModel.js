const db = require('../config/db');
exports.findById = id => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result[0]);
    });
  });
};
