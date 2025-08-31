import { useState } from "react";
import { Toaster,toast } from "react-hot-toast";
import { useStateContext } from '../contexts/ContextProvider';
import axios from "axios";

const NotificationCommentField = ({_id,blog_author,index=undefined,replyingTo=undefined,setReplying,notification_id,notificationData}) => {
    let [comment,setComment]=useState('')
    let {_id:user_id}=blog_author
  const {userAuth:{access_token,new_notification_available},setUserAuth, currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize,userAuth,setIsClicked,initialState } = useStateContext();
    let {notifications,notifications:{results},setNotifications}=notificationData
    const handleComment = ()=>{
       
        if (!comment.length) {
            return toast.error("Write something to leave a comment")
            
        }
        axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/add-comment",{
            _id,blog_author:user_id,comment,replying_to:replyingTo,notification_id
        },{
            headers:{
                'Authorization':`Bearer ${access_token}`
            }
        })
        .then(({data})=>{
             setReplying(false)
             results[index].reply={comment,_id:data._id}
             setNotifications({...notifications,results})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return ( <>
        <Toaster/>
        <textarea onChange={(e)=>setComment(e.target.value)} value={comment} placeholder="Leave a Reply..." className="mt-4 w-full resize-none h-[150px] overflow-auto p-5 bg-light-gray dark:bg-main-dark text-black dark:text-white dark:text-white rounded-lg placeholder:text-[15px]" name="" id=""></textarea>
        <button onClick={handleComment} className="rounded-full bg-main-dark mt-5 text-white hover:bg-main-dark/80 px-7 p-3">
            Reply
        </button>
    </> );
}
 
export default NotificationCommentField;