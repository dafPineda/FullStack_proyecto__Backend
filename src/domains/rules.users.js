async function signupRules(email, password, role, findByEmail){
    if(!email || !password || !role) return {error:"email, password and role are required"}

    const duplicateEmail = await findByEmail(email)
    if(duplicateEmail) return {error:"Email invalid"}

    return ({ok:true})
}
function loginRules(email, password){
    if(!email || !password) return {error: 'Email and password are required'}
    return {ok:"ok"}
}

module.exports = {signupRules, loginRules}