import React, { useState } from 'react'
import '../styles/styles.css';
import { registerUser } from '../services/api.js';
import { useNavigate } from 'react-router-dom';

const Card = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = { name, username, password }
            
            const response = await registerUser(user);
            
            if (response.status === 201 ) {
                console.log(response);
                alert(response.data.message);   
                return navigate("/"); 
            }
            
        } catch (error) {
            console.log(error.response);
            if (error.response.status === 400) {
                return alert(error.response.data.message);
            };

            return alert("something failed, please try again later");
          }
        
    }

    const navigateToLogin = () => {
        navigate("/")
    }
  return (
      <>
        <div className="card">
            <div id="card-content">
            <h2 className="title">REGISTER</h2>
            <form className="card-form" onSubmit={handleFormSubmit}>
                <label>Name</label>
                <input className="content-form" type="text" required onChange={(e) => setName(e.target.value)}/>
                <div className="form-border"></div>
                <label>Username</label>
                <input type="text" className="content-form" required onChange={(e) => setUsername(e.target.value)}/>
                <div className='form-border'></div>
                <label>Password</label>
                <input type="password" className="content-form" required onChange={(e) => setPassword(e.target.value)}/>
                <div className='form-border'></div>
            
                <button className="submit-btn" type="submit" name="submit">SIGN UP</button>
                <button className="submit-btn" onClick={navigateToLogin} style={{marginTop: "2%"}}>SIGN IN</button>
               
            </form>
            
            </div>
        </div>


      </>
  )
}

export default Card