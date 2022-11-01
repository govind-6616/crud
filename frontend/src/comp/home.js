import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../style/my.css";
import "../style/form.css"

const New = () => {

    const [Val, SetVal] = useState([{
        name: "",year:"",branch:"",mobile_no:""
    }]);

    useEffect(() => {
        getData();
    });

    async function getData() {
       
        var response = await axios.get(`/read`);
        if (response.status == 200) {
            SetVal(response.data);
        }
        else {
            console.log("error");
        };
        console.log(response.data);
    }

    const DataDelete = async (id) => {
        try {
            const res = await axios.delete(`/delete/${id}`);
            if (res.status == 200) {
                getData();
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <>
            <br />
          
            <h2 id="heading">Student's Real Time Database </h2>
       <button className="btn" style={{marginLeft:"10%"}}><Link to="/create">➕</Link>Add User</button>
      
       <table id='tab'>
           <tr class='row'>
            <th>Sr No</th>
           <th>Name</th>
           <th>Year</th>
           <th>Branch</th>
           <th>Mobile No</th>
           <th>Update</th>
           <th>Delete</th>
           </tr>     
           <tbody>
                    {
                 Val.map((val, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{val.name}</td>
                                <td>{val.year}</td>
                                <td>{val.branch}</td>
                                <td>{val.mobile_no}</td>
                                <td><Link to={`/Update/${val._id}`}><button className="btn">✔</button></Link></td>
                                <td><button className="btn" onClick={() => DataDelete(val._id)}>🗑</button></td>
                            </tr>
                        );                     
                    })
                }
                   
                   </tbody>
              
            </table>
        </>
    )
}
export default New;