let months=["Jan","Fab","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
let days=["sunday","monday","tuesday","wedensday","thursday","friday","saturday"]
export const getDay=(timesstamp)=>{
    let date = new Date(timesstamp)
    return `${date.getDate()} ${months[date.getMonth()]}`
}   
export const getFullDay = (timesstamp)=>{
    let date = new Date(timesstamp)
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}