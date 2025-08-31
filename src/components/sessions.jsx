const storeInSession=(key,value)=>{
    return sessionStorage.setItem(key,value)
}
const lookInSession=(key)=>{
    return sessionStorage.getItem(key)
}
const removeSession=(key)=>{
    return sessionStorage.removeItem(key)
}
const logOutUser=(key)=>{
    return sessionStorage.clear()
}
export{storeInSession,lookInSession,removeSession,logOutUser}