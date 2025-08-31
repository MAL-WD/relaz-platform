import { useContext, useState } from "react";
import { useStateContext } from '../contexts/ContextProvider';
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { BlogContext } from "../pages/BlogPage";

const CommentsField = ({action,index=undefined,replyingTo=undefined,setReplying}) => {
    let{blog,setBlog,blog:{_id,author:{_id:blog_author},comments,comments:{results:commentsArr},activity,activity:{total_comments,total_perent_comments}},setTotalParentCommentsLoaded}=useContext(BlogContext)
  const { userAuth:{access_token,username,fullname,profile_img} } = useStateContext();
    
    const [comment,setComment]=useState("")
    const handleComment = ()=>{
        if (!access_token) {
            return toast.error("Login First to leave a comment")
        }
        if (!comment.length) {
            return toast.error("Write something to leave a comment")
            
        }
        axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/add-comment",{
            _id,blog_author,comment,replying_to:replyingTo
        },{
            headers:{
                'Authorization':`Bearer ${access_token}`
            }
        })
        .then(({data})=>{
            console.log(data)
            setComment("")
            data.commented_by={personal_info:{username,profile_img,fullname}}
            let newCommentArr;
            if (replyingTo) {
                    commentsArr[index].children.push(data._id)
                    data.childrenLevel=commentsArr[index].childrenLevel+1
                    data.perentIndex=index
                    commentsArr[index].isReplyLoaded=true
                    commentsArr.splice(index+1,0,data)
                    newCommentArr=commentsArr
                    setReplying(false)
            }else{

                data.childrenLevel=0;
                newCommentArr=[data,...commentsArr]
            }
            let perentCommentIncrementval=replyingTo?0:1;
            setBlog({...blog, comments : {...comments,results:newCommentArr},activity:{...activity,total_comments:total_comments+1,total_perent_comments:total_perent_comments+perentCommentIncrementval}})
            setTotalParentCommentsLoaded(prev=>prev+perentCommentIncrementval)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
    return ( <>
        <Toaster/>
        <textarea onChange={(e)=>setComment(e.target.value)} value={comment} placeholder="Share your thoughts..." className="mt-4 w-full resize-none h-[150px] overflow-auto p-5 dark:text-white bg-light-gray dark:bg-secondary-dark rounded-lg placeholder:text-[15px]" name="" id=""></textarea>
        <button onClick={handleComment} className="rounded-full bg-main-dark mt-5 dark:bg-white dark:text-black font-medium  hover:bg-main-dark/80 px-7 p-3">{action}</button>
    </> );
}
 
export default CommentsField;