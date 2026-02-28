const { apiExt } = require("../db");

class RepositoryExcersice{
    async getAll(){
        const data = await apiExt()
        return data
    }
    async getByMuscle(muscle){
        const data = await this.getAll()
        const parts = data.filter((part)=> part.muscle === muscle);
        return parts[0]
    }
}

module.exports = { RepositoryExcersice }