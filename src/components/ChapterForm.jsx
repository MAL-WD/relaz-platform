import { useContext, useEffect, useState } from "react";
import InputBox from "./InputBox";
import { CourseContext } from "../pages/CourseEditor";
import toast, { Toaster } from "react-hot-toast";
import  { UploadFile } from "../common/aws";
import fileWhite from "../data/file-white.svg"
import { useNavigate } from "react-router-dom";
let chapterStracture = {
    chapter_title:'',
    chapter_des:'',
    chapter_content:'',

}
const ChapterForm = () => {
    const [formChapter, setFormChapter] = useState(chapterStracture);
    const [file, setFile] = useState({
        title:"",
        type:'',
        size:''
    });
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    let {course,course:{content},setCourse,ChapterState,setChapterState}=useContext(CourseContext)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormChapter({
          ...formChapter,
          [name]: value
        });
      };
      const formatFileSize = (size) => {
        if (size < 1024) {
          return `${size} bytes`;
        } else if (size < 1024 * 1024) {
          return `${(size / 1024).toFixed(2)} KB`;
        } else if (size < 1024 * 1024 * 1024) {
          return `${(size / (1024 * 1024)).toFixed(2)} MB`;
        } else {
          return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
        }
      };
      
      const handleFileUpload = (e)=>{
        let file = e.target.files[0]
        console.log(file)
        if(file){
            
            let loadingToast=toast.loading("Uploading...")
            UploadFile(file).then((url)=>{
                console.log(url)
                if (url) {
                    // courseImageref.current.src=url
                    setFormChapter({
                        ...formChapter,
                        chapter_content: url
                    });
                    setFile({
                        title: url.name,
                        type: url.type,
                        size: url.size,
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
    useEffect(() => {
        if (formChapter.chapter_content) {
            setCourse((prevCourse) => ({
                ...prevCourse,
                content: [...prevCourse.content, formChapter]
            }));
            setFile({
                title: formChapter.chapter_content.name,
                type: formChapter.chapter_content.type,
                size: formChapter.chapter_content.size,
              });
            console.log(course);
            console.log(file)

        }
    }, [formChapter.chapter_content]);
    const handleAddChapter=()=>{
        setChapterState(false)
        // setCourse({...course,content:[...content,formChapter]})
        

    }
    return ( <>
    <Toaster/>
    {
        ChapterState?
        <form>

        <InputBox name={"chapter_title"} onChange={handleChange} value={formChapter.chapter_title}  light={"gray"} dark={true} id="chapter-title" type="text" className="resize-none text-sm  min-h-[200px]  dark:bg-main-dark rounded-xl p-3" placeholder="chapter Title"></InputBox>
        <textarea name={"chapter_des"} onChange={handleChange} value={formChapter.chapter_des} id="course-des" type="text" className="resize-none w-full placeholder:text-grey bg-light-gray text-sm  min-h-[150px]  dark:bg-main-dark rounded-xl p-3" placeholder="chapter description"></textarea>
        <label htmlFor="chapter-content">
        <div className="bg-light-gray w-full rounded-xl mt-2 text-main-dark text-center font-medium p-4">Upload any type of Files</div>
        <input name={"chapter_content"} onChange={handleFileUpload} id="chapter-content" type="file" multiple accept="image/*,video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" hidden/>
        </label>
        {/* <div className="rounded-xl p-4 gap-3 bg-light-gray flex">
            <img src={fileWhite} className="w-10 h-10  rounded-ful" alt="" />
            <div className="file-info">
            <h4 className="text-lg font-medium text-gray-700 ">Title:{file.title}</h4>
            <p className="text-sm text-grey">Type :{file.type}</p>
            <div className="file-size">
            {formatFileSize(file.size)}
            </div>
            </div>
        </div> */}
        <button onClick={handleAddChapter} className="bg-main-dark text-white p-2 px-4  rounded-full ml-auto block mt-3">Add</button>
        </form>:""

    }
    </> );
}
 
export default ChapterForm;