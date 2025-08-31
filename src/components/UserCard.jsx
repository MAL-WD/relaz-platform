import { Link } from "react-router-dom";

const UserCard = ({user}) => {
    let {personal_info:{fullname,username,profile_img}}=user
    return ( 
        <>
        <Link to={`/user/${username}`} className="flex gap-5 border-gray-700 border mb-5">
            <img src={profile_img} className="w-14 h-14 rounded-full" />
            <div>
                <h3 className="font-medium text-lg line-clamp-2 ">{fullname}</h3>
                <p className="text-sm text-grey">@{username}</p>
            </div>
        </Link>
        </>
     );
}
 
export default UserCard;