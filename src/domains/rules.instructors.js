const { error } = require("node:console");

function createRules({name, mail, phone, turn}, instructors){
    if(!name  || !mail || !phone){
        return {error: "Bad request: nombre > 2, correo con @, telefono(10 digitos)"}
    }
    if(name.length < 2 || mail.length < 3 || !mail.includes('@') || phone.length !== 10){
            return {error: 'Bad request: nombre > 2, correo con @, telefono(10 digitos)'}
    }  
    if(turn){
        if(turn.toLowerCase() !== 'matutino' && turn.toLowerCase() !== 'vespertino'){
            return {error:'turno(matutino/vespertino)'}
        }
    }
    let duplicatePhone = false;
    let duplicateMail = false;
    instructors.forEach((ins)=>{
        if(ins.mail === mail){
            duplicatePhone = true
            return
        }
        if(ins.phone === phone){
            duplicateMail = true
            return 
        }
    }) 
    if(duplicatePhone){
        return {error: 'Telefono ya existente'}
    }
    if(duplicateMail){
        return {error: 'Correo ya existente'}
    }
    return {name, mail, phone, turn}
}
function editRules({name, mail, phone, turn}, instructors){
    console.log(name, mail, phone, turn )
    if(name !== undefined && name.length < 2) return {error:'Nombre invalidado'}
    if(mail !== undefined && (typeof mail !== 'string' || !mail.includes('@')|| mail.length < 3 )) return {error:'Correo invalido'}
    if(phone !== undefined && (phone.length !== 10 || !/^\d{10}$/.test(phone))) {
        return {error:'Telefono debe contener 10 digitos numericos'}
    }
    if(turn !== undefined && turn.toLowerCase() !== 'matutino' && turn.toLowerCase() !== 'vespertino') return {error:'Turno: Vespertino/Matutino'}
    let duplicatePhone = false;
    let duplicateMail = false;
    instructors.forEach((ins)=>{
        if(ins.mail === mail){
            duplicateMail = true
            return
        }
        if(ins.phone === phone){
            duplicatePhone = true
            return 
        }
    }) 
    if(duplicateMail){
        return {error: 'Correo ya existente'}
    }
    if(duplicatePhone){
        return {error: 'Telefono ya existente'}
    }
    return {name, mail, phone, turn}
}
module.exports = { createRules, editRules }