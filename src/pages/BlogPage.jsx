import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnimationWrapper from "../components/AnimationWrapper";
import { useStateContext } from '../contexts/ContextProvider';
import html from "../data/html css.webp"
import BlogInteraction from "../components/BlogInteraction";
import BlogPostCard from "../components/BlogsPostCard";
import BlogContent from "../components/BlogContent";
import CommentsContainer from "../components/CommentsContainer";
import { fetchComments } from "../components/CommentsContainer";
import { getDay, getFullDay } from "../common/date";
export const blogStracture ={
    title:'',
    des:'',
    content:[],
    author:{personal_info:{}},
    banner:'',
    pulishedAt:'',
    

}
export const BlogContext = createContext({})
const BlogPage = () => {
    const { currentColor, setActiveMenu } = useStateContext();
    
    let {blog_id}=useParams()
    const [blog,setBlog]=useState(blogStracture)
    const [similarBlogs,setSimilarBlogs]=useState(null)
    const[loading,setLoading]=useState(true) 
    const[isLikedByUser,setLikedByUser]=useState(false) 
    const [commentsWrapper,setCommentsWrapper]=useState(true)
    const [totalParentCommentsLoaded,setTotalParentCommentsLoaded]=useState(0)


    let{title ,content,banner,author:{personal_info:{fullname,username,profile_img}},publishedAt}=blog
    const fetchBlog = () =>{
        
        axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/get-blog",{blog_id})
        .then(async ({data:{blog}})=>{
            blog.comments= await fetchComments({blog_id:blog._id,setParentCommentCountFun:setTotalParentCommentsLoaded})
            setBlog(blog)

            axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/search-blogs",{tag:blog.tags[0],limit:6,eliminate_blog:blog_id})
            .then(({data})=>{
                setSimilarBlogs(data.blogs)
                console.log(data.blogs)
            })
            setLoading(false)
        })
        .catch(err=>{
            console.log(err)
            setLoading(false)
        })
    }
    useEffect(()=>{
        resetState()
        fetchBlog()
        setActiveMenu(false)
    },[blog_id])
    const resetState=()=>{
        setBlog(blogStracture)
        setSimilarBlogs(null)
        setLoading(true)
        setLikedByUser(false)
        setCommentsWrapper(false)
        setTotalParentCommentsLoaded(0)
    }
    return (
        <AnimationWrapper>
            {
                loading?"Loading..":
                <BlogContext.Provider value={{blog,setBlog,isLikedByUser,setLikedByUser,setCommentsWrapper,setTotalParentCommentsLoaded,commentsWrapper,totalParentCommentsLoaded}}>
                    <CommentsContainer/>
                <div className=" mx-auto max-w-[1200px] shadow grid bg-white dark:bg-secondary-dark my-4 rounded-3xl px-16 justify-center items-center py-16 max-lg:px-[5vw]">
                    <h1 className="text-center text-black dark:text-white text-5xl leading-[4rem] capitalize font-bold">{title} </h1>
                    <p className="text-center  text-black dark:text-white mt-8 font-medium">{username}</p>
                    <p className="text-center  text-grey mt-1 text-[15px]">{getFullDay( publishedAt)}</p>
                    <div className="relative w-full grid justify-center text-center mt-10  blog-image rounded-xl aspect-video">
                        <img src={banner} className="rounded-xl" alt="" />
                        <img src={profile_img} className="absolute -top-[6%] left-[50%] translate-x-[-50%] w-20 h-20 rounded-full border-4 border-solid border-white" alt="" ></img>
                    </div>
                    <BlogInteraction/>
                    {/* blog content */}
                        <div className="my-12 font-editor blog-page-content">
                            {
                                content[0].blocks.map((block,i)=>{
                                    return <div key={i} className="my-4 md:my-8">
                                        <BlogContent block={block}/>
                                    </div>
                                })
                            }
                        </div>
                    <BlogInteraction/>
                    {
                        similarBlogs != null && similarBlogs.length?
                        <>
                        <h3 className="text-3xl font-semibold my-6">Similar Blogs :</h3>
                        {
                            similarBlogs.map((blog,i)=>{
                                let {author:{personal_info}}=blog
                                return <AnimationWrapper key={i} transition={{duration:1,delay:i*0.08}}>
                                    <BlogPostCard content={blog} author={personal_info}/>
                                </AnimationWrapper>
                            })
                        }
                        </>
                        :""
                    }
                </div>
                </BlogContext.Provider>
            }
        </AnimationWrapper>
    );
}
 
export default BlogPage;