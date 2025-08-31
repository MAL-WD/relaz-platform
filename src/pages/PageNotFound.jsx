import { Link } from "react-router-dom";
import PageError from "../data/404.jpg"
import logo from "../data/logo.svg"
const PageNotFound = () => {
    return ( <>
    <section className="h-cover reltaive p-10 dark:bg-main-dark dark:text-white  flex flex-col items-center gap-16 text-center">
        <img src={PageError} className="select-none border-2 border-light-gray w-72 aspect-square object-cover rounded-2xl" alt="" />
        <h2 className="font-semibold my-2 text-6xl leading-7 ">Page Not Found</h2>
        <p className="text-black dark:text-white dark:text-white   leading-7 -mt-8">the page you are looking for does not exists, Make Sure your link is correct <br /> Go Back to <Link to={"/"} className="font-semibold underline text-blue-500"> Home Page</Link></p>
        {/* <div className="mt-auto">
            <div className="flex items-center gap-5 mx-auto justify-center">
            <img src={logo} alt="" className="h-8 object-contain block  select-none" />
            <h2 className="font-semibold text-2xl">E-Learning Platform</h2>
            </div>

            <p className="mt-5 text-gray-300">Read More,Learn More, Solve More</p>
        </div> */}
         </section>
    </> );
}
 
export default PageNotFound;