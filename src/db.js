require('dotenv').config(); 

const{Pool} = require('pg');

if(!process.env.DATABASE_URL){
    throw new Error('Need DATABASE_url')
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false}
})

const apiExt = async ()=>{
    const res = await fetch('https://api.api-ninjas.com/v1/exercises', {
        headers: {
            'X-Api-Key': process.env.API_NINJAS_KEY
        }
    });
    if (!res.ok) {
        throw new Error(`Error API: ${res.status}`);
    }
    const data = await res.json();
    return data;
}

module.exports = {pool, apiExt}
