import React, { useState } from 'react'
import '../styles/styles.css'


const Card = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


  return (
      <>
        <div className="card">
            <div id="card-content">
                <h2 className="title">REGISTER</h2>
            <form>
                <label>Name</label>
                <input className="content-form" type="text" required onChange={(e) => setName(e.target.value)}/>
                <div className='form-border'></div>
                <label>Username</label>
                <input type="text" className="content-form" required onChange={(e) => setUsername(e.target.value)}/>
                <div className='form-border'></div>
                <label>password</label>
                <input type="password" className="content-form" required onChange={(e) => setPassword(e.target.value)}/>
                <div className='form-border'></div>
            
                <input className="submit-btn" type="submit" name="submit" value="SIGN UP" />
               
            </form>
            
            </div>
        </div>


      </>
  )
}

export default Card