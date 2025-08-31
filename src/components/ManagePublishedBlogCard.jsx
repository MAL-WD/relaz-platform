import { Link } from "react-router-dom";
import { getDay } from "../common/date";
import { useState } from "react";
import { useStateContext } from '../contexts/ContextProvider';
import axios from "axios";

const BlogStats = ({stats})=>{
    return(
        <div className="flex gap-2 items-center max-lg:mb-6 max-lg:pb-6 border-light-gray max-lg:border-b">
            {
                Object.keys(stats).map((key,i)=>{
                    return !key.includes("parent")?<div key={i} className={"flex text-dark-gray flex-col items-center w-full h-full mb-5 justify-center p-2 px-6 " + (i!=0?" border-light-gray border-l  ":"")}>
                        <h3 className="text-lg lg:text-xl">{stats[key].toLocaleString()}</h3>
                        <p className="capitalize">{key.split("_")[1]}</p>
                    </div>:""
                })
            }
        </div>
    )
}
export const ManagePublishedBlogCard = ({blog}) => {
    let {banner,blog_id,title,publishedAt,activity}=blog
    let [showStat,setShowStat]=useState(false)
    const {userAuth,setUserAuth,userAuth:{access_token,new_notification_available} } = useStateContext();

    return ( <>
        <div className="flex gap-10 border-b mb-6 max-md:px-4 border-light-gray dark:border-dark-gray pb-6 items-center">
            <img src={banner} className="max-md:hidden lg:hidden xl:block w-28 h-28 flex-none bg-light-gray object-cover rounded-xl"/>
            <div className="flex flex-col  justify-between py-2 w-full min-w-[300px]">
                <div>
                    <Link to={`/blog/${blog_id}`} className="blog-title mb-4 text-3xl my-2 text-black dark:text-white font-semibold hover:underline">{title}</Link>
                    <p className="text-grey mt-2">Published on {getDay(publishedAt)}</p>
                </div>
                <div className="flex gap-6 mt-3">
                    <Link to={`/editor/${blog_id}`} className="pr-4 text-grey py-2 underline">Edit</Link>
                    <button onClick={()=>setShowStat(preVal=>!preVal)} className="lg:hidden pr-4 py-2 text-grey underline">Stats</button>
                    <button onClick={(e)=>deleteBlog(blog,access_token,e.target)}  className="pr-4 py-2 underline text-red">Delete</button>
                </div>
            </div>
            <div className="max-lg:hidden">
                <BlogStats stats={activity}/>
            </div>
        </div>
        {
            showStat?<div className="lg:hidden"><BlogStats stats={activity}/></div>:""
        }
    </> );
}
export const ManageDraftBlogPost = ({blog}) => {
    let {banner,blog_id,title,des,index}=blog
    const {userAuth,setUserAuth,userAuth:{access_token,new_notification_available} } = useStateContext();

    index++
    return (<>
    <div className="flex items-center gap-5 lg:gap-10 pb-6 border-b mb-6 border-light-gray">
        <h2 className="text-gray-300 text-6xl font-medium text-center pl-4 md:pl-6 flex-none">{index<10?"0"+index:index}</h2>
        <div>
            <h2 className="text-2xl font-semibold mb-2 ">{title}</h2>
            <p className="font-editor line-clamp-2 text-grey">{des.length?des:"No description"}</p>
            <div className="flex gap-6 mt-3">
                    <Link to={`/editor/${blog_id}`} className="pr-4 text-grey py-2 underline">Edit</Link>
                    <button onClick={(e)=>deleteBlog(blog,access_token,e.target)} className="pr-4 py-2 underline text-red">Delete</button>
                </div>
        </div>
    </div>
    </>  );
}
 
 const deleteBlog=(blog,access_token,target)=>{
    let {index ,blog_id,setStateFunc}=blog
    target.setAttribute("disabled",true)
    axios.post(import.meta.env.VITE_SERVER_DOMAIN+ "/delete-blog",{blog_id},{
        headers:{
            'Authorization':`Bearer ${access_token}`
        }
    })
    .then(({data})=>{
        target.removeAttribute("disabled")
        setStateFunc(prev=>{
            let {deletedDocCount,totalDocs,results}=prev
            results.splice(index,1)
            if (!deletedDocCount) {
               deletedDocCount=0 
            }
            if (!results.length && totalDocs-1>0) {
                return null ;
            }
            return {...prev,totalDocs:totalDocs-1,deleteDocCount:deletedDocCount+1}
        })
    })
    .catch(err=>{
        console.log(err)
    })
 }