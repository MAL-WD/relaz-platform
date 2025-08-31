import axios from "axios";
import { useEffect, useState } from "react";
import { useStateContext } from '../contexts/ContextProvider';
import filterPaginationData from "../components/FilterPaginationData";
import { Toaster } from "react-hot-toast";
import SearchSvg from "../components svgs/SearchSvg";
import InPageNavigation from "../components/InPageNavigation";
import NoDataMsg from "../components/NoDataMsg";
import AnimationWrapper from "../components/AnimationWrapper";
import {ManagePublishedBlogCard,ManageDraftBlogPost} from "../components/ManagePublishedBlogCard";
import LoadMoreDataBtn from "../components/LoadMoreDataBtn"
import { useSearchParams } from "react-router-dom";
const ManageBlogs = () => {
    const {userAuth,setUserAuth,userAuth:{access_token,new_notification_available} } = useStateContext();
    const [blogs,setBlogs]=useState(null)
    const [drafts,setDrafts]=useState(null)
    const [query,setQuery]=useState("")
    let activeTab=useSearchParams()[0].get("tab")
    const getBlogs=({page,draft,deletedDocCount=0})=>{
            axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/user-written-blogs",{
                page,draft,query,deletedDocCount
            },{
                headers:{
                    'Authorization':`Bearer ${access_token}`
                }
            })
            .then(async ({data})=>{
                let formatedData=await filterPaginationData({
                    state:draft?drafts:blogs,
                    data:data.blogs,
                    page,
                    user:access_token,
                    countRoute:"/user-written-blogs-count",
                    dataToSend:{draft,query}

                })
                console.log("Draft =>"+draft,formatedData)
                if (draft) {
                    setDrafts(formatedData)
                }
                else{
                    setBlogs(formatedData)
                }
            })
            .catch(err=>{
                console.log(err)
            })
    }
    useEffect(()=>{
        if (access_token) {
            if(blogs==null){
                getBlogs({page:1,draft:false})
            }
            if(drafts==null){
                getBlogs({page:1,draft:true})
            }
        }
    },[access_token,blogs,drafts,query])
    const handleSearch=(e)=>{
        let searchQuery= e.target.value
        setQuery(searchQuery)
        if(e.keyCode==13 && searchQuery.length){
            setBlogs(null)
            setDrafts(null)
        }
    }
    const handleChange=(e)=>{
        if (!e.target.value.length) {
            setQuery("")
            setBlogs(null)
            setDrafts(null)
        }
    }
    return ( 
    <>
        <section className=' mt-20 dark:bg-main-dark bg-white  px-20'>

            <h1 className='main-title pl-1 text-6xl my-4  font-semibold  dark:text-gray-200 text-black dark:text-white'>Manage Blogs</h1>
            <Toaster/>
            <div className="relative max-md:mt-5 md:mt-8 mb-10">
                <input onChange={handleChange} onKeyDown={handleSearch} type="search" className="w-full bg-light-gray dark:bg-secondary-dark p-4 pl-14 pr-6 rounded-full placeholder:text-grey" name="" id=""  placeholder="Search blogs"/>
                <SearchSvg  style={"absolute right-[8%] md:pointer-event-none md:left-5 top-1/2 -translate-y-1/2 text-xl "}/>
            </div>
            <InPageNavigation routes={["Published Blogs","Drafts"]} defaultActive={activeTab!='draft'?0:1}>
                {//published Blogs
                blogs==null?"Loading..":
                blogs.results.length? 
                <>
                {
                    blogs.results.map((blog,i)=>{
                        return <AnimationWrapper key={i} transition={{delay:i*0.08}}>
                            <ManagePublishedBlogCard  blog={{...blog,index:i,setStateFunc:setBlogs}}/>
                        </AnimationWrapper>
                    })
                }
                <LoadMoreDataBtn state={blogs} fetchDataFun={getBlogs} additionalParam={{draft:false,deletedDocCount:blogs.deletedDocCount}}/>
                </>
                :<NoDataMsg message={"No published blogs"}/>
                }
                {//draft Blogs
                drafts==null?"Loading..":
                drafts.results.length? 
                <>
                {
                    drafts.results.map((blog,i)=>{
                        return <AnimationWrapper key={i} transition={{delay:i*0.08}}>
                            <ManageDraftBlogPost blog={{...blog,index:i,setStateFunc:setDrafts}} />
                        </AnimationWrapper>
                    })
                }
                <LoadMoreDataBtn state={drafts} fetchDataFun={getBlogs} additionalParam={{draft:true,deletedDocCount:drafts.deletedDocCount}}/>

                </>
                :<NoDataMsg message={"No draft blogs"}/>
                }
                
            </InPageNavigation>
        </section>
    </> 
    );
}
 
export default ManageBlogs;