import { Link } from "react-router-dom";
import { getDay } from "../common/date";
import LikeSvg from "../components svgs/LikeSvg";

const MinimalCard = ({content,author,blog,index ,sidebar}) => {
    let{publishedAt,tags,title,des,banner,blog_id:id,author:{personal_info:{fullname,username,profile_img}}}= blog
    return ( 
        <Link to={`/blog/${id}`} className="flex gap-8 items-center dark:bg-secondary-dark bg-white p-6 rounded-2xl border-b border-white dark:border-dark-gray pb-5 mb-4">
            <p className="Blog-Index text-gray-300 text-6xl">{index < 10? "0"+(index+1):index} </p>

        <div className="w-full ">
            <div className="flex gap-2 items-center mb-3">
                <img src={profile_img} className="w-6 h-6 rounded-full" alt="" />
                <p className="line-clamp-1 text-sm  text-grey dark:text-white">@{username }   · </p>
                <p className="min-w-fit text-sm text-grey">{getDay(publishedAt) }</p>

            </div>
            <h2 className={ "Blog-title font-semibold line-clamp-1 leading-7 text-lg text-dark-gray dark:text-white mt-3 my-4" +( sidebar?"text-md":"text-lg")}>{title}</h2>
            {/* <p className="my-2 text-[#242424] font-editor leading-6 max-sm:hidden md:max-[1100px]:hidden line-clamp-2 max-w-[750px]">{des}</p> */}
            <div className=" flex gap-4 mt-4">
                <span className="px-5 py-2 rounded-full dark:bg-main-dark bg-light-gray text-black dark:text-white capitalize dark:bg-secondary-dark text-sm ">{tags[0]}</span>
                <span className="flex items-center gap-2 text-grey"><LikeSvg fill={"rgb(107 114 128)"}/>  </span>
            </div>
        </div>
       { !sidebar?
        <div  className="h-32 aspect-square rounded-xl bg-white text-black dark:text-white dark:bg-secondary-dark">
            <img src={banner} alt="" className="w-full h-full aspect-square object-cover" />
        </div>:""}
        </Link>
     );
}
 
export default MinimalCard;