import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./write.css";

export default function Write() {

  const [title,setTitle]=useState('');
  const [desc,setDesc]=useState('');
  const [file,setFile]=useState();

  const {user}=useContext(Context);


  const handleSubmit=async(e)=>{
    e.preventDefault();



      const newpost={
        username:user.username,
        title,
        desc
      }
      try{
      if(file){
        const data=new FormData;
        const filename=Date.now()+file.name;

        data.append("name",filename);
        data.append("fiile",file);
        newpost.photo=filename;
        await axios.post('http://localhost:5000/api/upload',data);
      }
     

      }
      catch(err){}


      try{
        const res=await axios.post('http://localhost:5000/post',newpost);
       
        res.data && window .location.replace('/')
      }
      catch(err){
        console.log(err);
      }
    
    }

  return (
    <div className="write">
     {file && 
     <img
     className="writeImg"
     src={URL.createObjectURL(file)}
     alt=""
   />
     } 
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} onChange={e=>setFile(e.target.files[0])} />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={e=>setDesc(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
