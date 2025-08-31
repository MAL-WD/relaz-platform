import { useContext, useRef, useState } from "react";
import InputBox from "./InputBox";
import defaultBanner from "../data/blog banner.png"
import {UploadFile, UploadImage} from "../common/aws";
import toast, { Toaster } from "react-hot-toast";
import { CourseContext } from "../pages/CourseEditor";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import CourseTag from "./CourseTag";
import { phrases } from "../data/dummy";
import axios from "axios";
import { courseStracture } from "../pages/CourseEditor";
import ChapterForm from "./ChapterForm";
const CreateCourse = () => {
    let courseImageref=useRef()
    let {course,course:{title,banner,level,category,content,tags,des},setCourse,textCourse,setTextCourse,setCourseState,ChapterState,setChapterState} = useContext(CourseContext)
   let navigate=useNavigate()
  const {userAuth,setUserAuth } = useStateContext();
    let {course_id}=useParams()
    const characterLimit = 200
console.log(tags)
    console.log(course)
    const handleImageUpload = (e)=>{
        let img = e.target.files[0]
        console.log(img)
        if(img){
            
            let loadingToast=toast.loading("Uploading...")
            UploadFile(img).then((url)=>{
                console.log(url)
                if (url) {
                    courseImageref.current.src=url
                    console.log(url)
                    toast.dismiss(loadingToast)
                    toast.success("Uploaded 👍")
                    setCourse({...course,banner:url})
                    
                    
                }
            })
            .catch(err=>{
                console.log(err)
                toast.dismiss(loadingToast)
                return toast.error(err)
            })
        }
    }
    const handleError=(e)=>{
        let img = e.target
        img.src=defaultBanner;
    }
    function getCoursesPath(url) {
        // Find the starting index of "/Courses" in the URL
        const index = url.indexOf('/Courses');
        
        // If "/Courses" is found in the URL
        if (index !== -1) {
          // Return the part of the URL from "/Courses" to the end
          return url.substring(index);
        } else {
          // Return an empty string or handle the case where "/Courses" is not in the URL
          return '';
        }
      }
    const handlePublishEvent =()=>{
        if(!banner.length){
            return toast.error("Upload the Course image to publish it")

        }
        if(!title.length){
            return toast.error("Upload the Course title to publish it")

        }
        
        if(chapter.isReady){
            textEditor.save().then((data)=>{
                if(data.blocks.length){
                    setCourse({...course,content:data})
                    setCourseState("publish")

                }else{
                    return toast.error("Write something in your Course to publish it")
                }
            })
            .catch((err)=>{
                console.log(err)
            })

        
    }}
    const getRandomPhrase = () => {
        const randomIndex = Math.floor(Math.random() * phrases.length);
        return phrases[randomIndex];
      };
    
      const [phrase, setPhrase] = useState(getRandomPhrase());
      const [formData, setFormData] = useState(courseStracture);
    //   let CourseData=useRef()
    // //   let formData={}
    //      let form = new FormData(CourseData.current)
    //      for(let[key,value] of form.entries()){
    //          formData[key]=value
    //          console.log(formData)
    //              }
    //              console.log(formData)
    function splitUrl(url) {
        const baseUrl = "http://localhost:5173";
        if (url.startsWith(baseUrl)) {
            return url.slice(baseUrl.length);
        } else {
            return null;
        }
    }
    console.log(splitUrl("http://localhost:5173/Courses/Rights-and-Political/Rights/Licence/Scole-commun/Semestre-1"))
    const publishCourse =(e)=>{  
        setPhrase(getRandomPhrase());
            // let thanking=["Thank you for helping us grow and learn.","Your guidance has made us better and wiser.","We appreciate your dedication and support.","Thank you for inspiring us every day.","Your patience and wisdom mean the world to us.","Thanks for believing in our potential.","Your influence has shaped us profoundly.","We’re grateful for your encouragement and care.","Thank you for being a great mentor.","Your teaching has made a lasting impact on us."]
            console.log(tags)
            // if(Array.from(e.target.classList).includes(("disable"))){
            //     return
            // }
            if (!title.length) {
                return toast.error("write Course title before publishing")
                
            }
            if (!category.length) {
                return toast.error("provide the course place link please ")
                
            }
            if (!level.length) {
                return toast.error("provide the course level please ")
                
            }
            if (!des.length || des.length>characterLimit) {
                return toast.error(`write a description about your Course withing ${characterLimit } characters`)
                
            }
            if (!tags.length) {
                return toast.error(`Enter at least 1 tag to help us rank your Course`)
                
            }
            if (!content.length) {
                return toast.error(`add content to your Course`)
                
            }
          
            let loadingToast =toast.loading("Publishing... ")
            e.target.classList.add("disable")
            axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/create-course",course,
                {
                    headers:{
                        "Authorization":`Bearer ${userAuth.access_token}`
                    }
                }
            ).then(()=>{
                e.target.classList.remove('disable')
                toast.dismiss(loadingToast)
                toast.success("Published ")
                setTimeout(()=>{
                    toast(phrase, {
                        icon: '👏',
                      });
                },1500)
                
                let location=splitUrl(course.category)
                if(location.length){
                navigate(`${location}`)
                }
                // setTimeout(()=>{
                // navigate("/Dashboard")

                // },5000)
            }).catch(({response})=>{
                e.target.classList.remove('disable')
                toast.dismiss(loadingToast)
                return toast.error(response)

            })
        }
        console.log(phrase)
    const handleDraftEvent =()=>{

    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        // name=name==="category"?splitUrl(value):value
        console.log(name)
        setFormData({
          ...formData,
          [name]: value
        });
        setCourse({...course,[name]:value})
      };
    
      
    const tagLimit = 5
    const handleKeyDown = (e)=>{
            if(e.keyCode==13 || e.keyCode== 188){
                e.preventDefault()
                let tag =e.target.value
                if (tags.length<tagLimit) {
                    if(!tags.includes(tag) && tag.length){
                        setCourse({...course,tags:[...tags,tag]})
                    }
                }else{
                    toast.error(`you can add max ${tagLimit} Tags`)
                }
                e.target.value=""
            }
    }
    const handleFileUpload = (e)=>{
        let file = e.target.files[0]
        console.log(file)
        if(file){
            
            let loadingToast=toast.loading("Uploading...")
            UploadFile(file).then((url)=>{
                console.log(url)
                if (url) {
                    // courseImageref.current.src=url
                    setCourse({
                        ...course,
                        banner: url
                    });
                    toast.dismiss(loadingToast)
                    toast.success("Uploaded 👍")
                    // setCourse({...course,content:[...content,formChapter]})
                    
                }
            })
            .catch(err=>{
                console.log(err)
                toast.dismiss(loadingToast)
                return toast.error(err)
            })
        }
    }

    return ( <>

    <Toaster/>
    <div className="mt-20 px-6">
    <div className="header flex mb-7 justify-between items-center">
        <h2 className='main-title pl-1 text-5xl font-semibold  dark:text-gray-200 text-black dark:text-white'>Course Details</h2>
            <div className="buttons flex gap-3" style={{height:"fit-content"}}>
                <button className="rounded-full py-3 px-6  bg-main-dark dark:bg-white dark:text-black text-white  font-medium" onClick={publishCourse}>Publish</button>
            </div>
        </div>
    <form  className=" dark:text-gray-200 grid grid-cols-2 gap-6 text-black dark:text-white  rounded-2xl p-5 my-5 ">
        <div className="course-info">

        <div className="course-title p-5 rounded-2xl dark:bg-secondary-dark bg-white grid mb-6">
            <label htmlFor="course-title" className="font-medium text-xl mb-3">Course Title</label>
            <InputBox name={"title"} onChange={handleChange} value={formData.title} light={"gray"} dark={true} id="course-title" type="text" className="border rounded-md p-3" placeholder="ex. 'Algorithms and data stractures'"/>
        </div>
        <div className="course-des p-5 rounded-2xl dark:bg-secondary-dark bg-white grid mb-6">
            <label htmlFor="course-des" className="font-medium text-xl mb-3">Course description</label>
            <textarea onChange={handleChange} name={"des"} value={formData.des} id="course-des" type="text" className="resize-none  placeholder:text-grey bg-light-gray text-sm  min-h-[200px]  dark:bg-main-dark rounded-xl p-3" placeholder="Short description about your course "></textarea>
            <p className="text-grey text-[12px] text-right">{characterLimit - des.length} characters left</p>

        </div>
        <div className="course-category p-5 rounded-2xl dark:bg-secondary-dark bg-white grid mb-6">
            <label htmlFor="course-category" className="font-medium text-xl mb-3">Course category</label>
            <InputBox name={"category"} onChange={handleChange} value={formData.category}  light={"gray"} dark={true} id="course-category" type="text" className="resize-none text-sm  min-h-[200px]  dark:bg-main-dark rounded-xl p-3" placeholder="ex. 'http://tahri/Courses/Sciences-Exactes/Math-and-Info/Computer-Science/Licence/Semestre-6'"></InputBox>
            <p className="text-grey text-sm "> copy and paste the semestres's link of the course here</p>

        </div>
        <div className="course-level p-5 rounded-2xl dark:bg-secondary-dark bg-white grid mb-6">
            <label htmlFor="course-level" className="font-medium text-xl mb-3">Course level</label>
            <InputBox name={"level"} onChange={handleChange} value={formData.level}  light={"gray"} dark={true} id="course-level" type="text" className="resize-none text-sm  min-h-[200px]  dark:bg-main-dark rounded-xl p-3" placeholder="ex. Licence 2"></InputBox>
            {/* <p className="text-grey text-sm "> copy and paste the semestres's link of the course here</p> */}

        </div>
        </div>
        <div className="course-chapters">
        
        
        <div className="mt-5 mb-5 course-topics p-5 rounded-2xl dark:bg-secondary-dark bg-white  ">
                    <p className="text-grey">Topics - ( Helps in Searching and ranking your Course post )</p>
                    <div className=" bg-light-gray dark:bg-main-dark p-3 rounded-2xl mt-3">
                        <input name={"tags"} type="text" placeholder="Topic" className="sticky  w-full h-full  dark:bg-secondary-dark p-4  rounded-xl text-sm placeholder:text-sm" onKeyDown={handleKeyDown}/>
                        {tags.map((tag,i)=>
                        {return <CourseTag tag={tag} tagsIndex={i} key={i}/>})}
                    </div>
                        <p className="text-grey text-[12px] text-right mt-2">{tagLimit - tags.length} tags left</p>
                </div>
        <div className="course-des p-5 rounded-2xl dark:bg-secondary-dark bg-white grid mb-6">
            <div className="flex justify-between items-center mb-3">
            <label htmlFor="course-des" className="font-medium text-xl ">Course Chapters</label>
            <button className="rounded-full py-2 px-4 text-sm  bg-main-dark dark:bg-white dark:text-black text-white  font-medium" onClick={ (e)=> {
                e.preventDefault();
                setChapterState(prev=> prev = true);
                
            }
                 }>Add chapter</button>

            </div>
            <ChapterForm />
        </div>
        </div>
    </form>
        
    </div>
    </> );
}
 
export default CreateCourse;