const { pool } = require('../db');

class RepositoryInstructors{
    async getActive(){
        const peticion = await pool.query(
            'select id, name, mail, phone, turn from instructors where active = true'
        )
        return[...peticion.rows]
    }
    async getAll(){
        const peticion = await pool.query(
            'Select id, name, mail, phone, turn, active from instructors'
        )
        return [...peticion.rows]
    }
    async getById(id){
        const peticion = await pool.query(
            'select id, name, mail, phone, turn, active from instructors where id = $1', [id]
        )
        return peticion.rows[0]
    }
    async create({name, mail, phone, turn='NA'}){
        const peticion = await pool.query(
            `insert into instructors(name, mail, phone, turn) values($1, $2, $3, $4) returning id, name, phone, mail turn`, [name, mail, phone, turn]
        )
        return peticion.rows[0];
    }
    async editById(id, {name, mail, phone, turn}){
        const peticion = await pool.query(
        'update instructors set name = coalesce ($1, name), mail = coalesce ($2, mail), phone = coalesce($3, phone), turn = coalesce($4, turn) where id = $5 returning name, mail, phone, turn;', 
                                        [name ?? null, mail ?? null, phone ?? null, turn ?? null, id]);
        return peticion.rows[0] || null;
    }
    async changeActive(id){
        const peticion = await pool.query(
                `update instructors set active = not active where id = $1 returning id, name, phone, mail, active`, [id]
            )
        return peticion.rows[0] || null
    }
    async remove(id){
        const peticion = await pool.query(
            'delete from instructors where id = $1 returning id', [id]
        )
        return peticion.rows[0];
    }
}

module.exports = { RepositoryInstructors }