import { getDay } from "../common/date";
import { useStateContext } from "../contexts/ContextProvider";
import calendar from '../data/calendar.svg'
import time from '../data/time.svg'

const ArticleNow =({content,author})=>{
    const { currentColor } = useStateContext();
    let{publishedAt,tags,title,des,banner,activity:{total_likes},blog_id:id}= content
    let {profile_img,username}=author
  
    return(
    <div className="article flex p-3 gap-3 align-center rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-500">
            <img className=" rounded-xl w-20 h-20" src={banner} alt=""  />
            <div className="article-info  ">
              <p className='text-grey dark:text-gray-400  text-sm'><span className='' style={{color:currentColor}}>{tags[0]} </span>· {username}</p>
              <p className='font-semibold dark:text-gray-200 line-clamp-1 leading-7 text-black dark:text-white text-lg mb-1'>{title}</p>
            <div className='flex gap-2 text-grey dark:text-gray-400 '><img src={calendar} alt=""  className='w-5 h-5 text-gray'/><span className='text-sm '>{getDay(publishedAt)}</span>· <img src={time} className='w-5 h-5' alt="" srcset="" /><span className='text-sm '>8min Read</span></div>
           
            </div>
            </div>
    )
  }
  export default ArticleNow