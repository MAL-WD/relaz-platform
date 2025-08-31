import React, { useEffect, useState } from 'react';

import { Header } from '../components';
import { EditorData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { Navigate, useParams } from 'react-router-dom';
import BlogEditor from '../components/BlogEditor';
import PublishForm from '../components/PublishForm';
import {createContext} from 'react'
import axios from 'axios';
const blogStracture={
  title:'',
  banner:'',
  content:[],
  tags:[],
  des:'',
  author:{personal_info:{}}
}
export const EditorContext= createContext({})
const Editor = () => {
  let {blog_id}= useParams()
  const{userAuth}=useStateContext()
  const [blog,setBlog]= useState(blogStracture)
  const [editorState,setEditorState]=useState("editor")
  const [textEditor,setTextEditor]=useState({isReady:false})
  const[loading,setLoading]= useState(true)
  useEffect(()=>{
    if (!blog_id) {
      return setLoading(false)
      
    }
    axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/get-blog",{blog_id,draft:true,mode:"edit"})
    .then(({data:{blog}})=>{
      setBlog(blog)
      setLoading(false)
    })
    .catch(err=>{
      setBlog(null)
      setLoading(false)
    })
  },[])
  return(
    <EditorContext.Provider value={{blog,setBlog,setEditorState,editorState,textEditor,setTextEditor}}>
        {userAuth.access_token===null?<Navigate to ="/Sign-in"/>
        :loading?"Loading.."
        :editorState=="editor"?<BlogEditor/>
        :<PublishForm/>}
    </EditorContext.Provider>
)
}

export default Editor;

// <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
//   <Header category="App" title="Editor" />
//   <RichTextEditorComponent>
//     <EditorData />
//     <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
//   </RichTextEditorComponent>
// </div>