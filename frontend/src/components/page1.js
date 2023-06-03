import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
// import BackgroundImage from "../components/bg3.png"
import BackgroundImage from "../components/bg2.png"
const Page1 = () => {
    const [record, setRecord] = useState([]);

    const getData = () => {
        fetch("https://backend-nft.onrender.com/api/classroom/all/classes")
            .then((resposne) => resposne.json())
            .then((res) => setRecord(res));
            console.log(record);
    };
const navigate=useNavigate();
    useEffect(() => {
        getData();
    });
    return (
        <div>
            
            {/* <h3 className="text-center mt-5" style={{ fontFamily: "cursive" }}>
          Available Courses
        </h3> */}
            <div style={{ overflowX: "hidden" }}>
                <div className="text-center mt-5">
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{
                            position: "relative",
                            backgroundImage: `url(${BackgroundImage})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "100% 100%", 
                            maxWidth: "30%",
                            maxHeight: "15vh",
                            fontWeight: "bolder",
                            fontFamily: "cursive",
                            fontSize: "29px",
                            padding: "25px",
                            color: "white",
                            margin: "0 auto",
                        }}
                    >
                        <h3 className="p-2">Available Courses</h3>
                    </div>
                </div>



                <div class="row mb-4 mt-5 ">
                    {record.map((output, index) => (
                        <div style={{ marginLeft: "90px" }}>
                            <div className="col mb-4">
                                <div class="card" style={{ width: '15rem' }}>
                                    <img
                                        src={output.Image}
                                        class="card-img-top"
                                        alt="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?w=360"
                                        style={{ borderBottom: '2px solid black' }}

                                    />
                                    <div class="card-body">
                                        <h5 class="card-title">{output.Title}</h5>
                                        <p class="card-text">{output.Details.length > 50 ? `${output.Details.slice(0, 50)}...` : output.Details}</p>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <a href="#" className="btn btn-primary" onClick={()=>{
                                                navigate(`/${output._id}/buy`)
                                            }}>
                                                Register
                                            </a>
                                            <p style={{ color: "#A0D8B3", fontWeight: "bold", marginRight: "10px", marginLeft: "15px", marginTop: "0", marginBottom: "0" }}>Price: {output.Price} eth</p>
                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* <h3
                    className="text-center mt-5"
                    style={{
                        background: "-webkit-linear-gradient(#00b8ff, #ff8c00 99%)",
                        "-webkit-background-clip": "text",
                        "-webkit-text-fill-color": "transparent",
                        fontWeight: "bold",

                        fontFamily: "cursive",
                    }}
                >
                    Available Events
                </h3> */}
                {/* <div class="row mb-4 mt-5 ">
                    {record.map((output, index) => (
                        <div style={{ marginLeft: "55px" }}>
                            <div className="col mb-4">
                                <div class="card" style={{ width: "18rem" }}>
                                    <img
                                        src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?w=360"
                                        class="card-img-top"
                                        alt="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?w=360"
                                    />
                                    <div class="card-body">
                                        <h5 class="card-title">{output.id}</h5>
                                        <p class="card-text">{output.name}</p>
                                        <a href="#" class="btn btn-primary">
                                            register
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> */}
            </div>
        </div>
    );
}
export default Page1