import { useParams } from "react-router-dom";
import InPageNavigation from "../components/InPageNavigation";
import AnimationWrapper from "../components/AnimationWrapper";
import { useEffect, useState } from "react";
import BlogPostCard from "../components/BlogsPostCard";
import NoDataMsg from "../components/NoDataMsg";
import LoadMoreDataBtn from "../components/LoadMoreDataBtn";
import filterPaginationData from "../components/FilterPaginationData";
import axios from "axios";
import UserCard from "../components/UserCard";
import CourseCard from "../components/CourseCard";

const SearchPage = () => {
    let { query } = useParams()
    let [Blogs,setBlogs] = useState(null)
    let [Courses,setCourses] = useState(null)
    let [users,setUsers]=useState(null)
    const fetchUsers = ( )=>{
        axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/search-users",{query})
        .then(({data:{users}})=>{
            setUsers(users)
        })
    }
    const searchBlogs = ({page = 1,createNewArr=false})=>{
        axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/search-blogs",{query,page})
        .then(async ({data})=>{
            console.log(data.blogs)
            let formatedData = await filterPaginationData({
                state:Blogs,
                data:data.blogs,
                page,
                countRoute:"/search-blogs-count",
                dataToSend:{query},
                createNewArr
            })
            console.log(formatedData)
            setBlogs(formatedData)
            
        })
        .catch(err=>{
            console.log(err)

        })
    }
    const searchCourses = (page = 1,createNewArr=false)=>{
        axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/search-courses",{query,page})
        .then(async ({data})=>{
            console.log(data.courses)
            let formatedData = await filterPaginationData({
                state:Courses,
                data:data.courses,
                page,
                countRoute:"/search-courses-count",
                dataToSend:{query},
                createNewArr
            })
            console.log(formatedData)
            setCourses(formatedData)
            
        })
        .catch(err=>{
            console.log(err)

        })
    }
    useEffect(()=>{
        resetState()
        searchBlogs({page:1,createNewArr:true})
        searchCourses({page:1,createNewArr:true})
        fetchUsers()
    },[query])
    const resetState = ( )=>{
        searchCourses(null)
        setBlogs(null)
        setUsers(null)
    }
    const UserCardWrapper = ()=>{
        return(
            <>
            {
                users == null ?"Loading":users.length?users.map((user,i)=>{
                    return <AnimationWrapper  className={"bg-white p-5 rounded-2xl"} key={i} transition={{duration:1,delay:i*0.08}}>
                        <UserCard user={user}/>
                    </AnimationWrapper>
                }):<NoDataMsg message={"No User Found"}/>

            }
            </>
        )
    }
    return ( 
        <>
            <AnimationWrapper>
                <section className="mt-20 bg-light-gray dark:bg-main-dark px-20 ">
                    <h3 className='main-title pl-1 text-5xl my-4  font-semibold   text-black dark:text-white'>Results For "{query}"</h3>
                    <div className="flex gap-8">


                    <div className="h-cover flex justify-center gap-10">

                    </div>
                    <div className="w-full ">
                        <InPageNavigation routes={[`Search Results from "${query}"`,"Accounts Matches"]} defaultHidden={["Accounts Matches"]}>
                            <>
                            {   
                            Courses == null ? "Loading...": 
                            (Courses.length?
                            Courses.map((course,i)=>{
                                return <AnimationWrapper key={i} transition={{duration:1,delay:i*.1}}>
                                  
                                    <CourseCard course={course} creator={course.author} title="Advanced Grammar and Composition English" rate="4.5" numberRate="200" CourseImg={english} ProfileImg={Student} domain="Computer Science" level="Licence 1" />
                                </AnimationWrapper> 
                            }):<NoDataMsg message="No Courses publishd yet"/>
                        )}
                             {
                                 Blogs == null ? ("Loading...")
                                 : ( Blogs.results.length?
                                    Blogs.results.map((blog,i)=>{
                                        return <AnimationWrapper key={i} transition={{duration:1,delay:i*.1}}>
                                        <BlogPostCard content={blog} author={blog.author.personal_info}/>
                                    </AnimationWrapper> 
                                }):<NoDataMsg message="No Blogs publishd yet"/>
                            )}
                            <LoadMoreDataBtn state={Blogs} fetchDataFun={searchBlogs}/>
                               
                            
                            </>
                            <UserCardWrapper/>
                        </InPageNavigation>
                    </div>
                    <div className="min-w-[40%] lg:min-w-[350px] max-w-min border-l border-light-gray pl-8 pt-3 max-md:hidden">
                    <h4 className="font-semibold text-xl  mb-4">Users related to Search</h4>
                    <UserCardWrapper/>

                    </div>
                            </div>
                </section>  
            </AnimationWrapper>
        </>
     );
}
 
export default SearchPage;