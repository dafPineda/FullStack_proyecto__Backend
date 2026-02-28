const { RepositoryInstructors } = require('../repositories/repository.instructors')
const repo = new RepositoryInstructors();
const {createRules, editRules} = require('../domains/rules.instructors');

async function getActive(req, res){
    try{
        const peticion = await repo.getActive()
        return res.status(200).json(peticion)
    }catch(error){
        console.log(error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}
async function getById(req, res){
    try{
        const id = Number(req.params.id)
        const peticion = await repo.getById(id)

        if(!peticion) return res.status(404).json({error:'Not Found'})

        return res.status(200).json(peticion)
    }catch(error){
        console.log(error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}
async function getAll(req, res){
        const peticion = await repo.getAll()
        return res.status(200).json(peticion)
}
async function create(req, res){
        if(!req.body) return res.status(400).json({error:'Body null'})
        const {name, mail, phone, turn} = req.body
        const intructors = await repo.getAll();
        const validate = createRules({name, mail, phone, turn}, intructors);

        if(validate.error) return res.status(400).json({Error: validate.error})
        const peticion = await repo.create(validate)

        return res.status(201).json(peticion)
}
async function edit(req, res){
        if(!req.body) return res.status(400).json({error:'Body null'})
        const id = Number(req.params.id);
        const {name, mail, phone, turn} = req.body
        const data = {
            name: name !== undefined ? name : undefined,
            mail: mail !== undefined ? mail : undefined,
            phone:phone   !== undefined ? phone : undefined, 
            turn: turn !== undefined ? turn: undefined
        }
        const instructors = await repo.getAll();
        const peticion = editRules(data, instructors)
        if(peticion.error) return res.status(400).json(peticion.error)
        
        const edit = await repo.editById(id, peticion)
        if (!edit) return res.status(404).json({error: 'Not Found'})

        return res.status(200).json(edit)
}
async function changeActive(req, res){
        const id = Number(req.params.id)
        const peticion = await repo.changeActive(id)
        if(!peticion) return res.status(404).json({error:'Not Found'})
        return res.status(200).json(peticion)

}
async function remove(req, res){
        const id = Number(req.params.id)
        const peticion = await repo.remove(id)
        
        if(!peticion) return res.status(404).json({error: 'Not Found'})
        
        return res.status(204).json({Removed: peticion})
}

module.exports = { getAll, create, edit, getActive, remove, changeActive, getById}