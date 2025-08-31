import { NavLink, Navigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import { useEffect, useRef, useState } from 'react';
import ArticleSvg from '../components svgs/ArticleSvg';
import notification from '../data/notification.svg';
import NotificationSvg from '../components svgs/NotificationSvg';
import AnimationWrapper from '../components/AnimationWrapper';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { profileDataStracture } from './ProfilePage';
import InputBox from '../components/InputBox';
import youtube from "../data/youtube.svg"
import facebook from "../data/facebook.svg"
import instagram from "../data/instagram.svg"
import github from "../data/github.svg"
import twitter from "../data/twitter.svg"
import website from "../data/link.svg"
import {UploadFile, UploadImage} from '../common/aws';
import { storeInSession } from '../components/sessions';
import ChangePassword from './ChangePassword';

const EditProfile = () => {
  let{userAuth,userAuth:{access_token},setUserAuth}=useStateContext()
  const[profile,setProfile]=useState(profileDataStracture)
  const[loading,setLoading]=useState(true)
  const bioLimit=200
  const links = [youtube,facebook,twitter,github,instagram,website]
    let profileImage= useRef()
    let[updatedProfileImg,setUpdatedProfileImg]=useState(null)
  const[charactersLeft,setCharactersLeft]=useState(bioLimit)
  let {personal_info:{username:profile_username,fullname,profile_img,email,bio},social_links}=profile
    let editProfileForm=useRef()      
  
//   console.log(userAuth)

    // console.log(profile)
    useEffect(()=>{
        if (access_token) {
            axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/get-profile",{username:userAuth.username})
            .then(({data})=>{
                // console.log(data)
                setProfile(data)
                setLoading(false)
        })
        .catch(err=>{
            console.log(err)
        })
        }
    },[access_token])    
    const handleCharacterChange = (e)=>{
        setCharactersLeft(bioLimit-e.target.value.length)
    }
    const handleImagePreview = (e)=>{
        let img =e.target.files[0]
        profileImage.current.src=URL.createObjectURL(img)
        setUpdatedProfileImg(img)
    }
    const handleImageUpload = (e)=>{
        e.preventDefault()
        if (updatedProfileImg) {
            let loadingToast=toast.loading("Uploading..")
            e.target.setAttribute("disabled",true)
            UploadFile(updatedProfileImg)
            .then(url=>{
                console.log(url)
                if (url) {
                    axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/update-profile-img",{url},{
                        headers:{
                            'Authorization':`Bearer ${access_token}`

                        }
                    })
                    .then(({data})=>{
                        console.log(data)
                        console.log(data.profile_img)
                        let newUserAuth={...userAuth,profile_img:data.profile_img}
                        console.log(newUserAuth)
                        storeInSession("user",JSON.stringify(newUserAuth))
                        setUserAuth(newUserAuth)
                        setUpdatedProfileImg(null)
                        toast.dismiss(loadingToast)
                        e.target.removeAttribute("disabled")
                        toast.success("Uploaded 👍")
                    })
                    .catch(({response})=>{
                        toast.dismiss(loadingToast)
                        e.target.removeAttribute("disabled")
                        toast.error(response.data.error)

                    })

                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
        
    }
    const handleSubmit =(e)=>{
        e.preventDefault()
        let form = new FormData(editProfileForm.current)
        let formData={}
        for(let [key,value] of form.entries()){
            formData[key]=value
        }
        let{username,bio,youtube,facebook,twitter,github,instagram,website}=formData
        if(username.length<5){
            return toast.error("username should be at least 5 letter long")

        }
        if(bio.length>bioLimit){
            return toast.error(`Bio should not be more than ${bioLimit}`)

        }
        let loadingToast=toast.loading("Updating.....")
        e.target.setAttribute("disabled",true)
        axios.post(import.meta.env.VITE_SERVER_DOMAIN+"/update-profile",{username,bio,
            social_links:{youtube,facebook,twitter,github,instagram,website}
        },{
            headers:{
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(({data})=>{
            if (userAuth.username!=data.username) { 
                let newUserAuth={...userAuth,username:data.username}
                storeInSession("user",JSON.stringify(newUserAuth))
                setUserAuth(newUserAuth)
            }
            toast.dismiss(loadingToast)
            e.target.removeAttribute("disabled")
            toast.success("Profile Updated 👍")
        })
        .catch(({response})=>{
            toast.dismiss(loadingToast)
            e.target.removeAttribute("disabled")
            toast.error(response.data.error)

        })
    }
    return ( 
    access_token===null ?<Navigate to="/sign-in"/>:
    <>  
    <AnimationWrapper>
        <Toaster/>
        {
            loading?"Loading...":
            <section className=' mt-20 dark:bg-main-dark bg-light-gray  px-20'>
                <Toaster/>

            <h1 className='main-title pl-1 text-6xl my-4  font-semibold  dark:text-gray-200 text-black dark:text-white'>Edit Profile</h1>
            <form ref={editProfileForm} action="">
                <div className="flex max-md:items-center flex-col lg:flex-row items-start py-10 gap-8 lg:gap-10">
                    <div className="max-lg:grid max-lg:items-center max-lg:self-center max-lg:justify-center">
                        <label className='relative block w-48 h-48 bg-light-gray rounded-full overflow-hidden' htmlFor="uploadImg" id='profileImgLabel'>
                            <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center text-white bg-black/50 opacity-0 hover:opacity-100 cursor-pointer">
                                Upload image
                            </div>
                            <img className='' ref={profileImage} src={profile_img} alt="" />
                        </label>
                        <input  onChange={handleImagePreview} type="file" id='uploadImg'accept='.jpg, .png, .jpeg' hidden/>
                        <button onClick={handleImageUpload} className="rounded-full font-medium  p-4 mt-5 bg-light-gray .text-gray-300-900 .max-lg:center lg:w-full">Upload</button>
                    </div>
                        <div className="w-full mt-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
                                <div>
                                    <InputBox name={"fullname"} type={"text"} value={fullname} placeholder={"Full Name"} disable={true}/>
                                </div>
                                <div>
                                    <InputBox name={"email"} type={"email"} value={email} placeholder={"Email"} disable={true}/>
                                </div>
                            </div>
                                    <InputBox name={"username"} type={"text"} value={profile_username} placeholder={"Username"} />
                                    <p className='text-grey -mt-2 text-sm'>username will be used for search and will be visible to other</p>
                                    <textarea onChange={handleCharacterChange} name="bio" maxLength={bioLimit} defaultValue={bio} className='w-full h-full bg-white dark:text-gray-300 dark:placeholder:text-gray-300 dark:bg-secondary-dark  p-4 relative rounded-xl text-sm placeholder:text-sm bg-light-gray resize-none lg:h-40 h-64 leading-7 mt-5' placeholder='Bio' id=""></textarea>
                                    <p className=' text-grey  text-sm  mb-2'>{charactersLeft } Characters Left</p>
                                    <p className='mt-3 text-black dark:text-white font-semibold text-lg'>Add your Social links below : </p>
                                    <div className="md:grid my-5 md:grid-cols-2 gap-x-6">
                                        {
                                            Object.keys(social_links).map((key,i)=>{
                                                let link =social_links[key]
                                                return <InputBox icon={links[i]} key={i} name={key} type={"text"} value={link} placeholder={"https://"}/>
                                            })
                                        }
                                    </div>
                                        <button onClick={handleSubmit} type='submit' className="bg-main-dark rounded-full ml-auto block px-16 p-4 text-white font-medium hover:bg-main-dark/80">Update</button>
                                    
                     </div>
                </div>
            </form>
            <ChangePassword/>
        </section>

}
    </AnimationWrapper>

    </> );
}
 
export default EditProfile;