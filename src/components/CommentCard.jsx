import toast, { Toaster } from "react-hot-toast";
import { getDay, getFullDay } from "../common/date";
import { useStateContext } from '../contexts/ContextProvider';
import CommentsField from "./CommentField";
import { useContext, useState } from "react";
import CommentSvg from "../components svgs/CommentSvg";
import { BlogContext } from "../pages/BlogPage";
import axios from "axios";
import DeleteSvg from "../components svgs/DeleteSvg";

const CommentCard = ({index,leftVal,commentData}) => {
 let{commented_by:{personal_info:{profile_img,fullname,username:commented_by_username}},commentedAt,comment,_id,children}=commentData
 const { userAuth:{access_token,username} } = useStateContext();
 let{blog,blog:{activity,activity:{total_parent_comments},comments,comments:{results:commentArr},author:{personal_info:{username:blog_author}}},setBlog,setTotalParentCommentsLoaded}=useContext(BlogContext)
 const[isReplying,setReplying]=useState(false)
    const getParentIndex= ()=>{
        let startingPoint = index-1
        try{
            while(commentArr[startingPoint].childrenLevel>=commentData.childrenLevel){
                startingPoint--
            }
        }catch{
            startingPoint=undefined
        }
        return startingPoint
    }
    const removeCommentsCards = (startingPoint,isDelete=false)=>{
        if (commentArr[startingPoint]) {
            while(commentArr[startingPoint].childrenLevel>commentData.childrenLevel){
            commentArr.splice(startingPoint,1)
            if (!commentArr[startingPoint]) {
                break;
            }
        }
    }
    if(isDelete){
        let parentIndex=getParentIndex()
        if(parentIndex!=undefined){
            commentArr[parentIndex].children=commentArr
            [parentIndex].children.filter(child=>child!=_id)
            if(!commentArr[parentIndex].children.length){
                commentArr[parentIndex].isReplyLoaded=false
            }
        }
        commentArr.splice(index,1)
    }
    if(commentData.childrenLevel==0&&isDelete){
        setTotalParentCommentsLoaded(pre=>pre-1)
    }
    setBlog({...blog,comments:{results:commentArr},activity:{...activity,total_parent_comments:total_parent_comments-(commentData.childrenLevel==0&&isDelete?1:0)}})
}
    const loadReplies = ({skip=0,currentIndex=index})=>{
        if (commentArr[currentIndex].children.length){
            hideReplies()
            axios.post(import.meta.env.VITE_SERVER_DOMAIN +"/get-replies",{_id:commentArr[currentIndex]._id,skip})
            .then(({data:{replies}})=>{

                commentData.isReplyLoaded=true
                // console.log(commentData.isReplyLoaded)
                for (let i = 0; i <replies.length; i++) {
                    replies[i].childrenLevel=commentArr[currentIndex].childrenLevel+1
                    commentArr.splice(currentIndex+1+i+skip,0,replies[i])

                    
                }
                setBlog({...blog,comments:{...comments,results:commentArr}})

            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
    const hideReplies = ()=>{

        commentData.isReplyLoaded=false
        removeCommentsCards(index+1)
    }
    const handleReplyClick = ()=>{
        if (!access_token) {
            return toast.error("Login first to leave a reply")
        }
        setReplying(prev=>!prev)
    }
    const deleteComment  = (e)=>{
        e.target.setAttribute("disabled",true)
        axios.post(import.meta.env.VITE_SERVER_DOMAIN +"/delete-comment",{_id},{
            headers:{
                'Authorization':`Bearer ${access_token}`
            }
        })
        .then(()=>{
            e.target.removeAttribute("disabled")
            removeCommentsCards(index+1,true)
        })
        .catch(err=>console.log(err))
        
    }
    const LoadMoreReplies=()=>{
        let parentIndex=getParentIndex()
        let button= <button onClick={()=>loadReplies({skip:index-parentIndex,currentIndex:parentIndex})} className="text-sm text-dark-gray p-2 px-3 hover:bg-gray-500/30 rounded-md flex items-center gap-2 mt-3">Load More Replies</button>
        if(commentArr[index+1]){
            if(commentArr[index+1].childrenLevel<commentArr[index].childrenLevel){

                if((index-parentIndex)<commentArr[parentIndex].children.length){

                    return button
                }
            }
        }else{
            if (parentIndex) {
                if((index-parentIndex)<commentArr[parentIndex].children.length){

                    return button
                }
            }
        }
    }
    return ( 
        <>
        
            <div className={"w-full h-12 bg-white dark:bg-main-dark  my-5 " + isReplying?" ":""} style={{paddingLeft:`${leftVal*10}px`}}>
                <div className="my-5  p-6 rounded-xl border border-light-gray dark:border-dark-gray"  >
                    <div className="flex gap-3 items-center mb-4">
                        <img src={profile_img} className="w-6 h-6 rounded-full" alt="" />
                        <p className="line-clamp-1 text-sm text-grey dark:text-gray-300"> @{commented_by_username }</p>
                        <p className="min-w-fit text-sm text-grey dark:text-gray-400">{getFullDay(commentedAt)}</p>
                    </div>
                    <p className="font- text-lg text-black dark:text-white ml-3 text-grey">{comment}</p>
                    <div className="flex gap-5 items-center mt-4 ml-3">
                        {   
                            commentData.isReplyLoaded?
                            <button onClick={hideReplies} className="text-grey dark:text-gray-200 p-2 px-3 text-sm rounded-md flex items-center gap-2"><CommentSvg fill={"#eee"}/> Hide Replies</button>   
                            :
                            <button onClick={loadReplies} className="text-grey dark:text-gray-200 p-2 px-3 text-sm rounded-md flex items-center gap-2"><CommentSvg fill={"#eee"}/> {children.length} {children.length==1?"Reply":"Replies"}</button>   
                        }
                        <button onClick={handleReplyClick} className="dark:text-gray-200 underline">Reply</button>
                        {username==commented_by_username||username==blog_author?
                        <button onClick={deleteComment} className="ml-auto p-2 px-3 rounded-lg border border-light-gray dark:border-dark-gray hover:bg-red/40 items-center"><DeleteSvg className={"text-blue"} fill={"#ff4e4e"}/></button>    
                        :""
                    }
                    </div>
                    {isReplying?
                    <div className="mt-8">
                        <CommentsField action={"reply"} index={index} replyingTo={_id} setReplying={setReplying}/>
                    </div>
                    :""
                }
                </div>
                <LoadMoreReplies/>
            </div>
        </>
     );
}
 
export default CommentCard;