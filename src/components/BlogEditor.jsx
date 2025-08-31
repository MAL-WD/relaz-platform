import AnimationWrapper from "./AnimationWrapper";
import Header from "./Header";
import defaultBanner from "../data/blog banner.png"
import { useContext, useEffect, useRef } from "react";
import {Toaster,toast} from "react-hot-toast"
import { EditorContext } from "../pages/Editor";
import {tools} from "./Tools"
import EditorJs from "@editorjs/editorjs";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider"

import { useNavigate, useParams } from "react-router-dom";
import { UploadFile, UploadImage } from "../common/aws";
const BlogEditor = () => {
    let {blog,blog:{title,banner,content , tags,des},setBlog,textEditor,setTextEditor,setEditorState} = useContext(EditorContext)
   let navigate=useNavigate()
  const {userAuth,setUserAuth } = useStateContext();
    let {blog_id}=useParams()
    // useEffect
   useEffect(()=>{
    if(!textEditor.isReady){

        setTextEditor(new EditorJs({
            holderId:"textEditor",
            data:Array.isArray(content)?content[0]:content,
            tools:tools,
            
            placeholder:"Let's write an awesome story, lesson or experience "
        }))
    }
   },[])
   let blogBannerRef=useRef()
    const handleBannerUpload = (e)=>{
        let img = e.target.files[0]
        console.log(img)
        console.log(blogBannerRef)
        if(img){
            
            let loadingToast=toast.loading("Uploading...")
            UploadFile(img).then((url)=>{
                console.log(url)
                if (url) {
                    blogBannerRef.current.src=url
                    console.log(url)
                    toast.dismiss(loadingToast)
                    toast.success("Uploaded 👍")
                    setBlog({...blog,banner:url})
                    
                }
            })
            .catch(err=>{
                console.log(err)
                toast.dismiss(loadingToast)
                return toast.error(err)
            })
        }
    }
    const handleError=(e)=>{
        let img = e.target
        img.src=defaultBanner;
    }
    const handleTitleKeyDown=(e)=>{
        console.log(e)
        if(e.keyCode==13){ //enter key
            e.preventDefault()
        }
    }
    const handleTitleChange=(e)=>{
        let input =e.target;
        input.style.height='auto'
        input.style.height=input.scrollHeight +"px"
        setBlog({...blog,title:input.value})
    }
    const handlePublishEvent = ( )=>{
        // if(!banner.length){
        //     return toast.error("Upload the blog image to publish it")

        // }
        if(!title.length){
            return toast.error("Upload the blog title to publish it")

        }
        
        if(textEditor.isReady){
            textEditor.save().then((data)=>{
                if(data.blocks.length){
                    setBlog({...blog,content:data})
                    setEditorState("publish")

                }else{
                    return toast.error("Write something in your blog to publish it")
                }
            })
            .catch((err)=>{
                console.log(err)
            })

        
    }}
    const handleDraftEvent = (e)=>{
        if(Array.from(e.target.classList).includes(("disable"))){
            return;
        }
        if (!title.length) {
            return toast.error("write blog title before Saving it As a Draft")
            
        }
       if(textEditor.isReady){
        textEditor.save().then(content=>{
            let blogObj = {
                title,banner,des,content,tags,draft:true
            }
                let loadingToast =toast.loading("Saving Draft... ")
                e.target.classList.add("disable")
                // axios.post(import.meta.env.VITE_SERVER_DOMAIN+{...blogObj,id:blog_id},
                axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/create-blog",blogObj,
                    {
                        headers:{
                            "Authorization":`Bearer ${userAuth.access_token}`
                        }
                    }
                ).then(()=>{
                    e.target.classList.remove('disable')
                    toast.dismiss(loadingToast)
                    toast.success("Saved 👍 ")
                    setTimeout(()=>{
                        navigate("/Manage Blogs?tab=draft")
                    },500)
                }).catch(({response})=>{
                    e.target.classList.remove('disable')
                    toast.dismiss(loadingToast)
                    return toast.error(response.data)
        
                })
        })
    }
    
    }
    return ( 
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white  dark:bg-secondary-dark rounded-3xl">
            <div className="header flex mb-7 justify-between items-center">

                <h2 className="text-3xl dark:text-gray-200 text-black dark:text-white font-bold tracking-tight text-black dark:text-white">Editor</h2>
                <div className="buttons flex gap-3" style={{height:"fit-content"}}>
                    <button className="rounded-full p-2 px-3 bg-main-dark dark:bg-white dark:text-black text-white text-sm font-semibold" onClick={handlePublishEvent}>Publish</button>
                    <button className="rounded-full p-2 px-3 bg-light-gray  dark:bg-secondary-dark dark:text-white text-sm font-semibold" onClick={handleDraftEvent}>Save Draft</button>
                </div>
            </div>
            <Toaster/>
            <AnimationWrapper>
                <section>
                    <div className="mx-auto dark:bg-secondary-dark  dark:text-gray-300 w-full d-grid justify-center">
                        <div className="relative aspect-video max-h-[400px] border-light-gray mx-auto  flex justify-center items-center bg-light-gray w-full rounded-2xl mt-2 text-main-dark text-center font-medium p-4 ">
                        <label htmlFor="blog-image">
                            <img src={banner}  alt="" />
                            <div className="bg-light-gray w-full text-3xl font-medium rounded-xl mt-2 text-main-dark text-center font-medium p-4">Upload the image of your blog</div>
                            <input name={"blog_image"} ref={blogBannerRef}  id="blog-image" onChange={handleBannerUpload} type="file" multiple accept="image/*,video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" hidden/>
                            </label>
                        </div>
                        <textarea 
                        defaultValue={title}
                        placeholder="Blog Title"
                        className="dark:bg-secondary-dark text-4xl font-semibold w-full outline-none resize-none mt-10 border-b-4  border-light-gray dark:border-[#232323] leading-tight placeholder:opacity-40" 
                        onKeyDown={handleTitleKeyDown}
                        onChange={handleTitleChange}
                        ></textarea>
                        <div id="textEditor" className=" w-full font-editor mt-2 placeholder:text-grey dark:placeholder:text-grey dark:text-white text-black text-xl" ></div>
                    </div>
                </section>
            </AnimationWrapper>
            </div>
    );
}
 
export default BlogEditor;