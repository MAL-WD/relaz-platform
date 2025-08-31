import CloseSvg from "../components svgs/CloseSvg";
import { useContext } from "react";
import { EditorContext } from "../pages/Editor";
const Tag = ({tag,tagIndex}) => {
    let{blog,blog:{tags},setBlog}=useContext(EditorContext)
    const addEditable=(e)=>{
        e.target.setAttribute("contentEditable",true)
        e.target.focus()
    }
    const handleEditTag = (e)=>{
             if(e.keyCode==13||e.keyCode==188){
                e.preventDefault()
                let currentTag=e.target.innerText
                tags[tagIndex]=currentTag
                setBlog({...blog,tags})
                e.target.setAttribute("contentEditable",false)

             }
    }
    const handleDeleteTag = ()=>{
             tags= tags.filter(t=>t!==tag)
            setBlog({...blog,tags})
    }
    return (
         <div className="relative mr-2   p-2 mt-2 px-4 bg-white dark:bg-secondary-dark rounded-full inline-block hover:bg-opacity-50 pr-8">
        <p className="text-sm outline-none" contentEditable="true" onKeyDown={handleEditTag} onClick={addEditable}>{tag}</p>
        <button onClick={handleDeleteTag} className=" rounded-full absolute right-3 top-1/2 translate-y-[-50%]"><CloseSvg fill="#111111" classes={"w-3 h-3"}/></button>
    </div> );
}
 
export default Tag;