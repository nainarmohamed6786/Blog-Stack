import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import axios from 'axios';

export default function Homepage() {

  const [state,setState]=useState([]);

  const {search} = useLocation();

  useEffect(()=>{
     const fetchPost=async()=>{
      const res=await axios.get('http://localhost:5000/post/'+search);
     setState(res.data);
     }
     fetchPost();
  },[search])
  return (
    <>
      <Header />
      <div className="home">
        <Posts post={state} />
        <Sidebar />
      </div>
    </>
  );
}
