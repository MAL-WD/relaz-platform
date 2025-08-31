import { NavLink, Navigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import { useRef, useState } from 'react';
import ArticleSvg from '../components svgs/ArticleSvg';
import notification from '../data/notification.svg';
import NotificationSvg from '../components svgs/NotificationSvg';
import AnimationWrapper from '../components/AnimationWrapper';
import InputBox from '../components/InputBox';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const ChangePassword = () => {
  const{userAuth:{access_token}}=useStateContext()
    let changePasswordForm=useRef()
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

    const handleSubmit =(e)=>{
        e.preventDefault()
        let formData={}
        let form = new FormData(changePasswordForm.current)
        for(let[key,value] of form.entries()){
            formData[key]=value
        }
        let {currentPassword,newPassword}=formData
        if(!currentPassword.length || !newPassword.length){
           return toast.error("Fill all the inputs to continue")
        }
        if (!passwordRegex.test(currentPassword)|| !passwordRegex.test(newPassword)) {
            return toast.error("Password should be 6 to 20 character long with a numeric and 1 uppercase letter")
            
        }
        e.target.setAttribute("disabled",true)
        let loadingToast=toast.loading("Updating...")
        axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/change-password",formData,{
            headers:{
                'Authorization':`Bearer ${access_token}`
            }
        })
        .then(()=>{
            toast.dismiss(loadingToast)
            e.target.removeAttribute("disabled")
            return toast.success("Password Updated")
        })
        .catch(({response})=>{
            toast.dismiss(loadingToast)
            e.target.removeAttribute("disabled")
            return toast.error(response.data.error)

        })
    }
    return ( 
    access_token===null ?<Navigate to="/sign-in"/>:
    <>  
    <AnimationWrapper>
        <Toaster/>
        <section className=' max-md:px-4 px-20 bg-light-gray dark:bg-main-dark '>

        <h1 className='main-title max-md:text-4xl pl-1 text-6xl my-4  font-semibold  dark:bg-main-dark text-black dark:text-white'>Password Settings</h1>
        <form ref={changePasswordForm} className='mt-6 py-10  justify-center w-full md:max-w-[400px]'>
            <InputBox name={"currentPassword"} type={"password"} placeholder={"Current Password"}/>
            <InputBox name={"newPassword"} type={"password"} placeholder={"New Password"}/>
            <button onClick={handleSubmit} className="rounded-full mt-2 block font-medium px-8 p-4 bg-main-dark dark:bg-white dark:text-black  text-white">Change Password</button>
            {/* <div className="sticky top-[80%] z-30">
                <div className='min-w-[200px] h-cover md:sticky top-24 overflow-y-auto p-6 md:pr-0'>
                    <h1 className="text-xl text-dark-gray mb-3">Settings</h1>
                    <hr className='border-light-gray -ml-6 mb-8 mr-6'/>
                    <NavLink className="flex items-center gap-3 text-[15px] text-grey my-7" to="/" onClick={(e)=>setPageState(e.target.innerText)}> <ArticleSvg/> Blogs</NavLink>
                    <NavLink className="flex items-center gap-3 text-[15px] text-grey my-7" to="/" onClick={(e)=>setPageState(e.target.innerText)}> <NotificationSvg fill="#777"/> Notification</NavLink>
                </div>
            </div> */}
        </form>
        </section>
    </AnimationWrapper>

    </> );
}
 
export default ChangePassword;