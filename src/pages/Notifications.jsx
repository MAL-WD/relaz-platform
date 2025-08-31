import { Toaster } from "react-hot-toast";
import AnimationWrapper from "../components/AnimationWrapper";
import { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from '../contexts/ContextProvider';
import filterPaginationData from "../components/FilterPaginationData";
import NotificationCard from "../components/NotificationCard";
import NoDataMsg from "../components/NoDataMsg";
import LoadMoreDataBtn from "../components/LoadMoreDataBtn";

const Notifications = () => {
    const [loading,setLoading]=useState(false)
    const [filter,setFilter]=useState("all")
    const [notifications,setNotifications]=useState(null)
    let filters=['all','like','comment','reply']
  const {userAuth,setUserAuth,userAuth:{access_token,new_notification_available} } = useStateContext();
    
    const fetchNotifications=({page,deletedDocCount=0})=>{
        axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/notifications",{page,filter,deletedDocCount},{
            headers:{
                'Authorization':`Bearer ${access_token}`
            }
        })
        .then(async ({data:{notifications:data}})=>{
            if (new_notification_available) {
                setUserAuth({...userAuth,new_notification_available:false})
            }
            let formatedData=await filterPaginationData({
                state:notifications,
                data,page,
                countRoute:"/all-notifications-count",
                dataToSend:{filter},
                user:access_token
            })
            setNotifications(formatedData)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        if (access_token) {
            fetchNotifications({page:1})
        }
    },[access_token,filter])
    const handleFilter = (e)=>{

        let btn =e.target
        setFilter(btn.innerHTML)
        setNotifications(null)
    }
    return ( <>
    <AnimationWrapper>
        <Toaster/>
        {
            loading?"Loading...":
            <section className=' mt-20 dark:bg-main-dark bg-light-gray  px-20'>

                <h1 className='main-title pl-1 text-6xl my-4  font-semibold  dark:text-gray-200 text-black dark:text-white'>Notifications</h1>
                <div className="my-8 flex gap-4 ">
            {

                    filters.map((filterName,i)=>{
                        return <button onClick={handleFilter} key={i} className={"py-2 font-medium px-6 text-lg capitalize  dark:bg-secondary-dark  rounded-full  "+(filter==filterName?" dark:bg-white text-white bg-black dark:text-black dark:text-black":"bg-light-gray dark:bg-main-dark dark:text-white")}>{filterName}</button>
                    })
            }
                </div>
                {notifications==null?"Loading...":
                <>
                    {
                        notifications.results.length?
                        notifications.results.map((notification,i)=>{
                            return <AnimationWrapper key={i} transition={{delay:i*0.08}}>
                                <NotificationCard data={notification} index={i} notificationState={{notifications,setNotifications}}/>
                            </AnimationWrapper>
                        }):<NoDataMsg message={"Nothing available"}/>
                    }
                    <LoadMoreDataBtn state={notifications} fetchDataFun={fetchNotifications} additionalParam={{deletedDocCount:notifications.deletedDocCount}}/>
                </>}
            </section>
            }
            </AnimationWrapper>
    </> );
}
 
export default Notifications;