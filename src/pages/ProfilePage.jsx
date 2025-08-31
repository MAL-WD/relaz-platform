import axios from "axios";
import {  useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AnimationWrapper from "../components/AnimationWrapper";
import { useStateContext } from "../contexts/ContextProvider";
import AboutUser from "../components/AboutUser";
import filterPaginationData from "../components/FilterPaginationData";
import InPageNavigation from "../components/InPageNavigation";
import BlogPostCard from "../components/BlogsPostCard";
import LoadMoreDataBtn from "../components/LoadMoreDataBtn";
import NoDataMsg from "../components/NoDataMsg";
import PageNotFound from "../pages/PageNotFound";
export const profileDataStracture ={
    personal_info : {
        fullname:"",
        userame:"",
        profile_img:"",
        bio:"",
    },
    account_info:{
        total_posts:0,
        total_reads:0,
    },
    social_links:{},
    joinedAt:""
}
const ProfilePage = () => {
    let {id:profileId}=useParams()
    let [profile,setProfile]=useState(profileDataStracture)
    let {personal_info:{fullname,username:profile_username,profile_img,bio,},account_info:{total_posts,total_reads},social_links,joinedAt}=profile
    let [loading,setLoading]= useState(true)
    let [blogs,setBlogs] = useState(null)
    let [profileLoaded,setProfileLoaded] = useState("")
    // function to get data from server

  const {userAuth:{username},setUserAuth } = useStateContext();
    console.log(profileId)
    const fetchUserProfile= ()=>{
        axios.post(import.meta.env.VITE_SERVER_DOMAIN +"/get-profile",{username:profileId}).then(({data:user})=>{
            if (user != null) {
                
                setProfile(user)
            }
            setProfileLoaded(profileId)
            setLoading(false)
            getBlogs({user_id:user._id})
        }).catch(err=>{
            console.log(err)
                setLoading(false)
        })
    }
    useEffect(()=>{
        if (profileId != profileLoaded) {
            setBlogs(null)
        }
        if (blogs ==null) {
            
            resetState()
            fetchUserProfile()
        }

    },[profileId,blogs])
    const resetState = ()=>{
        setProfile(profileDataStracture)
        setLoading(true)
        setProfileLoaded("")

    }
    const getBlogs = ({page = 1,user_id})=>{
        user_id=user_id == undefined ? blogs.user_id:user_id
        axios.post(import.meta.env.VITE_SERVER_DOMAIN +"/search-blogs",{author:user_id,page}).then(async ({data})=>{
            let formatedData= await filterPaginationData({
                state:blogs,
                data:data.blogs,
                page,
                countRoute:"/search-blogs-count",
                data_to_send :{author:user_id}
            })
            formatedData.user_id = user_id
            setBlogs(formatedData)

        }).catch(err=>{
            console.log(err)
                setLoading(false)
        })

    }
    return (
        <AnimationWrapper>
            {loading?"Loading...":
                profile_username.length?

                <section className="h-cover md:flex flex-row-reverse md:items-start mt-20 px-20 items-start gap-5 min-[1100px]:gap-12">
                    <div className="flex flex-col  items-center    min-w-[250px] md:w-[50%] md:pl-8 md:border-l border-light-gray md:sticky md:top-[100px] md:py-10">
                        <img src={profile_img} alt="" className="w-40 h-40 bg-light-gray rounded-full"/>
                        <h1 className="text-xl mt-4 font-semibold text-black dark:text-white">{profile_username}</h1>
                        <p className=" text-grey text-sm capitalize my-1">@{profile_username}</p>
                        {/* <p className="text-sm text-grey -mt-1">{total_posts.toLocaleString()} Blogs - {total_reads.toLocaleString()} Reads</p> */}
                        {
                            profileId==username?<div className="flex  gap-4 my-4">
                            <Link to={"/edit Profile"} className="bg-light-gray rounded-full font-medium px-8 py-3">Edit Profile</Link>
                        </div>:""
                        }
                        <AboutUser className={"max-md:hidden"} bio={bio} social_links={social_links} joinedAt={joinedAt} classname={""}/>
                        
                    </div>
                    <div className="max-md:mt-12 w-full">
                    <InPageNavigation routes={["Blogs Published","About"]} defaultHidden={["About"]}>
                        <>
                        {
                            blogs == null ? "Loading..."
                            : ( blogs.results.length?
                            blogs.results.map((blog,i)=>{
                                return <AnimationWrapper key={i} transition={{duration:1,delay:i*.1}}>
                                    <BlogPostCard content={blog} author={blog.author.personal_info}/>
                                </AnimationWrapper> 
                            }):<NoDataMsg message="No Blogs publishd yet"/>
                        )}
                        <LoadMoreDataBtn state={blogs} fetchDataFun={getBlogs}/>
                        </>
                      <AboutUser bio={bio} social_links={social_links} joinedAt={joinedAt}/>
                    </InPageNavigation>
                    </div>
                </section>
                : <PageNotFound/>
            }   
            </AnimationWrapper>
    )
}
 
export default ProfilePage;