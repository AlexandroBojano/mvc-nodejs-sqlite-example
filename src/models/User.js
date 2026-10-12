

import db from '../config/db.js'

const User = {
    create(name, email, password) {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO users (name, email, password)
                 VALUES (?, ?, ?)`,
                [name, email, password],
                function (err) {
                    if (err) return reject(err)
                    resolve({ id: this.lastID, name, email })
                }
            )
        })
    },

    findAll() {
        return new Promise((resolve, reject) => {
            db.all(
                'SELECT id, name, email, created_at FROM users',
                [],
                (err, rows) => {
                    if (err) return reject(err)
                    resolve(rows)
                }
            )
        })
    },

    findById(id) {
        return new Promise((resolve, reject) => {
            db.get(
                'SELECT id, name, email, password, created_at FROM users WHERE id = ?',
                [id],
                (err, row) => {
                    if (err) return reject(err)
                    resolve(row)
                }
            )
        })
    },

    findByEmail(email) {
        return new Promise((resolve, reject) => {
            db.get(
                'SELECT * FROM users WHERE email = ?',
                [email],
                (err, row) => {
                    if (err) return reject(err)
                    resolve(row)
                }
            )
        })
    },

    update(id, name, email, password) {
        return new Promise((resolve, reject) => {
            const sql = password
                ? 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?'
                : 'UPDATE users SET name = ?, email = ? WHERE id = ?'

            const params = password
                ? [name, email, password, id]
                : [name, email, id]

            db.run(sql, params, function (err) {
                if (err) return reject(err)
                resolve(this.changes)
            })
        })
    },

    delete(id) {
        return new Promise((resolve, reject) => {
            db.run(
                'DELETE FROM users WHERE id = ?',
                [id],
                function (err) {
                    if (err) return reject(err)
                    resolve(this.changes)
                }
            )
        })
    }
}

export default User
