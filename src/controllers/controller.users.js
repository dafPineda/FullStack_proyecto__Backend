const bcrypt = require('bcryptjs')
const { RepositoryUsers } = require("../repositories/repository.user")
const { signupRules, loginRules } = require('../domains/rules.users')
const {sign} = require('../auth')

const repo = new RepositoryUsers();

async function create(req, res){

        if(!req.body) return res.status(400).json({error:'Body null'})
        
        const {email, password, role} = req.body;
        const validate = await signupRules(email, password, role, repo.findByEmail)

        if(validate.error) return res.status(404).json(validate.error)

        const passwordHash = await bcrypt.hash(password, 8)    
        const user = await repo.create(email, passwordHash, role)

        if(!user) return res.status(400).json({error:"Not created"})

        return res.status(201).json({ok:true, user:user})
}
async function logInUser(req, res) {
        if(!req.body) return res.status(400).json({error:'Body null'})
        const { email, password } = req.body
        const isValidate = loginRules(email, password)
        if(isValidate.error) return res.status(404).json({error: isValidate.error})
        const user = await repo.findByEmail(email)
      
        if(!user) return res.status(401).json({error:'incorrect credentials'})
          const ok = await bcrypt.compare(password, user.password_hash) 
      
          if(!ok){
              return res.status(401).json({error:'incorrect credentials'})
          }
      
          const token = sign({
              id: user.id,
              email: user.email,
              role: user.role
          })
      
          return res.json({ token })

}
module.exports = {logInUser, create}


//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzIiwiZW1haWwiOiJkYWZuZUBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NzIyNTk3MjUsImV4cCI6MTc3MjM0NjEyNX0.JunbymktQnbHbD8RimSyupTsb5s6Z443Vf7vF3l-km4"