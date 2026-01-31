/**
 * npm init
 *  Keyboards: node y express
 * npm install express
 * ******
 * npm install --save-dev nodemon
 *  -Cambiamos la variable de sccrpts en package
 *  - nodemon instructores.js
 *npm run var
 */

const express = require('express')
const app = express()
const PORT = 3000

let instructores = [
    //Nombre
    //(UK) correo
    //(UK) telefono
    //turno
    //activo
]

app.use(express.json())

app.get('/instructores',(req, res)=>{
    return res.json(instructores);
}) 
app.post('/instructores',(req, res)=>{
    const nuevoInstructor = req.body
    let repetido = false

    if(!nuevoInstructor) return res.status(400).send('Body vacio')
    if(Array.isArray(nuevoInstructor)) return res.status(400).send("No arrays")
    if(!nuevoInstructor["nombre"]  || !nuevoInstructor['correo'] || !nuevoInstructor['telefono'] || !nuevoInstructor['turno']){
        return res.status(400).send("Bad request: nombre > 2, correo con @, telefono(10 digitos), turno(matutino/vespertino)")
    }
    if(nuevoInstructor['nombre'].length < 2 || nuevoInstructor['correo'].length < 3 || !nuevoInstructor['correo'].includes('@') 
        || nuevoInstructor['telefono'].length !== 10 || (nuevoInstructor['turno'].toLowerCase() !== 'matutino' 
        && nuevoInstructor['turno'].toLowerCase() !== 'vespertino')){
            return res.status(400).send('Bad request: nombre > 2, correo con @, telefono(10 digitos), turno(matutino/vespertino)')
    } 
    instructores.forEach((instructor)=>{
        if(nuevoInstructor["correo"] === instructor["correo"] || nuevoInstructor["telefono"] === instructor["telefono"]){
            repetido = true
            return
        }
    })
    if(repetido) return res.status(409).send("correo o telefono ya existente")

    nuevoInstructor['activo'] = true
    instructores.push(nuevoInstructor)
    return res.status(201).json(instructores)
})

app.put('/instructores/:id', (req, res) => {
  const id = req.params.id
  const modified = req.body
  const instructor = instructores[id]
  let repetido = false

  if (!modified) {
    return res.status(400).send('Body vacio')
  }
  if (!instructor || instructor.activo === false) {
    return res.status(404).send('Not found')
  }
    instructores.forEach((instru)=>{
        if(modified["correo"] === instru["correo"] || modified["telefono"] === instru["telefono"]){
            repetido = true
            return
        }
    })
    if(repetido) return res.status(409).send("correo o telefono ya existente")

  let wasModified = false
  if (modified.nombre && modified.nombre.length > 2) {
    instructor.nombre = modified.nombre
    wasModified = true
  }
  if (modified.correo && modified.correo.length >= 3 && modified.correo.includes('@') ) {
    instructor.correo = modified.correo
    wasModified = true
  }
  if (modified.telefono && modified.telefono.length === 10) {
    instructor.telefono = modified.telefono
    wasModified = true
  }
  if ( modified.turno && (modified.turno.toLowerCase() === 'matutino' || modified.turno.toLowerCase() === 'vespertino')) {
    instructor.turno = modified.turno.toLowerCase()
    wasModified = true
  }
  if (!wasModified) {
    return res.status(400).send('Bad request: datos inválidos o sin cambios')
  }
  return res.status(200).json(instructor)
})

app.delete('/instructores/:id',(req, res)=>{
    const id = req.params.id
    if(!instructores[id]) return res.status(404).send('Not found')
    if(instructores[id]['activo']===false) return res.status(404).send('Not found')
    instructores[id]['activo'] = false
    return res.status(200).send('No content')
}) 

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})