import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { nanoid } from 'nanoid'

import jwt from "jsonwebtoken"
import cors from 'cors'
import admin from 'firebase-admin'
import serviceAccountKey from "./e-learning-platform-tahri-firebase-adminsdk-lldr7-86d7b2bb8d.json" with {type:"json"}
import { getAuth } from 'firebase-admin/auth'
import aws from 'aws-sdk'

// shema
import User from './Schema/User.js'
import Blog from './Schema/Blog.js'
import Course from './Schema/Course.js'
import Notification from './Schema/Notification.js'
import Comment from './Schema/Comment.js'
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
// console.log(process.cwd) // remove this after you've confirmed it is working
// console.log(process.env)
const server = express()
let PORT =3000
const dbURI = 'mongodb+srv://himo:himoti@tahri-learning-platform.of4nit7.mongodb.net/?retryWrites=true&w=majority&appName=Tahri-learning-Platform)';
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

// console.log(process.env.AWS_SECRET_ACCESS_KEY)
admin.initializeApp({
    credential:admin.credential.cert(serviceAccountKey)
}) 

mongoose.connect(dbURI, { autoIndex: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        throw err;
    });
//setting up s3 bucket
const s3 = new aws.S3({
    region:'eu-north-1',
    accessKeyId:process.env.AWS_ACCESS_KEY,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY, 
})

// const generateUploadUrl = async ()=>{
//     const date = new Date()
//     // unique image name to upload
//     const imageName = `${nanoid()}-${date.getTime()}.jpeg`
//     return await s3.getSignedUrlPromise('putObject',{
//         Bucket:'e-learning-website-tahri',
//         Key:imageName,
//         Expires:1000,
//         ContentType:"image/jpeg"
//     })

    
// }
const generateUploadUrl = async (fileName, contentType) => {
    const date = new Date();
    // Extract the file extension from the original file name
    const fileExtension = fileName.split('.').pop();
    // Generate a unique file name with the correct extension
    const uniqueFileName = `${nanoid()}-${date.getTime()}.${fileExtension}`;
    return await s3.getSignedUrlPromise('putObject', {
        Bucket: 'e-learning-website-tahri',
        Key: uniqueFileName,
        Expires: 1000,
        ContentType: contentType
    });
};
// Example for a .jpeg file
// generateUploadUrl('example.jpeg', 'image/jpeg').then(url => {
//     console.log('Upload URL for JPEG:', url);
// });

// // Example for a .doc file
// generateUploadUrl('example.doc', 'application/msword').then(url => {
//     console.log('Upload URL for DOC:', url);
// });

// // Example for a .pptx file
// generateUploadUrl('example.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation').then(url => {
//     console.log('Upload URL for PPTX:', url);
// });

// Example for a .mp4 file
const formatDatatoSend = (user) =>{
    const access_token = jwt.sign({id:user._id,teacher:user.teacher},process.env.SECRET_ACCESS_KEY)
    return {
        access_token,
        profile_img:user.personal_info.profile_img,
        username:user.personal_info.username,
        fullname:user.personal_info.fullname,
        isTeacher:user.teacher
        
    }
}
const  generateUsername = async (email)=>{
    let username= email.split('@')[0]
    console.log(username)
    let usernameExist = await User.exists({"personal_info.username":username}).then((result)=>result)
    usernameExist ? username += nanoid().substring(0,4) : ""
    return username
}
//middleware
server.use(express.json())//this will enable sharing json
// different port like vite
server.use(cors())
//  blog route middlware

const verifyJWT =(req,res,next)=>{
    const  authHeader=req.header('authorization')
    const token= authHeader && authHeader.split(" ")[1]
    if(!token){
        return res.status(401).json({error:"No access Token"})
    }
    jwt.verify(token,process.env.SECRET_ACCESS_KEY,(err,user)=>{
        if(err){
            return res.status(403).json({error:"access Token is invalid"})

        }
        req.user=user.id
        req.teacher=user.teacher
        next()
    })

}
//upload image url route
server.get('/get-upload-url',(req,res)=>{
    const { fileName, contentType } = req.query; // Assuming they are passed as query parameters
    console.log(fileName,contentType)
    generateUploadUrl(fileName,contentType).then(url=>{
            console.log(url)
         res.status(200).json({uploadURL:url})}
        )
    .catch(err=>{
        console.log(err.message)
        return res.status(500).json({error:err.message})
    })
})

//user auth form routes
server.post("/Sign-up",(req,res)=>{
    let {fullname,email,password,teacher}=req.body
    // validating the data from frontend
    if(fullname.length < 4){
        return res.status(403).json({"error":"Full name must be at least 4 letters long"})
    }
    if(!email.length){
        return res.status(403).json({"error":"Email is required"})
    }
    if(!emailRegex.test(email)){
        return res.status(403).json({"error":"Email is invalid"})
    }
    if(!passwordRegex.test(password)){
        return res.status(403).json({"error":"Password is invalid"})
    }
    // Check if teacher is set to true and validate password
    if (teacher && !password.endsWith('@teacher')) {
        return res.status(403).json({ "error": "Haaaa 3lach tkdaaaab!!" });
    }
    bcrypt.hash(password,10,async (err,hashed_pass)=>{
        let username = await generateUsername(email)
        let user = new User({
            personal_info:{fullname,email,password:hashed_pass,username},
            teacher:teacher
        })
        user.save().then((u)=>{
            
            return res.status(200).json(formatDatatoSend(u))
        }).catch(err=>{
            console.log(err)
            if(err.code==11000 ){
                return res.status(500).json({"error":"email already exist"})
            }
            return res.status(500).json({"error":err.message})

        })
    })

})
server.post("/Sign-in",(req,res)=>{
    let {email,password}=req.body
    User.findOne({"personal_info.email":email}).then((user)=>{
        if(!user){
            return res.status(403).json({"error":"email not found, you're getting older :( "})
        }
        if(!user.google_auth){
            bcrypt.compare(password,user.personal_info.password,(err,result)=>{
                if(err){
                    return  res.status(403).json({"error":"error occured while login please try again"})
                }
                if(!result){
                    return  res.status(403).json({"error":"Incorrect password"})
                    
                }else{
                    return  res.status(200).json(formatDatatoSend(user))
    
                }
            })
        }else{
            return res.status(403).json({"error":"Account was created using google.Try loggin in with google."})
        }
        
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json({"error":err.message})
    })
})
server.post("/google-auth", async (req, res) => {
    let { access_token } = req.body;
    console.log(access_token);

    try {
        const decodedUser = await getAuth().verifyIdToken(access_token);
        let { email, name, picture } = decodedUser;
        picture = picture.replace("s96-c", "s384-c");

        let user = await User.findOne({ "personal_info.email": email })
            .select("personal_info.fullname personal_info.username personal_info.profile_img google_auth");

        if (user) {
            if (!user.google_auth) { // login
                return res.status(403).json({ "error": "This email was signed up without Google. Please log in with a password to access the account" });
            }
        } else { // sign up
            let username = await generateUsername(email);
            user = new User({
                personal_info: { fullname: name, email: email, profile_img: picture, username },
                google_auth: true
            });

            await user.save();
        }

        return res.status(200).json(formatDatatoSend(user));

    } catch (err) {
        console.log(err); // Log the error for debugging purposes
        if (err.code === 'auth/invalid-token') {
            return res.status(401).json({ "error": "Invalid Google token, please try again" });
        } else if (err.code === 'auth/user-not-found') {
            return res.status(404).json({ "error": "User not found" });
        } else {
            return res.status(500).json({ "error": "Failed to authenticate you with Google, try with another account" });
        }
    }
});

//change password
server.post("/change-password",verifyJWT,(req,res)=>{
    let {currentPassword,newPassword}=req.body
    if (!passwordRegex.test(currentPassword)|| !passwordRegex.test(newPassword)) {
        return res.status(403).json({error:"Password should be 6 to 20 character long with a numeric and 1 uppercase letter"})
        
    }
    User.findOne({_id:req.user})
    .then((user)=>{
        if(user.google_auth){
            return res.status(403).json({error:"You can't change account's password because you logged through google"})
        }
        bcrypt.compare(currentPassword,user.personal_info.password,(err,result)=>{
            if (err) {
                return res.status(500).json({error:"Some error occured while changing the password, please try again later"})
                
            }
            if(!result){
                return res.status(403).json({error:"Incorrect current password"})
                
            }
            bcrypt.hash(newPassword,10,(err,hashed_password)=>{
                User.findOneAndUpdate({_id:req.user},{"personal_info.password":hashed_password})
                .then((u)=>{
                    return res.status(200).json({status:"password changed"})
                })
                .catch(err=>{
                    return res.status(500).json({error:"some error occured while saving new password, please try again later"})

                })
            })
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({error:"User not found"})
    })
})

server.get("/trending-blogs",(req,res)=>{
    let maxLimitLatest=5
    Blog.find({draft:false})
    .populate("author","personal_info.profile_img personal_info.username personal_info.fullname -_id")
    .sort({"activity.total_read":-1,"activity.total_likes":-1,"publishedAt":-1})
    .select("blog_id title des banner activity tags publishedAt -_id")
    .limit(maxLimitLatest)
    .then(blogs=>{
        return res.status(200).json({blogs})
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json({error :err.message})

    })
})
server.get("/trending-courses",(req,res)=>{
    let maxLimitLatest=4
    Course.find({draft:false})
    .populate("author","personal_info.profile_img personal_info.username personal_info.fullname -_id")
    .sort({"activity.total_read":-1,"activity.total_likes":-1,"publishedAt":-1})
    .select("blog_id title des banner level author category activity tags publishedAt -_id ")
    .limit(maxLimitLatest)
    .then(courses=>{
        return res.status(200).json({courses})
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json({error :err.message})

    })
})
server.post("/latest-blogs",(req,res)=>{
    let {page}=req.body
    let maxLimitLatest=6
    Blog.find({draft:false})
    .populate("author","personal_info.profile_img personal_info.username personal_info.fullname -_id")
    .sort({"publishedAt":-1})
    .select("blog_id title des banner activity tags publishedAt -_id")
    .skip((page-1)*maxLimitLatest)
    .limit(maxLimitLatest)
    .then(blogs=>{
        return res.status(200).json({blogs})
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json({error :err.message})

    })
})
server.post("/latest-courses",(req,res)=>{
    let {page}=req.body
    let maxLimitLatest=4
    Course.find({draft:false})
    .populate("author","personal_info.profile_img personal_info.username personal_info.fullname -_id")
    .sort({"publishedAt":-1})
    .select("course_id title des banner activity category level tags publishedAt -_id")
    .skip((page-1)*maxLimitLatest)
    .limit(maxLimitLatest)
    .then(courses=>{
        return res.status(200).json({courses})
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json({error :err.message})

    })
})
server.post("/all-latest-blogs-count",(req,res)=>{
    Blog.countDocuments({draft:false})
    .then(count=>{
        return res.status(200).json({totalDocs:count})
    })
    .catch((err)=>{
        return res.status(500).json({error:err.message})
    })
})
server.post("/all-latest-courses-count",(req,res)=>{
    Course.countDocuments({draft:false})
    .then(count=>{
        return res.status(200).json({totalDocs:count})
    })
    .catch((err)=>{
        return res.status(500).json({error:err.message})
    })
})
server.post("/search-users",(req,res)=>{
    let {query,page}= req.body
    User.find({"personal_info.username": new RegExp(query,"i")})
    .limit(50)
    .select("personal_info.fullname personal_info.username personal_info.profile_img -_id ")
    .then(users=>{
        return res.status(200).json({users})
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json({error :err.message})

    })


})
server.post("/search-blogs",(req,res)=>{
    let {tag,query,author,page,limit,eliminate_blog}= req.body
    let findQuery 
    if(tag){
         findQuery = {tags:tag,draft:false ,blog_id:{ $ne:eliminate_blog}}
        
    }else if(query){
          findQuery = {draft:false,title:new RegExp(query,"i")}
        
    }else if(author){
        findQuery = {author,draft:false}
    }
    const maxLimit=limit?limit:3
    Blog.find(findQuery)
    .populate("author","personal_info.profile_img personal_info.username personal_info.fullname -_id")
    .sort({"activity.total_read":-1,"activity.total_likes":-1,"publishedAt":-1})
    .select("blog_id title des banner activity tags publishedAt -_id")
    .skip((page-1)*maxLimit)
    .limit(maxLimit)
    .then(blogs=>{
        return res.status(200).json({blogs})
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json({error :err.message})

    })
})
server.post("/search-courses",(req,res)=>{
    let {tag,query,author,page,limit,eliminate_course,category}= req.body
    let findQuery 
    if(tag){
         findQuery = {tags:tag,draft:false ,course_id:{ $ne:eliminate_course}}
        
    }else if(query){
          findQuery = {draft:false,title:new RegExp(query,"i")}
        
    }else if(author){
        findQuery = {author,draft:false}
    }
    else if(category){
       console.log(category)
        findQuery = {category,draft:false}

    }
    console.log(findQuery)

    const maxLimit=limit?limit:3
    Course.find(findQuery)
    .populate("author","personal_info.profile_img personal_info.username personal_info.fullname -_id")
    .sort({"activity.total_views":-1,"activity.total_likes":-1,"publishedAt":-1})
    .select("course_id title des banner category level activity tags publishedAt -_id")
    .skip((page-1)*maxLimit)
    .limit(maxLimit)
    .then(courses=>{
        console.log
        return res.status(200).json({courses})
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json({error :err.message})

    })
})
server.post("/search-blogs-count",(req,res)=>{
    let {tag,query,author}= req.body
    let findQuery 
    if(tag){
         findQuery = {tags:tag,draft:false}
        
    }else if(query){
         findQuery = {draft:false,title:new RegExp(query,"i")}
        
    }else if(author){
        findQuery = {author,draft:false}
    }
    
    const maxLimit=5
    Blog.countDocuments(findQuery)
    .then(count=>{
        return res.status(200).json({totalDocs:count})
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json({error :err.message})
        
    })
})
server.post("/search-courses-count",(req,res)=>{
    let {tag,query,author,category}= req.body
    let findQuery 
    if(tag){
         findQuery = {tags:tag,draft:false}
        
    }else if(query){
         findQuery = {draft:false,title:new RegExp(query,"i")}
        
    }else if(author){
        findQuery = {author,draft:false}
    }
    else if(category){
        findQuery = {category,draft:false}

    }
    const maxLimit=5
    Course.countDocuments(findQuery)
    .then(count=>{
        return res.status(200).json({totalDocs:count})
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json({error :err.message})
        
    })
})
server.post("/get-profile",(req,res)=>{
    let {username}= req.body
    User.findOne({"personal_info.username":username})
    .select("-personal_info.password -google_auth -updatedAt -blogs")
    .then(user=>{
        return res.status(200).json(user)
        
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json({error :err.message})
        
    })
})
server.post("/get-category-courses",(req,res)=>{
    let {category}= req.body
    Course.find({"course.category":category})
    
    .then(courses=>{
        return res.status(200).json(courses)
        
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json({error :err.message})
        
    })
})
server.post("/update-profile-img",verifyJWT,(req,res)=>{
    let {url}=req.body
    User.findOneAndUpdate({_id:req.user},{"personal_info.profile_img":url})
    .then(()=>{
        return res.status(200).json({profile_img :url})
    })
    .catch((err)=>{
        return res.status(404).json({error :err.message})
        
    })
})
server.post("/update-profile",verifyJWT,(req,res)=>{
    let {username,bio,social_links}=req.body
    let bioLimit =200
    if(username.length<5){
        return res.status(403).json({error:"Username should be at least 3 letters long"})
    }
    if(bio.length>bioLimit){
        return res.status(403).json({error:`bio should not be more than ${bioLimit} characters`})
    }
    let socialLinksArr=Object.keys(social_links)
    try{
        for(let i =0;i<socialLinksArr.length;i++){
            if (social_links[socialLinksArr[i]].length) {
                let hostname=new URL(social_links[socialLinksArr[i]]).hostname
                if (!hostname.includes(`${socialLinksArr[i]}.com`) && socialLinksArr[i]!='website') {
                    return res.status(403).json({error:`${socialLinksArr[i]} link is invalid. you must enter a full link`})
                }
            }
        }
    }catch(err){
        return res.status(500).json({error:"You must provide full social links with 'https://' included"})
    }
    let UpdateObj={
        "personal_info.username":username,
        "personal_info.bio":bio,
        social_links
    }
    User.findOneAndUpdate({_id:req.user},UpdateObj,{
        runValidators:true
    })
    .then(()=>{
        return res.status(200).json({username})
    })
    .catch(err=>{
        if (err.code==11000) {
            return res.status(409).json({error:"username is already taken"})
        }
        return res.status(500).json({error:err.message})
    })
})
// create blog route
server.post('/create-blog',verifyJWT,(req,res)=>{
    let authorId=req.user
    console.log(authorId)
    let{title,des,banner,tags,content,draft,id}=req.body
    if(!draft){
        if(!des.length||des.length>200){
            return res.status(403).json({error:"you must provide a description under 200 characters to publish the blog"})
        }
        if(!banner.length){
            return res.status(403).json({error:"you must provide a blog banner to publish the blog"})
        }
        if(!content.blocks.length){
            return res.status(403).json({error:"you must provide some blog content to publish the blog"})
           
        }
        if(!tags.length||tags.length>10){
            return res.status(403).json({error:"you must provide at least a tag to publish the blog"})
           
            }
            if (!title.length) {
                return res.status(403).json({error:"you must provide a title to publish the blog"})
            }
    }
    
        tags=tags.map(tag=>tag.toLowerCase())
        let blog_id=id||title.replace(/[^a-zA-z0-9]/g,' ').replace(/\s+/g,"-").trim()+ nanoid()
       // edit blog
        if (id) {
                Blog.findOneAndUpdate({blog_id},{title,des,banner,content,tags,draft:draft?draft:false})
                .then(blog=>{
                    return res.status(200).json({id:blog_id})
                })
                .catch(err=>{
                    return res.status(500).json({error:err.message})

                }
                )
        }
        //create blog
        else{     
        let blog = new Blog({
            title,des,banner,content,tags,author:authorId,blog_id,draft:Boolean(draft)
        })
        blog.save().then(blog=>{
            let  increamentVal= draft ? 0 : 1
            User.findOneAndUpdate({_id:authorId},{ $inc :{"account_info.total_posts":increamentVal},$push:{"blogs":blog._id}}
        ).then((user)=>{
            console.log("updated total post number")
            return res.status(200).json({id:blog.blog_id})
        }).catch(err=>{
            console.log(err.message)
            return res.status(500).json({error:"failed to update total post number"})
            
        })
    }).catch(err=>{
            return res.status(500).json({error:err.message})
            
        })
    }
})
// create course route
function getCoursesPath(url) {
    // Find the starting index of "/Courses" in the URL
    const index = url.indexOf('/Courses');
    
    // If "/Courses" is found in the URL
    if (index !== -1) {
      // Return the part of the URL from "/Courses" to the end
      return url.substring(index);
    } else {
      // Return an empty string or handle the case where "/Courses" is not in the URL
      return '';
    }
  }
server.post('/create-course',verifyJWT,(req,res)=>{
    let authorId=req.user
    console.log(authorId)
    let{title,des,banner,tags,content,draft,id,category,level}=req.body
    if(!draft){
        if(!des.length||des.length>200){
            return res.status(403).json({error:"you must provide a description under 200 characters to publish the course"})
        }
        if(!banner.length){
            return res.status(403).json({error:"you must provide a blog banner to publish the course"})
        }
        if(!content.length){
            return res.status(403).json({error:"you must provide some blog content to publish the course"})
           
        }
        if(!tags.length||tags.length>10){
            return res.status(403).json({error:"you must provide at least a tag to publish the course"})
           
            }
        if(!category.length){
            return res.status(403).json({error:"you must provide at least a tag to publish the course"})
           
            }
        if(!level.length){
            return res.status(403).json({error:"you must provide the level to publish the course"})
           
            }
            if (!title.length) {
                return res.status(403).json({error:"you must provide a title to publish the course"})
            }
    }
    
        tags=tags.map(tag=>tag.toLowerCase())
        let course_id=id||title.replace(/[^a-zA-z0-9]/g,' ').replace(/\s+/g,"-").trim()+ nanoid()
       // edit blog
        if (id) {
                Course.findOneAndUpdate({course_id},{title,des,banner,category,level,content,tags,draft:draft?draft:false})
                .then(course=>{
                    return res.status(200).json({id:course_id})
                })
                .catch(err=>{
                    console.log(err)
                    return res.status(500).json({error:err.message})
                }
                )
        }
        //create course
    
        else{     
        let course = new Course({
            title,des,banner,content,category,level,tags,author:authorId,course_id,draft:Boolean(draft)
        })
        course.save().then(course=>{
            let  increamentVal= draft ? 0 : 1
            User.findOneAndUpdate({_id:authorId},{ $inc :{"account_info.total_courses":increamentVal},$push:{"course":course._id}}
        ).then((user)=>{
            console.log("updated total course number")
            return res.status(200).json({id:course.course_id})
        }).catch(err=>{
            console.log(err.message)
            return res.status(500).json({error:"failed to update total course number"})
            
        })
    }).catch(err=>{
            return res.status(500).json({error:err.message})
            
        })
    }
})
server.post("/get-blog",(req,res)=>{

    let {blog_id,draft,mode}=req.body;

    let incValue = mode!="edit"? 1:0
    Blog.findOneAndUpdate({blog_id},{ $inc:{"activity.total_reads":incValue}})
    .populate("author","personal_info.profile_img personal_info.username personal_info.fullname ")
    .select("title des content  banner activity publishedAt blog_id tags")
    .then(blog =>{
        User.findOneAndUpdate({"personal_info.username":blog.author.personal_info.username},{
            $inc:{"account_info.total_reads":incValue}
        })
        .catch(err=>{return res.status(500).json({error:err.message})})
        if (blog.draft&& !draft){
            return res.status(500).json({error:"you can not access draft blog"})
            
        }
        return res.status(200).json({blog})
    })    
    .catch(err=>{
        return res.status(500).json({error:err.message})
    })    
})
server.post("/get-course",(req,res)=>{

    let {course_id}=req.body;

    let incValue =  1
    Course.findOneAndUpdate({course_id},{ $inc:{"activity.total_views":incValue}})
    .populate("author","personal_info.profile_img personal_info.username personal_info.fullname ")
    .select("title des content banner activity publishedAt level course_id tags")
    .then(course =>{
        User.findOneAndUpdate({"personal_info.username":course.author.personal_info.username},{
            $inc:{"account_info.total_views":incValue}
        })
        .catch(err=>{return res.status(500).json({error:err.message})})
        
        return res.status(200).json({course})
    })    
    .catch(err=>{
        return res.status(500).json({error:err.message})
    })    
})
// handle liking
server.post("/like-blog",verifyJWT,(req,res)=>{
    let user_id=req.user
    let{_id,isLikedByUser}=req.body
    let incrementVal =!isLikedByUser?1: -1
    console.log(isLikedByUser)
    Blog.findOneAndUpdate({_id},{$inc:{"activity.total_likes":incrementVal}})
    .then(blog=>{
        if(!isLikedByUser){
            console.log("liked")
            let like = new Notification({
                type:"like",
                blog:_id,
                notification_for:blog.author,
                user:user_id
                
            })
            like.save().then(notification=>{
                return res.status(200).json({liked_by_user:true})
            })
        }else{
            Notification.findOneAndDelete({user:user_id,blog:_id,type:"like"})
            .then(data=>{
                console.log("deleted")
                return res.status(200).json({liked_by_user:false})
                
            })
            .catch(err=>{
                return res.status(500).json({error:err.message})
            })
        }
    })
})
server.post("/isliked-by-user",verifyJWT,(req,res)=>{
    let user_id =req.user
    let {_id}=req.body
    Notification.exists({user:user_id,type:"like",blog:_id})
    .then(result=>{
        return res.status(200).json({result})
        
    })
    .catch(err=>{
        return res.status(500).json({error:err.message})

    })
    
})
//comments route
server.post("/add-comment",verifyJWT,(req,res)=>{
    let user_id = req.user
    let{_id,comment,blog_author,replying_to,notification_id}=req.body
    if(!comment.length){
        return res.status(403).json({error:"write something to leave a comment"})
    }
    let commentObj = {
        blog_id:_id,blog_author,comment,commented_by:user_id
    }
    if (replying_to) {
        commentObj.parent=replying_to
        commentObj.isReply=true
    }
    new Comment(commentObj).save().then(async commentFile =>{
        let {comment,commentAt,children}=commentFile
        Blog.findOneAndUpdate({_id},{$push:{"comments":commentFile._id},$inc:{"activity.total_comments":1,"activity.total_parent_comments":replying_to?0:1}})
        .then(blog=>{
            console.log("new comment created")
        })
        let notificationObj={
            type:replying_to?"reply":"comment",
            blog:_id,
            notification_for:blog_author,
            user:user_id,
            comment:commentFile._id
        }
        if (replying_to) {
            notificationObj.replied_on_comment=replying_to
            await Comment.findOneAndUpdate({_id:replying_to},{$push:{children:commentFile._id}})
            .then(replyingtoCommentDoc=>{
            notificationObj.notification_for=replyingtoCommentDoc.commented_by
            })
            if (notification_id) {
                Notification.findOneAndUpdate({_id:notification_id},{reply:commentFile._id})
                .then(notification=>console.log('notification Updated'))
            }
        }
        new Notification(notificationObj).save().then(notification=>console.log('new notification created'))
        return res.status(200).json({comment,commentAt,_id:commentFile._id,user_id,children})
    })

})
server.post("/get-blog-comments",(req,res)=>{
    let {blog_id,skip}=req.body
    let maxLimit=5
    Comment.find({blog_id,isReply:false})
    .populate("commented_by","personal_info.username personal_info.fullname personal_info.profile_img")
    .skip(skip)
    .limit(maxLimit)
    .sort({
        'commentedAt':-1
    })
    .then(comment=>{
        return res.status(200).json(comment)
    })
    .catch(err=>{
        console.log(err.message)
        return res.status(500).json({error:err.message})
    })
})
server.post("/get-replies",(req,res)=>{
    let {_id,skip}=req.body
    let maxLimit=5
    Comment.findOne({_id})
    .populate({
        path:"children",
        options:{
            limit:maxLimit,
            skip:skip,
            sort:{'commentedAt':-1}
        },
        populate:{
            path:'commented_by',
            select:"personal_info.profile_img personal_info.fullname personal_info.username"
        },
        select:"-blog_id -updatedAt"
    })
    .select("children")
    .then(doc=>{
        return res.status(200).json({replies:doc.children})
    })
    .catch(err=>{
        return res.status(500).json({err:err.message})

    })
})
const deleteComments =(_id)=>{
    Comment.findOneAndDelete({_id})
    .then(comment=>{
        if (comment.parent) {
            Comment.findOneAndUpdate({_id:comment.parent},{$pull:{children:_id}})
            .then(data=>console.log("Comment delete from parent"))
            .catch(err=>console.log(err))
        }
        Notification.findOneAndDelete({comment:_id}).then(notification=>console.log("comment notification deleted"))
        Notification.findOneAndUpdate({reply:_id},{$unset:{reply:1}}).then(notification=>console.log("comment reply deleted"))
        Blog.findOneAndUpdate({_id:comment.blog_id},{$pull:{comments:_id},$inc:{"activity.total_comments":-1},"activity.total_parent_comments":comment.parent?0:-1})
        .then(blog=>{
            if(comment.children.length){
                comment.children.map(replies=>{
                    deleteComments(replies)
                })
            }
        })
    })
    .catch(err=>{
        console.log(err.message)
    })
} 
server.post("/delete-comment",verifyJWT,(req,res)=>{
    let user_id=req.user
    let{_id}=req.body
    Comment.findOne({_id})
    .then(comment=>{
        if(user_id==comment.commented_by || user_id==comment.blog_author){
            deleteComments(_id)
            return res.status(200).json({status:"deleted"})
        }else{
            return res.status(403).json({error:"you can not delete this comment"})
        }
    })
})
server.get("/new-notification",verifyJWT,(req,res)=>{
    let user_id=req.user
    Notification.exists({notification_for:user_id,seen:false,user:{$ne:user_id}})
    .then(result=>{
        if (result) {
            return res.status(200).json({new_notification_available:true})
        }
        else{
            return res.status(200).json({new_notification_available:false})

        }
    })
    .catch(err=>{
        return res.status(500).json({error:err.message})
    })
})
server.post("/notifications",verifyJWT,(req,res)=>{
    let user_id=req.user
    let {page,filter,deletedDocCount}=req.body
    let maxLimit=10
    let findQuery={notification_for:user_id,user:{$ne:user_id}}
    let skipDocs=(page-1)*maxLimit
    if (filter!='all') {
        findQuery.type=filter
    }
    if (deletedDocCount) {
        skipDocs-=deletedDocCount
    }
    Notification.find(findQuery)
    .skip(skipDocs)
    .limit(maxLimit)
    .populate("blog","title blog_id")
    .populate("user","personal_info.fullname personal_info.username personal_info.profile_img")
    .populate("comment","comment")
    .populate("replied_on_comment","comment")
    .populate("reply","comment")
    .sort({createdAt:-1})
    .select("createdAt type seen reply")
    .then(notifications=>{
        Notification.updateMany(findQuery,{seen:true})
        .skip(skipDocs)
        .limit(maxLimit)
        .then(()=>console.log('notification seen'))
        return res.status(200).json({notifications})
    })
    .catch(err=>{
        console.log(err.message)
        return res.status(500).json({error:err.message})
    })
})
server.post("/all-notifications-count",verifyJWT,(req,res)=>{
    let user_id=req.user
    let {filter} =req.body
    let findQuery={notification_for:user_id,user:{$ne:user_id}}
    if (filter!='all') {
        findQuery.type=filter
    }
    Notification.countDocuments(findQuery)
    .then(count=>{
        return res.status(200).json({totalDocs:count})
    })
    .catch(err=>{
        return res.status(500).json({error:err.message})
        
    })

})
server.post("/user-written-blogs",verifyJWT,(req,res)=>{
    let user_id=req.user
    let {page,draft,query,deletedDocCount}=req.body
    let maxLimit = 5
    let skipDocs = (page-1)*maxLimit
    if (deletedDocCount) {
        skipDocs-=deletedDocCount
    }
    Blog.find({author:user_id,draft,title:new RegExp(query,"i")})
    .skip(skipDocs)
    .limit(maxLimit)
    .sort({publishedAt:-1})
    .select("title banner publishedAt blog_id activity des draft -_id")
    .then(blogs=>{
        return res.status(200).json({blogs})
        
    })
    .catch(err=>{
        return res.status(500).json({error:err.message})

    })
})
server.post("/user-written-blogs-count",verifyJWT,(req,res)=>{
    let user_id=req.user
    let {draft,query}=req.body
    Blog.countDocuments({author:user_id,draft,title:new RegExp(query,'i')})
    .then(count=>{
        return res.status(200).json({totalDocs:count})
    })
    .catch(err=>{
        return res.status(500).json({error:err.message})
    })
})
server.post("/delete-blog",verifyJWT,(req,res)=>{
    let user_id=req.user
    let {blog_id} =req.body
    Blog.findOneAndDelete({blog_id})
    .then(blog=>{
        Notification.deleteMany({blog:blog._id}).then(data=>console.log('notifications deleted'))
        Comment.deleteMany({blog_id:blog._id}).then(data=>console.log("commentes deleted"))
        User.findOneAndUpdate({_id:user_id},{$pull:{blog:blog._id},$inc:{"account_info.total_posts":blog.draft ? 0 : -1}})
        .then(user=>console.log('Blog deleted'))
        return res.status(200).json({status:'done'})
    })
    .catch(err=>{
        return res.status(500).json({error:err.message})
    })
})
server.listen(PORT,()=>{
    console.log('listening on port '+ PORT)
})