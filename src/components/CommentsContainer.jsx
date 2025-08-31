import { useContext } from "react";
import { BlogContext } from "../pages/BlogPage";
import CloseSvg from "../components svgs/CloseSvg"
import CommentsField from "./CommentField";
import axios from "axios";
import NoDataMessage from "../components/NoDataMsg"
import AnimationWrapper from "./AnimationWrapper";
import CommentCard from "./CommentCard";
export const  fetchComments= async ({skip=0,blog_id,setParentCommentCountFun,comment_array=null})=>{
    let res;
     await axios.post(import.meta.env.VITE_SERVER_DOMAIN+ "/get-blog-comments",{blog_id,skip})
     .then(({data})=>{
        data.map((comment)=>{
            comment.childrenLevel=0
        })
        setParentCommentCountFun(prev=>prev+data.length)
        if(comment_array==null){
            res={results:data}
        }else{
            res={results:[...comment_array,...data]}
        }
     })
     .catch(err=>{
        console.log(err)
     })
     return res;
}
const CommentsContainer = () => {
    let{blog,blog:{_id,title,comments:{results:commentsArr},activity:{total_parent_comments}},commentsWrapper,setCommentsWrapper,totalParentCommentsLoaded,setTotalParentCommentsLoaded,setBlog}=useContext(BlogContext)
    console.log(commentsArr)
    const LoadMoreComments =async ()=>{
        let newcommentsArr=await fetchComments({skip:totalParentCommentsLoaded,blog_id:_id,setParentCommentCountFun:setTotalParentCommentsLoaded,comment_array:commentsArr})
        setBlog({...blog,comments:newcommentsArr})
    }

    return ( <>
        <div className={"max-sm:w-full bg-white dark:bg-main-dark fixed " +  (commentsWrapper?"top-0 sm:right-[0%]":"top-[100%] sm:right-[-100%]")+ " duration-700 max-sm:right-0 sm:top-0 w-[40%] h-full z-50 bg-white shadow-2xl p-8 px-12 overflow-y-auto overflow-x-hidden"}>
            <div className="relative">
                <h2 className="text-2xl text-black dark:text-white font-semibold">Comments</h2>
                <p className=" mt-1 w-[70%] text-grey dark:text-gray-300 line-clamp-1">{title}</p>
                <button onClick={()=>setCommentsWrapper(previous=>!previous)} className="absolute top-[0%] right-[0%] flex justify-center items-center w-12 h-12 rounded-full bg-light-gray dark:bg-secondary-dark "><CloseSvg fill={"rgb(75 85 99)"}/> </button>
                <hr className="border-light-gray my-2 mt-4"/>
                <CommentsField action={"Comment"}/>
                {
                    commentsArr&&commentsArr.length?
                    commentsArr.map((comment,i)=>{
                        return    <div className="comment my-5">
                            <AnimationWrapper>
                                <CommentCard index={i} leftVal={comment.childrenLevel*4} commentData={comment}/>

                             </AnimationWrapper>
                    </div>
                    }):<NoDataMessage message="No Comments"/>
                }
                {
                    total_parent_comments>totalParentCommentsLoaded?
                    <button onClick={LoadMoreComments} className="text-dark-gray mt-2 p-3 px-4 hover:bg-light-gray/70 rounded-full  bg-light-gray">Load More</button>:""
                }
            </div>
        </div>
    </> );
}
 
export default CommentsContainer;