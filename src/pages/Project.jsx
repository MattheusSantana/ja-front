import React, { useState } from 'react'
import '../styles/styles.css';
import { createProject } from '../services/api.js';
import { useNavigate } from 'react-router-dom';

const Project = () => {

    const [title, setTitle] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [cost, setCost] = useState("");
    const [deadline, setDeadline] = useState("");
    const navigate = useNavigate();
    
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const project = { 
              title, 
              zip_code:zipCode, 
              cost, 
              deadline 
            }
            
            const response = await createProject(project);
            
            if (response.status === 201 ) {
                console.log(response);
                alert(response.data.message);   
            }
            event.target.reset();
        } 
        catch (error) {
          console.log(error.response);
          if (error.response.status === 400) {
              return alert(error.response.data.message);
          };

          return alert("something failed, please try again later");
        }
        
    }

    const navigateToHome = () => {
        navigate("/home")
     }
  return (
    <>
    <div className="card">
        <div id="card-content">
        <h2 className="title" >PROJECT</h2>
        <form className="card-form" onSubmit={handleFormSubmit}>
            <label style={{paddingTop:"2%"}}>Title</label>
            <input className="content-form" type="text" required onChange={(e) => setTitle(e.target.value)}/>
            <div className="form-border"></div>
            <label>Zip Code</label>
            <input type="text" className="content-form" required onChange={(e) => setZipCode(e.target.value)}/>
            <div className='form-border'></div>
            <label>Cost</label>
            <input type="text" className="content-form" required onChange={(e) => setCost(e.target.value)}/>
            <div className='form-border'></div>

            <label>Deadline</label>
            <input type="datetime-local" className="content-form" required onChange={(e) => setDeadline(e.target.value)}/>
            <div className='form-border'></div>
        
            <button className="submit-btn" type="submit" name="submit" style={{marginTop: "10%"}}>Register</button>
            <button className="submit-btn" onClick={navigateToHome} style={{marginTop: "2%"}}>Back</button>
           
        </form>
        
        </div>
    </div>
    </>
  )
}

export default Project