import React from "react";
import { useState } from "react";
import axios from "axios";
import "../CSS/add-course.css";
import store from "../Store";
import { useNavigate } from "react-router-dom";
function AddCourse(){
    const [Title,SetTitle]=useState("");
    const [Contact,SetContact]=useState("");
    const [Details,SetDetails]=useState("");
    const [Price,SetPrice]=useState(0);
    const [Image , SetImage]=useState("");
    const [link,SetLink]=useState("");
    const [fileImg, setFileImg] = useState(null);
    var setDisplay="";
    const navigate=useNavigate();
    const onSubmit=async(e)=>{
       if(fileImg){
        const formdata=new FormData();
        e.preventDefault();
        formdata.append("file",fileImg);
        await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formdata,
          headers: {
              'pinata_api_key': process.env.REACT_APP_API,
              'pinata_secret_api_key': process.env.REACT_APP_KEY,
              "Content-Type": "multipart/form-data"
          },
      }).then((resFile)=>{
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        console.log("Hello");
          axios.post("https://backend-nft.onrender.com/api/classroom/create",{
            Title:Title,
            Contact:Contact,
            Wallet:store.getState().wallet,
            Details:Details,
            Price:Price,
            Image:ImgHash
          }).then((res)=>{
            if(res.data){
              alert("Posted");
              navigate("/trail")
            }
          })
        
      })
       }
     
    }
    return(
        <div className="add-course-outer">
        <h1>Add Course Details</h1>
           <div className="add-course-content">
           <h2>Course</h2>
          
           <form onSubmit={onSubmit}>
           <div class="field">
           <span class="bx bx-rename"></span>
           <input type="username" placeholder="Title" required value={Title} onChange={(e)=>{SetTitle(e.target.value)} }/>
         </div>
   
         <div class="field">
           <span class="bx bxs-envelope"></span>
           <input type="email" placeholder="Contact Email" required onChange={(e)=>{SetContact(e.target.value)} }/>
         </div>
   
         <div class="field">
           <span class="bx bx-wallet"></span>
           <input type="phone" placeholder="Price in eth" required onChange={(e)=>{SetPrice(e.target.value)} }/>
         </div>
         <div class="field">
         <span class='bx bx-text'></span>
           <input type="College" placeholder="Other Details" required onChange={(e)=>{SetDetails(e.target.value); console.log(Details);} }/>
         </div>
         <br/>
         {
    link===""?<label style={{
        width: "100%",
  margin: 0,
  color: "#fff",
  background: "#1FB264",
  border: 0,
  padding: "10px",
  borderRadius: "4px",
  borderBottom: "4px solid #15824B",
  transition: "all .2s ease",
  outline: "none",
  textTransform: "uppercase",
  fontWeight: 700,

    }}> Add Thumbnail Image
        <input type="file" onChange={(e) =>{setFileImg(e.target.files[0]);
        SetLink(URL.createObjectURL(e.target.files[0]));
       }} required style={{display:"none"}}/>
    </label> :<img src={link} alt='' style={{
        width:"200px",
        height:"100px",
        display:{setDisplay}
    }}/>
   }
       
         <p style={{position:"relative", top:"8px"}}><span style={{
               fontWeight:"bolder"
           }}>Connected Wallet:</span> {store.getState().wallet.slice(0,6)+"..."+store.getState().wallet.slice(31)}</p>
           <button id="add-course-button">Submit</button>
           </form>
           </div>
           </div>
    )
}
export default AddCourse;