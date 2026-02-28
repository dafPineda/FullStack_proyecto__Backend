const { RepositoryExcersice} = require('../repositories/repository.excersice')
const repo = new RepositoryExcersice();

async function getAll(req, res){
        const peticion = await repo.getAll()
        return res.status(200).json(peticion)
}
async function getByMuscle(req,res){
    const muscle = req.query.muscle || "biceps"
    if(!muscle) res.status(400).json({error:"Insert a muscle(lower_back/shoulders/lats/biceps/middle_back/forearms)"})
    const peticion = await repo.getByMuscle(muscle)
    if(!peticion) return res.status(400).json({error:"Bad request"})
    
    return res.status(200).json(peticion)
}

module.exports = {getAll, getByMuscle}