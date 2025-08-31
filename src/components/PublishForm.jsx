import AnimationWrapper from "./AnimationWrapper";
import {Toaster,toast} from "react-hot-toast"
import CloseSvg from "../components svgs/CloseSvg";
import { useContext } from "react";
import { EditorContext } from "../pages/Editor";
import Chat from "./Chat";
import Tag from "./Tag";
import { useStateContext } from "../contexts/ContextProvider"

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const PublishForm = () => {
    let{blog,blog:{banner,title,content,tags,des},setEditorState,setBlog}=useContext(EditorContext)
  const {userAuth,setUserAuth } = useStateContext();
    let {blog_id}=useParams()
    let navigate=useNavigate()
    const handleCloseEvent = ()=>{
        setEditorState("editor")
    }
    const handleBlogTitleChange =(e)=>{
        let input = e.target
        setBlog({...blog,title:input.value})
    }
    const handleBlogDesChange =(e)=>{
        let input = e.target
        setBlog({...blog,des:input.value})
    }
    const handleTitleKeyDown=(e)=>{
        console.log(e)
        if(e.keyCode==13){ //enter key
            e.preventDefault()
        }
    }
    const characterLimit = 200
    const tagLimit = 5
    const handleKeyDown = (e)=>{
            if(e.keyCode==13 || e.keyCode== 188){
                e.preventDefault()
                let tag =e.target.value
                if (tags.length<tagLimit) {
                    if(!tags.includes(tag) && tag.length){
                        setBlog({...blog,tags:[...tags,tag]})
                    }
                }else{
                    toast.error(`you can add max ${tagLimit} Tags`)
                }
                e.target.value=""
            }
    }
    const publishBlog =(e)=>
        {   
            if(Array.from(e.target.classList).includes(("disable"))){
                return
            }
            if (!title.length) {
                return toast.error("write blog title before publishing")
                
            }
            if (!des.length || des.length>characterLimit) {
                return toast.error(`write a description about your blog withing ${characterLimit } characters`)
                
            }
            if (!tags.length) {
                return toast.error(`Enter at least 1 tag to help us rank your blog`)
                
            }
            let blogObj = {
                title,banner,des,content,tags,draft:false
            }
            let loadingToast =toast.loading("Publishing... ")
            e.target.classList.add("disable")
            axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/create-blog",blogObj,
                {
                    headers:{
                        "Authorization":`Bearer ${userAuth.access_token}`
                    }
                }
            ).then(()=>{
                e.target.classList.remove('disable')
                toast.dismiss(loadingToast)
                toast.success("Published ")
                toast.success("Nice work  ")
                setTimeout(()=>{
                    navigate("/Manage Blogs")
                },500)
            }).catch(({response})=>{
                e.target.classList.remove('disable')
                toast.dismiss(loadingToast)
                return toast.error(response.data.error)

            })
        }
    return (
        <AnimationWrapper>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark rounded-3xl">
            <div className="header flex mb-7 justify-between items-center">

                <h2 className="text-3xl dark:text-gray-200 text-black dark:text-white font-bold tracking-tight text-black dark:text-white">Preview</h2>
                <div className="buttons flex gap-3" style={{height:"fit-content"}}>
                    <button className="rounded-full p-2  bg-light-gray  text-sm font-semibold" onClick={handleCloseEvent}><CloseSvg fill="#111111"/></button>
                </div>
            </div>
            <Toaster/>
            <div className="preview grid xl:grid-cols-2 gap-5">
                <div className="preview-content">

                <div className="w-full aspect-video rounded-lg bg-light-gray dark:bg-main-dark mt-4 max-w-[700px]  mx-auto">
                    <img src={banner} alt="" />
                </div>
                <h1 className="text-4xl font-semibold mt-5   dark:text-white  leading-tight line-clamp-2">{title}</h1>
                <p className="font-editor line-clamp-2 text-xl leading-7 mt-3">{des}</p>
                </div>
                <div className="prview-edit">

                <div className="mt-2">
                    <p className="text-grey">Blog Title</p>
                    <input className="w-full h-full mt-2 dark:bg-main-dark p-4 relative rounded-xl text-sm placeholder:text-sm dark:text-white bg-light-gray" type="text" onChange={handleBlogTitleChange} placeholder="blog title" defaultValue={title}/>
                </div>
                <div className="mt-5">
                    <p className="text-grey">Short description about your blog</p>
                    <textarea onKeyDown={handleTitleKeyDown} maxLength={characterLimit} className="w-full h-40 resize-none leading-7 dark:bg-main-dark mt-2  p-4 relative rounded-xl text-sm placeholder:text-sm bg-light-gray " onChange={handleBlogDesChange} placeholder="a brief description about your blog" defaultValue={des}/>
                    <p className="text-grey text-[12px] text-right">{characterLimit - des.length} characters left</p>
                </div>
                <div className="mt-5">
                    <p className="text-grey">Topics - ( Helps in Searching and ranking your blog post )</p>
                    <div className=" bg-light-gray dark:bg-main-dark p-3 rounded-2xl mt-3">
                        <input type="text" placeholder="Topic" className="sticky  w-full h-full  dark:bg-secondary-dark p-4  rounded-xl text-sm placeholder:text-sm" onKeyDown={handleKeyDown}/>
                        {tags.map((tag,i)=>
                        {return <Tag tag={tag} tagsIndex={i} key={i}/>})}
                    </div>
                        <p className="text-grey text-[12px] text-right mt-2">{tagLimit - tags.length} tags left</p>
                </div>
                <button onClick={publishBlog} className="ml-auto block mt-4 rounded-full p-2 px-3 bg-main-dark  text-white text-sm font-semibold">Publish</button>
                        </div>

            </div>
        </div>

        </AnimationWrapper>
    );
}
 
export default PublishForm;