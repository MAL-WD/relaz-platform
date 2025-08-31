import React, { useContext, useRef, useState } from "react"
import InputBox from "./InputBox"
import googleIcon from "../data/google.svg"
import { Link, Navigate } from "react-router-dom"
import AnimationWrapper from "./AnimationWrapper"
import {Toaster,toast} from "react-hot-toast"
import axios from "axios"
import { storeInSession } from "./sessions"
import { useStateContext } from "../contexts/ContextProvider"
import {ContextProvider} from "../contexts/ContextProvider"
import {authWithGoogle} from '../common/firebase'
const UserAuthForm =({type})=>{
    const[fullname,setFullname]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
  const {userAuth,setUserAuth } = useStateContext();
//   console.log("nikmok" + userAuth.access_token)
const [teacher, setTeacher] = useState(false);

const handleRoleChange = (e) => {
    setTeacher(!teacher);
};
    const userAuthtoServer=(serverRoute,formData)=>{
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute,formData)
        .then(({data})=>
            {storeInSession("user",JSON.stringify(data))
                console.log(sessionStorage)
                setUserAuth(data)

            })
        .catch(({response})=>{
             if (response && response.data && response.data.error) {
                toast.error(response.data.error); // Display the error message
            } else {
                toast.error("An unknown error occurred"); // Fallback error message
            }
            console.log(response)
        })
    } 
    const handleSubmit = (e)=>{
        e.preventDefault()
        let serverRoute = type=="sign-in"?"/Sign-in":"/Sign-up"
        // const fullname = authForm.current.fullname.value
        // const email = authForm.current.email.value
        // const password = authForm.current.password.value
        // setFormInfo({fullname,email,password})
        // console.log(formInfo)
        // form data
        let formData=type=="sign-in"? {email,password}:{fullname,email,password,teacher};

      
        console.log(formData)
        // form validation
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
        // let {fullname,email,password} = formData
        if(fullname){
            if(fullname.length < 4){
                return toast.error("Full name must be at least 4 letters long")
            }
        }
        if(!email.length){
            return toast.error("Email is required")
        }
        if(!emailRegex.test(email)){
            return toast.error("Email is invalid")
        }
        if(!passwordRegex.test(password)){
            return toast.error("Password should have [6-20] characters with an uppercase and a numeric letter")
        }
        userAuthtoServer(serverRoute,formData)
    }
    const handleGoogleAuth=(e)=>{
        e.preventDefault()
        authWithGoogle().then((user)=>{
            let serverRoute="/google-auth"
            let formData = {
                access_token:user.access_token

            }
            userAuthtoServer(serverRoute,formData)
        }).catch(err=>{toast.error("trouble login through google")
            console.log(err)
        })
    }
    return(
userAuth.access_token? <Navigate to="/" />:
        <AnimationWrapper keyValue={type}>

        <section className="flex bg-light-gray dark:bg-main-dark text-black dark:text-white dark:text-white items-center justify-center mt-20 ">
            <Toaster />
            <form id="form"  onSubmit={handleSubmit}  className="w-[90%] max-w-[500px]">
                <h1 className="text-6xl max-md:text-4xl mt-6 capatalize text-center font-semibold mb-16">
                    {type =="sign-in" ?"Welcome Back !":"Join Us Today"}
                </h1>
                {type!=="sign-in"&& <InputBox type={"text"} placeholder={"Enter your Name"} value={fullname} onChange={(e)=>setFullname(e.target.value)}/>}
                <InputBox type={"email"} placeholder={"Enter your Email"} value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <InputBox type={"password"} placeholder={"Enter your Password"} value={password} onChange={(e)=>setPassword(e.target.value)}/>
                {type !=="sign-in"?<div className="RadioBox mt-8 flex justify-evenly">
                <div className="flex items-center">
                        <input
                        type="radio"
                        id="student"
                        name="role"
                        value="Student"
                        checked={teacher === false}
                        onChange={handleRoleChange}
                        className="form-radio h-6  w-6  text-blue-600"
                        />
                        <label htmlFor="student" className="ml-2 font-medium dark:text-white text-black text-lg">
                        Student
                        </label>
                            </div>
                    <div className="flex items-center mb-2">
                        <input
                        type="radio"
                        id="teacher"
                        name="role"
                        value="Teacher"
                        checked={teacher === true}
                        onChange={handleRoleChange}
                        className="form-radio h-6  w-6  text-blue-600"
                        />
                        <label htmlFor="teacher" className="ml-2 text-black dark:text-white font-medium text-lg ">
                        Teacher
                        </label>
                    </div>
                    
                </div>:""}
                <button className="flex justify-center items-center mx-auto mt-14 bg-main-dark dark:bg-white dark:text-black font-medium text-white capitalize px-8 py-3  rounded-3xl hover:bg-opacity-90 " >{type.replace("-"," ")}</button>
                <div className="reltaive w-full flex items-center gap-2 mt-4 mb-6 opacity-10 uppercase text-dark-gray dark:text-gray-200 font-bold">
                    <hr className="w-1/2 border-gray-600 dark:secondary-dark" />
                    <p className="text-dark-gray">or</p>
                    <hr className="w-1/2 border-gray-600 dark:secondary-dark" />
                </div>
                <button onClick={handleGoogleAuth} className="flex justify-center items-center mx-auto mt-3  bg-main-dark dark:bg-white dark:text-black  font-medium text-white capitalize px-12 py-3 rounded-3xl hover:bg-opacity-90  gap-3">
                    <img className="w-6" src={googleIcon} alt="" />
                    Continue with google
                    </button>
                {type =="sign-in"?
                <p className="mt-6 text-grey  mx-auto flex justify-center">Don't have an Account?
                    <Link to="/sign-up" className="underline text-black dark:text-white dark:text-gray-100  ml-2">Join us Today</Link>
                </p>
                :<p className="mt-6 text-grey  mx-auto flex justify-center">have already an Account?
                <Link to="/sign-in" className="underline text-black dark:text-white dark:text-gray-100   ml-2">Sign in Here.</Link>
            </p>}
            </form>
        </section>
        </AnimationWrapper>

    )
}
export default UserAuthForm