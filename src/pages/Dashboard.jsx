import React, { useEffect, useState } from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import course from '../data/courseblue.svg'
import timeorange from '../data/timeorange.svg'
import time from '../data/time.svg'
import article from '../data/article.svg'
import articlePurple from '../data/articlePurple.svg'
import calendar from '../data/calendar.svg'
import certificategreen from '../data/certificategreen.svg'
import certificate from '../data/certificate.svg'
import {   dropdownData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import courseC from '../data/langage-c.jpg'
import excel from '../data/excel.png'
import biochem from '../data/biochemistry.webp'
import english from '../data/english.avif'
import webDev from '../data/web-developer.jpg'
import financial from '../data/financial-acounting.avif'
import Student from '../data/student.jpg'
import books from '../data/books.jpg'
import logo from '../data/logo.svg';
import star from '../data/star-rate.svg'
import CourseCard from '../components/CourseCard';
import axios from 'axios';
import AnimationWrapper from '../components/AnimationWrapper';
import NoDataMsg from '../components/NoDataMsg';
import ArticleCard from '../components/ArticleCard';
import filterPaginationData from '../components/FilterPaginationData';
import { getDay, getFullDay } from '../common/date';
import ArticleNow from '../components/ArticleNow';
const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-light-gray dark:border-dark-gray px-2 py-1 rounded-lg">
    <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
  </div>
);
const Achive =({title,score,icon ,bgClr,borderClr})=>{
  return(
    <div className="achive   text-black dark:text-white dark:bg-secondary-dark  p-4   rounded-2xl" style={{background:bgClr,borderWidth:"1px", borderColor:borderClr}}>
            <div className="head flex  align-center gap-3 my-2">
              <div className="image   p-3 rounded-full">

              <img className='w-6 h-6' src={icon} alt="" />
              </div>
              <div className="achive-info">
                <p className='text-4xl text-dark-gray dark:text-black  font-semibold'>{score}</p>
                <p className=' text-dark-gray text-sm font-medium dark:text-secondary-dark'>{title}</p>
              </div>
            </div>
          </div>
  )
}
const CourseNow =({creator,title,completedLessons,totalLessons,imgSrc})=>{
  const { currentColor } = useStateContext();
  const progress =Math.round((completedLessons * 100)/totalLessons)
  const ProgressWidth= `${progress}%`
  return(
    <div className="course rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-500">
      <div className="image rounded-xl p-2 max-h-[200px] mb-1.5">

      <img className=" rounded-xl min-w-48 min-h-36" src={imgSrc} alt=""  />
      </div>
          <div className="course-info  p-3">
          
          <div className="profile flex gap-2 align-center "><img className='w-6 h-6 rounded-full' src={Student} alt="" srcset="" /><p className='text-grey dark:text-gray-400 text-sm'> {creator}</p></div>
          <p className='font-semibold my-2 line-clamp-2 leading-7 mb-6 text-black dark:text-white dark:text-gray-200 text-black dark:text-white text-lg'>{title}</p>
          <div className="course-progress flex justify-between mb-3 ">
            <span className='text-xs font-semibold text-grey dark:text-gray-400 '>{progress}%</span>
            <span className='text-xs font-semibold text-grey dark:text-gray-400 '>{completedLessons}/{totalLessons} Lessons</span>
            </div>
            <span className='bg-gray-200 w-full h-2 rounded-full block mb-2' ><span style={{background:currentColor,width:ProgressWidth }} className=' block h-full rounded-full'></span></span>
          </div>
          </div>
  )
}



const Dashboard = () => {
  const {userAuth:{fullname,username}, currentColor, currentMode } = useStateContext();
  let [trendCourses,setTrendCourses]=useState(null)
  let [trendBlogs,setTrendBlogs]=useState(null)
  let [Blogs,setBlogs]=useState(null)
  let [Courses,setCourses]=useState(null)

  const fetchTrendingCourses= ()=>{
    axios.get(import.meta.env.VITE_SERVER_DOMAIN+"/trending-courses")
    .then((data)=>{
        console.log(data.data)
        setTrendCourses(data.data.courses)
        console.log(data.data.courses)
        
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
const fetchLatestBlogs= (page = 1)=>{
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
const fetchLatestCourses= (page = 1)=>{//{page=1}
  axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/latest-courses",{page})
  .then(async ({data})=>{
      console.log(data.courses)
      let formatedData = await filterPaginationData({
          state:Courses,
          data:data.courses,
          page,
          countRoute:"/all-latest-courses-count"
      })
      console.log(formatedData)
      setCourses(formatedData)
      
  })
  .catch(err=>{
      console.log(err)

  })
}
useEffect(()=>{
    
    if (!Courses) {
        
        fetchLatestCourses()
    }
    if (!Blogs) {
        
        fetchLatestBlogs()
    }
    if (!trendCourses) {
        
        fetchTrendingCourses()
    }
    if (!trendBlogs) {
        
        fetchTrendingBlogs()
    }
},[])
  return (
    <div className="mt-20 px-6 ">
      <div className="statics">
        <h1 className='main-title pl-1 text-6xl my-12  font-semibold  dark:text-gray-200 text-black dark:text-white'>Welcome Back{fullname?`, ${fullname}`:""}!</h1>
        <div className="grid  gap-5 mt-5 " style={{gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))"}}>
          <Achive title="Total Courses " score="100" icon={course} bgClr={currentMode=="Light"?"#ccebff":"#2B9BE7"} borderClr={currentMode=="Light"?"#5ebefd":"transparent"}/>
          <Achive title="Total Hours " score="100" icon={timeorange} bgClr={currentMode=="Light"?"#fee4cc":"#EF5948"} borderClr={currentMode=="Light"?"#fd993f":"transparent"}/>
          <Achive title="Total Articles " score="100" icon={articlePurple} bgClr={currentMode=="Light"?"#e5dfff":"#8b4cff"} borderClr={currentMode=="Light"?"#a898fd":"transparent"}/>
          <Achive title="Total Certifactes " score="100" icon={certificategreen} bgClr={currentMode=="Light"?"#d8f2ee":"#03B56E"} borderClr={currentMode=="Light"?"#88d6ca":"transparent"}/>
          
        </div>
        <div className="recent-courses bg-white dark:text-gray-200 text-black dark:text-white dark:bg-secondary-dark rounded-3xl p-5 my-5 ">
          <div className="head align-center justify-between flex">
          <h3 className=' pl-1 my-2  dark:text-gray-200 text-black dark:text-white text-2xl font-semibold text-black dark:text-white'>Latest Courses</h3>
          <button className='runded-3xl op-2 px-4 text-white text-sm' style={{ backgroundColor:currentColor, border:`1px solid ${currentColor}`}}>View All</button>
          </div>
          <div className="grid gap-5 mt-5" style={{gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))"}}>
          {
                            Courses == null ? "Loading..."
                            : ( Courses.results.length?
                            Courses.results.map((course,i)=>{
                                return <AnimationWrapper key={i} transition={{duration:1,delay:i*.1}}>
                                    <CourseCard course={course} />
                                </AnimationWrapper> 
                            }):<NoDataMsg message="No Courses publishd yet"/>
                        )}
          
          
          
          
          </div>
        </div>
        <div className="recent-articles bg-white dark:text-gray-200 text-black dark:text-white dark:bg-secondary-dark rounded-3xl p-5 my-5 ">
          <div className="head align-center justify-between flex">
          <h3 className=' pl-1 my-2  text-2xl font-semibold text-black dark:text-white dark:text-gray-200 text-black dark:text-white'>Latest Articles</h3>
          <button className='rounded-3xl p-2 px-4 text-sm text-white' style={{ backgroundColor:currentColor, border:`1px solid ${currentColor}`}}>View All</button>
          </div>
          <div className="grid  gap-5 mt-5" style={{gridTemplateColumns:"repeat(auto-fit, minmax(500px, 1fr))"}}>
          {
                            Blogs == null ? "Loading..."
                            : ( Blogs.results.length?
                            Blogs.results.map((blog,i)=>{
                                return <AnimationWrapper key={i} transition={{duration:1,delay:i*.1}}>
                                    <ArticleNow content={blog} author={blog.author.personal_info}/>
                                </AnimationWrapper> 
                            }):<NoDataMsg message="No Blogs publishd yet"/>
                        )}
          {/* <ArticleNow imgSrc={webDev} domain="Computer Science" creator="Mohamed Lazreg" title="Build a Website in one minute" PublishDate="1 Jan,2023" timeSpent="7min"/>
          <ArticleNow imgSrc={webDev} domain="Computer Science" creator="Mohamed Lazreg" title="Build a Website in one minute" PublishDate="1 Jan,2023" timeSpent="7min"/>
          <ArticleNow imgSrc={webDev} domain="Computer Science" creator="Mohamed Lazreg" title="Build a Website in one minute" PublishDate="1 Jan,2023" timeSpent="7min"/>
          <ArticleNow imgSrc={webDev} domain="Computer Science" creator="Mohamed Lazreg" title="Build a Website in one minute" PublishDate="1 Jan,2023" timeSpent="7min"/> */}
          
          
          
          
          
          </div>
        </div>
          
            <div className="top-courses mb-5  dark:text-gray-200 text-black dark:text-white dark:bg-secondary-dark rounded-3xl p-5  bg-white">
              <div className="head align-center justify-between flex">
               <h3 className=' dark:text-gray-200 text-black dark:text-white pl-1 my-2  text-2xl font-semibold text-black dark:text-white'>Popular Courses </h3>
              <button className='rounded-3xl p-2 px-4 text-sm text-white' style={{ backgroundColor:currentColor, border:`1px solid ${currentColor}`}}>View All</button>
              </div>
              <div className="courses grid  gap-5 mt-4" style={{gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))"}}>
              {   
                            trendCourses == null ? "Loading...": 
                            (trendCourses.length?
                            trendCourses.map((course,i)=>{
                                return <AnimationWrapper key={i} transition={{duration:1,delay:i*.1}}>
                                  
                                    <CourseCard course={course} creator={course.author} title="Advanced Grammar and Composition English" rate="4.5" numberRate="200" CourseImg={english} ProfileImg={Student} domain="Computer Science" level="Licence 1" />
                                </AnimationWrapper> 
                            }):<NoDataMsg message="No Courses publishd yet"/>
                        )}
                
              </div>

          </div>
            <div className="top-articles dark:text-gray-200 text-black dark:text-white dark:bg-secondary-dark rounded-3xl p-5  bg-white">
              <div className="head align-center justify-between flex">
                <h3 className=' dark:text-gray-200 text-black dark:text-white pl-1 my-2  text-2xl font-semibold text-black dark:text-white'>Popular Articles</h3>
                <button className='rounded-3xl p-2 px-4 text-sm text-white' style={{ backgroundColor:currentColor, border:`1px solid ${currentColor}`}}>View All</button>
              </div>
              <div className="articles grid gap-5 mt-4" style={{gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))"}}>
              {   
                            trendBlogs == null ? "Loading...": 
                            (trendBlogs.length?
                            trendBlogs.map((blog,i)=>{
                                return <AnimationWrapper key={i} transition={{duration:1,delay:i*.1}}>
                                    <ArticleCard blog={blog}  index={i}/>
                                </AnimationWrapper> 
                            }):<NoDataMsg message="No Blogs publishd yet"/>
                        )}
              </div>
            </div>
          
      </div>
      
    </div>
  );
};

export default Dashboard;
