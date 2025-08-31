import axios from "axios";
import AnimationWrapper from "../components/AnimationWrapper";
import InPageNavigation from "../components/InPageNavigation";
import { useEffect, useState } from "react";
import Loader from "../components svgs/loader.component";
import BlogPostCard from "../components/BlogsPostCard";
import MinimalCard from "../components/MinimalCard";
import TrendSvg from "../components svgs/TrendSvg";
import NoDataMsg from "../components/NoDataMsg";
import filterPaginationData from "../components/FilterPaginationData";
import LoadMoreDataBtn from "../components/LoadMoreDataBtn";
const Blogs = () => {
    let [Blogs,setBlogs]=useState(null)
    let [trendBlogs,setTrendBlogs]=useState(null)
    let [pageState,setPageState]=useState("Home")
    let categories =["Languages","Mathamathics","Computer Science","Policy","Psychology","Technology","Rights","Medecine","Commerce"]

    const fetchLatesBlogs= ({page = 1})=>{
        axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/latest-blogs",{page})
        .then(async ({data})=>{
            console.log(data.blogs)
            let formatedData = await filterPaginationData({
                state:Blogs,
                data:data.blogs,
                page,
                countRoute:"/all-latest-blogs-count"
            })
            console.log(formatedData)
            setBlogs(formatedData)
            
        })
        .catch(err=>{
            console.log(err)

        })
    }
    const fetchBlogsByCategory= ({page = 1})=>{
        axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/search-blogs",{tag:pageState,page})
        .then(async ({data})=>{
            console.log(data.blogs)
            let formatedData = await filterPaginationData({
                state:Blogs,
                data:data.blogs,
                page,
                countRoute:"/search-blogs-count",
                dataToSend:{tag:pageState}
            })
            setBlogs(formatedData)
            
        })
        .catch(err=>{
            console.log(err)

        })
    }
    const fetchTrendingBlogs= ()=>{
        axios.get(import.meta.env.VITE_SERVER_DOMAIN+"/trending-blogs")
        .then((data)=>{
            console.log(data.data)
            setTrendBlogs(data.data.blogs)
            
        })
        .catch(err=>{
            console.log(err)

        })
    }
    useEffect(()=>{
        if (pageState=="Home") {
            
            fetchLatesBlogs({page:1})
        }else{
            fetchBlogsByCategory({page:1})
        }
        if (!trendBlogs) {
            
            fetchTrendingBlogs()
        }
    },[pageState])
    const loadBlogCategory = (e)=>{
        let category = e.target.innerText.toLowerCase();
        setBlogs(null)
        if (pageState==category) {
            setPageState("Home")
            return
        }
        setPageState(category)
        console.log(category)
        console.log(pageState)
    }   
    return ( <>
        <AnimationWrapper>
            <section className="mt-20 px-20 bg-light-gray dark:bg-main-dark">
        <h3 className='main-title pl-1 text-6xl my-10  font-semibold  dark:text-gray-200 text-black dark:text-white'> Blogs</h3>

            {/* latest blog */}
            <div className="flex gap-8">

                <div className="w-full basis-[65%]">
                    <InPageNavigation routes={[pageState,"trending Blogs"]} defaultHidden={["trending Blogs"]}>
                        <>
                        {
                            Blogs == null ? "Loading..."
                            : ( Blogs.results.length?
                            Blogs.results.map((blog,i)=>{
                                return <AnimationWrapper key={i} transition={{duration:1,delay:i*.1}}>
                                    <BlogPostCard content={blog} author={blog.author.personal_info}/>
                                </AnimationWrapper> 
                            }):<NoDataMsg message="No Blogs publishd yet"/>
                        )}
                        <LoadMoreDataBtn state={Blogs} fetchDataFun={(pageState=="Home"? fetchLatesBlogs:fetchBlogsByCategory)}/>
                        </>
                        {   
                            trendBlogs == null ? "Loading...": 
                            (trendBlogs.length?
                            trendBlogs.map((blog,i)=>{
                                return <AnimationWrapper key={i} transition={{duration:1,delay:i*.1}}>
                                    <MinimalCard sidebar={false} blog={blog} author={blog.author.personal_info} index={i}/>
                                </AnimationWrapper> 
                            }):<NoDataMsg message="No Blogs publishd yet"/>
                        )}
                    </InPageNavigation>
                </div>
                <div className="min-w-[400px] lg:min-w-[400px] basis-[35%] max-w-min  border-l border-light-gray dark:border-dark-gray pl-8 pt-3 ">
                    <div className="flex flex-col gap-10 ">
                        <h4 className="font-semibold text-2xl text-black dark:text-white  ">Stories from all intrest</h4>
                        <div className="flex gap-3 flex-wrap mb-10">
                            {
                                categories.map((c,i)=>{
                                    
                                    return <button onClick={loadBlogCategory} key={i} className={"font-medium  text-[15px] bg-white dark:bg-secondary-dark dark:text-white rounded-full px-5 py-3"+ (pageState == c ? "text-white bg-main-dark":"")}>{c}</button>
                                })
                            }
                        </div>
                    </div>
                        <div>
                            <h3 className="font-medium flex items-center gap-3 text-lg mb-8 text-black dark:text-white">Trending <TrendSvg fill="#444444"/></h3>
                        </div>
                        {
                            trendBlogs == null ? "Loading...": 
                            (trendBlogs.length?trendBlogs.map((blog,i)=>{
                                return <AnimationWrapper key={i} transition={{duration:1,delay:i*.1}}>
                                    <MinimalCard sidebar={true} blog={blog} author={blog.author.personal_info} index={i}/>
                                </AnimationWrapper> 
                            }):<NoDataMsg message="No Trending Blogs yet"/>
                        )}
                </div>
            </div>
            </section>
        </AnimationWrapper>
    </> );
}
 
export default Blogs;