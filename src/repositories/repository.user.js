const { pool } = require('../db');

class RepositoryUsers{
    async create({email, passwordHash, role = 'user'}) {
        const peticion = await pool.query(
        `insert into users(email, password_hash, role) values ($1, $2, $3) returning id, email, role`, [email, passwordHash, role]
        )
        return peticion.rows[0] 
    }
    async findById(id) { 
        const peticion = await pool.query(
        'select id, email, role from users where id = $1', [id]
        )
        return peticion.rows[0] || null
    }
    async findByEmail(email) {
        const peticion =  await pool.query(
        `select id, email, password_hash, role from users where email = $1`, [email]
        );
        return peticion.rows[0] || null
    }

}
module.exports = {RepositoryUsers}