import { Link } from "react-router-dom";
import { getDay } from "../common/date";
import LikeSvg from "../components svgs/LikeSvg";
import { act } from "react";

const BlogPostCard = ({content,author,index}) => {
    let{publishedAt,tags,title,des,banner,activity:{total_likes},blog_id:id}= content
    let {profile_img,username}=author

    return ( 
        <Link to={`/blog/${id}`} className="flex shadow gap-8 items-center bg-white dark:bg-secondary-dark p-6 rounded-3xl pb-5 mb-4">
        <div className="w-full  ">
            <div className="flex gap-2 items-center mb-3">
                <img src={profile_img} className="w-8 h-8 rounded-full" alt="" />
                <p className="line-clamp-1 text-dark-gray text-black dark:text-white">@{username }   · </p>
                <p className="min-w-fit text-sm text-grey">{getDay(publishedAt) }</p>

            </div>
            <h2 className="Blog-title text-3xl leading-10 line-clamp-2 font-semibold text-black dark:text-white">{title}</h2>
            <p className="my-2 text-grey dark:text-gray-400 text-lg font-editor leading-6 max-sm:hidden md:max-[1100px]:hidden line-clamp-2 max-w-[800px]">{des}</p>
            <div className="my-8 flex gap-4">
                {tags && <span className="px-5 py-2 rounded-full dark:bg-main-dark dark:text-white capitalize bg-light-gray text-sm "> {tags[0]} </span>}
                <span className="flex items-center gap-2 text-grey"><LikeSvg  fill={"rgb(107 114 128)"}/> {total_likes} </span>
            </div>
        </div>
        <div  className="h-40 w-40 aspect-square rounded-2xl bg-light-gray">
            <img src={banner} alt="" className="w-full rounded-2xl h-full aspect-square object-cover" />
        </div>
        </Link>
     );
}
 
export default BlogPostCard;