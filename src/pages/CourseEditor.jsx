import React, { useEffect, useState } from 'react';

import { Header } from '../components';
import { EditorData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { Navigate, useParams } from 'react-router-dom';
import PublishForm from '../components/PublishForm';
import {createContext} from 'react'
import axios from 'axios';
import CreateCourse from '../components/CreateCourse';
export const courseStracture={
  title:'',
  banner:'',
  content:[],
  tags:[],
  category:'',
  level:'',
  des:'',
  author:{personal_info:{}}
}
export const CourseContext= createContext({})
const CourseEditor = () => {
  let {course_id}= useParams()
  const{userAuth}=useStateContext()
  const [course,setCourse]= useState(courseStracture)
  const [courseState,setCourseState]=useState("course")
  const [textCourse,setTextCourse]=useState({isReady:false})
  const [ChapterState,setChapterState]=useState(false)

  // const[loading,setLoading]= useState(true)
  // useEffect(()=>{
  //   if (!course_id) {
  //     return setLoading(false)
      
  //   }
  //   axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/get-course",{course_id,draft:true,mode:"edit"})
  //   .then(({data:{course}})=>{
  //     setCourse(course)
  //     setLoading(false)
  //   })
  //   .catch(err=>{
  //     setCourse(null)
  //     setLoading(false)
  //   })
  // },[])
  return(
    <CourseContext.Provider value={{course,setCourse,setCourseState,courseState,ChapterState,setChapterState}}>
        {userAuth.access_token===null?<Navigate to ="/Sign-in"/> 
        // :loading?"Loading.."
        :courseState=="course"?<CreateCourse/>
        :""}
    </CourseContext.Provider>
)
}

export default CourseEditor;

// <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
//   <Header category="App" title="Editor" />
//   <RichTextEditorComponent>
//     <EditorData />
//     <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
//   </RichTextEditorComponent>
// </div>