import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import "../style/form.css"

const Update = () => {

    const { id } = useParams();
    const history = useHistory();
    useEffect(() => {
        SingleData(id);
    }, [id]);
    const [New, setNew] = useState({
        name: "",year:"",branch:"",mobile_no:""
    });

    const SingleData = async (id) => {
        try {
            const res = await axios.get(`/read/${id}`);
            if (res.status == 200) {
                setNew(res.data);
                console.log(res.data);
            }
        }

        catch (e) {
            console.log(e);
        }
        // console.log(res.data);
    }
    const update = async (New) => {
        try {
            const updateData = await axios.patch(`/update/${id}`, New);
            if (updateData.status == 200) {
                history.push("/");
            }
        }
        catch (e) {
            console.log(e);
            console.log("data");
        }
    }
    const inputEvent = (event) => {
        //        const value=event.target.value;
        //        const name=event.target.name;
        const { value, name } = event.target;
        setNew({ ...New, [name]: value });
    }
    const onSubmit = (event) => {
        event.preventDefault();
    };
    return (
        <div className="main">
           
            <form onSubmit={onSubmit}>
                <div>
<h2>Update Student Details</h2>
                    <input type="text" placeholder="Name"
                        onChange={inputEvent} name="name" value={New.name} />

                    <input type="text" placeholder="Year"
                        onChange={inputEvent} name="year" value={New.year} />

                    <input type="text" placeholder="Branch"
                        onChange={inputEvent} name="branch" value={New.branch} />

                    <input type="text" placeholder="Mobile Number"
                        onChange={inputEvent} name="mobile_no" value={New.mobile_no} />
                    <button type="submit" onClick={() => update(New)} className="btn">Save</button>
                </div>
            </form>

        </div>
    );
};
export default Update;