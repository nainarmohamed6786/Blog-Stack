import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";

export default function SinglePost() {

  const [post,setPost]=useState({});
  const location=useLocation();
  const {user}=useContext(Context)
  
  const path=location.pathname.split("/")[2];
  
  useEffect(()=>{

    const getPost=async()=>{
      const res=await axios.get('http://localhost:5000/post/'+path);
     setPost(res.data);
    }
    getPost();
  },[path]);

  const handleDelete=async()=>{
    const res=await axios.delete(`http://localhost:5000/post/${post._id}`,{
      data: { username: user.username }},)
   res.data && window.location.replace('/')
  }
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo &&
           <img
           className="singlePostImg"
           src={post.photo}
           alt=""
         />
        }
     
        <h1 className="singlePostTitle">
        {post.title}
        {post.username===user.username && (
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit">EDIT</i>
            <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}>DELETE</i>
          </div>
        )}
          
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/posts?user=${post.username}`}>
              {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className="singlePostDesc">
       {post.desc}
        </p>
      </div>
    </div>
  );
}
