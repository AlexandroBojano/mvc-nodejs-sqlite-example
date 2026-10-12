
//const sqlite3 = require('sqlite3').verbose();
import sqlite3 from 'sqlite3'

sqlite3.verbose()

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco:', err.message)
        return
    } else {
      console.log('Conectado ao SQLite.')
    }

    
})

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`)

export default db
