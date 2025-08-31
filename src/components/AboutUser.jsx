import { Link } from "react-router-dom";
import youtube from "../data/youtube.svg"
import facebook from "../data/facebook.svg"
import instagram from "../data/instagram.svg"
import github from "../data/github.svg"
import twitter from "../data/twitter.svg"
import website from "../data/link.svg"
import { links } from "../data/dummy";
import { getFullDay } from "../common/date";
const AboutUser = ({bio,social_links,joinedAt,classname }) => {
    const links = [youtube,facebook,twitter,github,instagram,website]

    return ( 
    <div className={"text-center mt-2" + classname} >
        <p className="text-md text-grey max-w-[550px] mx-auto  leading-7">{bio.length?bio:"There's no Bio to read"}</p>
        <div className="flex justify-center gap-x-7 gap-y-2 flex-wrap my-7 items-center text-dark-gray">
            {Object.keys(social_links).map((key,i)=>{
                let link =social_links[key]
                return link ? <Link className={"w-7 h-7 " +(i==1?"w-11 h-11":"")} to={link} key={key} target="_blank"><img className={"w-7 h-7 " +(i==1?"w-11 h-11":"")} src={links[i]} alt="" /></Link>:""
            })}
        </div>
        <p className="font-medium leading-7 text-grey">Joined On {getFullDay(joinedAt)}</p>
    </div> );
}
 
export default AboutUser;