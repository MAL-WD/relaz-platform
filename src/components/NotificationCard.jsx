import P from "@editorjs/image";
import { Link } from "react-router-dom";
import { getDay } from "../common/date";
import { useState } from "react";
import NotificationCommentField from "./NotificationCommentField";
import { useStateContext } from '../contexts/ContextProvider';
import axios from "axios";

const NotificationCard = ({data,index,notificationState}) => {
    let {seen,type,reply,createdAt,comment,replied_on_comment,user,user:{personal_info:{fullname,username,profile_img}},blog:{_id,blog_id,title},_id:notification_id}=data
    let [isReplying,setReplying]=useState(false)
  const {userAuth:{username:author_username,profile_img:author_profile_img,access_token}, currentColor,userAuth,setIsClicked,initialState } = useStateContext();
    let {notifications,notifications:{results,totalDocs},setNotifications}=notificationState
    const handleReplyClick=()=>{
        setReplying(prev=>!prev)
    }
    const handleDelete = (comment_id,type,target)=>{
        target.setAttribute("disabled",true)
        axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/delete-comment",{_id:comment_id},{
            headers:{
                'Authorization':`Bearer ${access_token}`
            }
        })
        .then(()=>{
            if (type=='comment') {
                results.splice(index,1)
            }else{
                delete results[index].reply
            }
            target.removeAttribute("disabled")
            setNotifications({...notifications,results,totalDocs:totalDocs-1,deleteDocCount:notifications.deleteDocCount+1})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return ( 
    <div className={"p-6 shadow dark:bg-secondary-dark bg-white rounded-2xl my-4   "+(!seen?"border-l-2":"")} style={{borderLeftColor:currentColor}}>
        <div className="flex gap-5 mb-3">
            <img src={profile_img} className="w-14 h-14 flex-none rounded-full" alt="" />
            <div className="w-full">
                <h2 className="font-medium text-dark-gray flex items-center">
                    {/* <span className="lg:inline-block hidden capitalize ">{fullname}</span> */}
                    <Link className="mr-2 underline text-lg dark:text-white text-black dark:text-white" to={`/user/${username}`}>@{username}</Link>
                    <span className="font-noraml text-grey">
                        {type=='like'?"Liked your blog":
                        type=='comment'?"commented on":
                        "replied on This"
                        }

                    </span>
                </h2>
                {
                    type=="reply"?
                    <div className="p-4 mt-4 rounded-xl  bg-light-gray dark:bg-main-dark text-black dark:text-white dark:text-white">
                        <p>{replied_on_comment.comment}</p>
                    </div>
                    :
                    <Link className="text-dark-gray dark:text-gray-100 py-2 font-medium text-lg hover:underline line-clamp-1" to={`/blog/${blog_id}`}>
                        {`"${title}"`}
                    </Link>

                }
            </div>
        </div>
        {
            type!='like'?
            <p className="ml-14 pl-5 font-editor text-black dark:text-white dark:text-white text-xl my-4">{comment.comment}</p>:
            ""
        }
        <div className="ml-14 pl-5 mt-3 text-grey flex gap-8">
            <p>{getDay(createdAt)}</p>
            {
                type!='like'?
                <>
                    {
                       !reply?
                       <button className="underline hover:text-gray-300" onClick={handleReplyClick}>Reply</button>:""
                    }
                    <button onClick={(e)=>handleDelete(reply._id,"comment",e.target)} className="underline text-red hover:text-gray-300">Delete</button>
                </>:""
            }
        </div>
        {isReplying?
        <div className="mt-8">
            <NotificationCommentField _id={_id} index={index} replyingTo={comment._id} setReplying={setReplying} notification_id={notification_id} notificationData={notificationState} blog_author={user}/>
        </div>   :"" 
    }
    {
        reply?
        <div className="ml-20 p-5 my-4 bg-light-gray rounded-md">
            <div className="flex gap-3 mb-3">
                <img className="w-8 h-8 rounded-full" src={author_profile_img} alt="" />
                <div className="">
                    <h2 className="font-medium  text-grey">
                        <Link className="mx-2 text-black dark:text-white dark:text-white" to={`/user/${author_username}`}>@{author_username}</Link>
                        <span className="font-noraml">replied to</span>
                        <Link className="mx-2 text-black dark:text-white dark:text-white" to={`/user/${username}`}>@{username}</Link>

                    </h2>
                </div>
            </div>
            <p className="ml-14 font-editor text-black dark:text-white dark:text-gray-200 text-lg my-2">{reply.comment}</p>
            <button onClick={(e)=>handleDelete(comment._id,"reply",e.target)} className="underline ml-14 mt-2 text-red hover:text-gray-300">Delete</button>

        </div>:""
    }
    </div> );
}
 
export default NotificationCard;