
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import "../style/form.css"

const Create = () => {
    const history = useHistory();
    const [Val, setVal] = useState({
        name: "",year:"",branch:"",mobile_no:""
      
    });
    const setData = async (Val) => {
        try {
            const data = await axios.post("/create", Val);
            if (data.status != 404) {
                history.push("/");
            }
        } catch (e) {
            console.log("error");
            console.log(e);
        }

    }
   
    const inputEvent = (event) => {
        //        const value=event.target.value;
        //        const name=event.target.name;
        const { value, name } = event.target;
        setVal({ ...Val, [name]: value });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(Val);
    };
    return (
        <>
 <div className="main">
            <form onSubmit={onSubmit}>
               
               <div>
    <h2>Add Student</h2>
                    <input type="text" placeholder="Name"
                        onChange={inputEvent} name="name" value={Val.name} />

                    <input type="text" placeholder="Year"
                        onChange={inputEvent} name="year" value={Val.year} />

                    <input type="text" placeholder="Branch"
                        onChange={inputEvent} name="branch" value={Val.branch} />

                    <input type="text" placeholder="Mobile Number"
                        onChange={inputEvent} name="mobile_no" value={Val.mobile_no} />

                    <button type="submit" onClick={() => setData(Val)} className="btn">Submit</button>
                    </div>
            </form>
            </div>
        </>
    );
};

export default Create;