import { useStateContext } from "../contexts/ContextProvider";
import star from '../data/star-rate.svg'
import time from '../data/time.svg'

const ArticleCard =({blog})=>{
    const { currentColor } = useStateContext();
    let{publishedAt,tags,title,des,banner,blog_id:id,author:{personal_info:{fullname,username,profile_img}}}= blog

    return(
      <div className="article rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-500">
        <div className="image rounded-2xl object-contain bg-white p-3 rounded-full">
      <img className=" rounded-2xl object-contain h-[150px] max-h-[200px] w-full min-w-48 " src={banner} alt=""  /></div>
            <div className="article-info  p-3">
            <div className="domain border  border-light-gray dark:border-dark-gray rounded-lg font-semibold w-fit text-xs px-2 p-1" style={{color:currentColor}} >{tags[0]}</div>
            <p className='font-semibold dark:text-gray-200 line-clamp-2 leading-7 text-black dark:text-white mt-1 my-4 text-lg'>{title}</p>
            <div className="profile flex gap-2 align-center pb-4 border-b border-b-gray-200"><img className='w-6 h-6 rounded-full' src={profile_img} alt="" srcset="" /><p className='text-grey dark:text-gray-400  text-sm'> {username}</p></div>
            </div>
            <div className="article-review justify-between flex align-center p-3 pt-0 text-xs gap-2">
              <div className="review flex gap-2 align-center">
  
                <img className='w-4 h-4' src={star} alt="" srcset="" /><p className='review font-semibold'>4.5 </p>
              </div>
              <span className='text-gray-400'>·</span>
              <div className="level flex gap-2 font-semibold align-center"><img className='w-4 h-4' src={time} alt="" srcset="" /> 8min Read</div>
            </div>
            <div className="button pt-1 pb-4 px-3">
  
            <button className='text-white text-sm font-semibold text-center p-3 rounded-3xl mt-auto w-full ' style={{background:currentColor}}>Read Now</button>
            </div>
            </div>
    )
  }
  export default ArticleCard