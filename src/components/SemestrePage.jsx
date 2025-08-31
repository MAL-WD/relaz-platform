import axios from "axios";
import Header from "./Header";
import HistoryNavigation from "./HistoryNavigation";
import filterPaginationData from "./FilterPaginationData";
import { useEffect, useState } from "react";
import AnimationWrapper from "./AnimationWrapper";
import CourseCard from "./CourseCard";
import NoDataMsg from "./NoDataMsg";
import english from '../data/english.avif'
import Student from '../data/student.jpg'
import { useStateContext } from "../contexts/ContextProvider";
 const semestreStracture ={
    title:'',
    banner:'',
    content:[],
    tags:[],
    category:'',
    level:'',
    des:'',
    author:{},
    activity:{}
  }
const SemestrePage = (courses,routePath) => {
  const {userAuth:{fullname,username}, currentColor, currentMode } = useStateContext();
  let [loading,setLoading]= useState(true)
  
  let [Courses,setCourses]=useState(null)
//   let {title,banner,level,des,author:{},activity:{}}=Courses

    const fetchCategoryCourses= ()=>{
    let category="http://localhost:5173/Courses/Rights-and-Political/Rights/Licence/Scole-commun/Semestre-1"

      axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/get-category-courses",{category})
      .then((data)=>{
          console.log(data.data)
          setCourses(data.data.courses)
          console.log(data.data.courses)
          
      })
      .catch(err=>{
          console.log(err)
  
      })
  }
  const getCourses = ()=>{
    let category="http://localhost:5173/Courses/Rights-and-Political/Rights/Licence/Scole-commun/Semestre-1"
    axios.post(import.meta.env.VITE_SERVER_DOMAIN +"/search-courses",{category}).then(async ({data})=>{
        console.log(data)
       
        setCourses(data.courses)

    }).catch(err=>{
        console.log(err)
            setLoading(false)
    })

}
const resetState = ( )=>{
    setCourses(null)
    resetState()

}
  useEffect(()=>{
    
      if (!Courses) {
      getCourses()
        console.log(Courses)
    }
    
},[])
    return ( 
    <div className="mt-20 px-6 rounded-3xl">
    <HistoryNavigation/>
    <Header route={routePath} title="Semestre Courses " />
    <div className="semestre-courses bg-white dark:text-gray-200 text-black dark:text-white dark:bg-secondary-dark rounded-3xl p-5 my-5 ">
    <div className="head align-center justify-between flex">
          <h3 className=' pl-1 my-2  dark:text-gray-200 text-black dark:text-white text-2xl font-semibold text-black dark:text-white'>All Courses</h3>
          </div>
          <div className="grid gap-5 mt-5" style={{gridTemplateColumns:"repeat(auto-fill, minmax(250px, 1fr))"}}>
    {   
                            Courses == null ? "Loading...": 
                            (Courses.length?
                            Courses.map((course,i)=>{
                                return <AnimationWrapper key={i} transition={{duration:1,delay:i*.1}}>
                                  
                                    <CourseCard course={course} />
                                </AnimationWrapper> 
                            }):<NoDataMsg message="No Courses publishd yet"/>
                        )}
      
    </div>
    </div>
  </div> );
}
 
export default SemestrePage;