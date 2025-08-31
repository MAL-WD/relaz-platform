import { useParams } from "react-router-dom";
import { Header } from "../components";
import HistoryNavigation from "../components/HistoryNavigation";
import { courseStracture } from "./CourseEditor";
import { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import certificate from '../data/certificate.svg'
import file from '../data/file.svg'
import { getFullDay } from "../common/date";
import AnimationWrapper from "../components/AnimationWrapper";
import NoDataMsg from "../components/NoDataMsg";
const CoursePage = () => {
    let {course_id}=useParams()
    const { currentColor } = useStateContext();

    const [course,setCourse]=useState(courseStracture)
    // const [similarBlogs,setSimilarBlogs]=useState(null)
    const[loading,setLoading]=useState(true) 
    // const[isLikedByUser,setLikedByUser]=useState(false) 
    // const [commentsWrapper,setCommentsWrapper]=useState(true)
    // const [totalParentCommentsLoaded,setTotalParentCommentsLoaded]=useState(0)


    let{title ,content,banner,activity,tags,level,author:{personal_info:{fullname,username,profile_img}},publishedAt}=course
    let{chapter_content}=content
    const [clickedChapter,setClickedChapter]=useState(0)
    const fetchCourse = () =>{
        
        axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/get-course",{course_id})
        .then(async ({data:{course}})=>{
            // c.comments= await fetchComments({blog_id:blog._id,setParentCommentCountFun:setTotalParentCommentsLoaded})
            setCourse(course)
            console.log(course)

            // axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/search-courses",{tag:blog.tags[0],limit:6,eliminate_blog:blog_id})
            // .then(({data})=>{
            //     setSimilarBlogs(data.blogs)
            //     console.log(data.blogs)
            // })
            setLoading(false)
        })
        .catch(err=>{
            console.log(err)
            setLoading(false)
        })
    }
    useEffect(()=>{
        resetState()
        fetchCourse()
        // setActiveMenu(false)
    },[course_id])
    const resetState=()=>{
        setCourse(courseStracture)
        // setSimilarBlogs(null)
        // setLoading(true)
        // setLikedByUser(false)
        // setCommentsWrapper(false)
        // setTotalParentCommentsLoaded(0)
    }
    
    return ( <>
    {loading?"Loading..":<div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation />
      <Header route="Course Details " title="Course Details" />
      <div className=" w-full shadow  bg-white dark:bg-secondary-dark my-4 rounded-3xl px-16 flex gap-4  items-center py-16 max-lg:px-[5vw]">
        <div className="course-content basis-[73%] ">
            <div className="file"><a className="cursor-pointer font-medium text-xl flex gap-4 items-center mb-4 bg-light-gray p-5 rounded-2xl" href={course.content[clickedChapter].chapter_content}> <img src={file} className="w-10 h-10" alt="" /> Download {course.content[clickedChapter].chapter_title } File</a>  </div>
            <div className="domain border  border-gray-300 dark:border-dark-gray rounded-3xl font-semibold w-fit text-xs px-2 p-1" style={{color:currentColor}} >{tags[0]}</div>

            <div className="title text-black text-2xl font-semibold my-3.5 mb-3">{title}</div>
            <div className="course-info w-full flex justify-between text-grey">
                <div className="flex gap-2">
            A Course By <span className="text-black pr-2">{username} </span>  · <span className="pl-2">{course.activity.total_views } Views</span>
                </div> 
                    <div className="flex gap-2 ml-auto">
                         <span className="pl-2 flex">

                    <img src={certificate} className="w-6 h-6 mr-2" alt="" />{course.level } </span> </div>
                    <span  className="ml-6">{getFullDay(publishedAt)}</span>
                    </div>
            <div className="course-about"></div>
        </div>
        <div className="course-chapter basis-[25%]">
            <h3 className="font-semibold text-2xl my-3">Course Chapter</h3>
            {   
                            course.content == null ? "Loading...": 
                            (course.content.length?
                            course.content.map((chapter,index)=>{
                                return <AnimationWrapper key={index} transition={{duration:1,delay:index*.1}}>
                                  
                                    <div onClick={()=>setClickedChapter(index)} className="p-3 cursor-pointer border-b bg-light-gray rounded-xl border-white  my-2 flex gap-4"> <span className="text-3xl font-semibold text-gray-300">{index < 10? "0"+(index+1):index}</span> <p className="text-lg text-black">{chapter.chapter_title}</p></div>
                                </AnimationWrapper> 
                            }):<NoDataMsg message="No Content yet"/>
                        )}
        </div>
      </div>
    </div>
      }
    </> );
}
 
export default CoursePage;