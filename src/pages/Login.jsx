import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/auth.js';
import '../styles/styles.css';


const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login, loginMessage } = useContext(AuthContext);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    login(userName, password);
  };

  const navigateToRegister = () => {
    navigate("/register")
  }


  return (
    <>
        <div className="card">
            <div id="card-content">
              <h1 className="title">Login</h1>
              <form className="card-form" onSubmit={handleSubmit}>
                  <label>Username</label>
                  <input className="content-form" type="text" name="username" value={userName} onChange={(e) => setUserName(e.target.value)} required/>
                  <div className='form-border'></div>
                  <label>Password</label>
                  <input className="content-form" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                  <div className='form-border'></div>
                  {loginMessage}
                  <button className="submit-btn" type="submit">SIGN IN</button>
                  <button className="submit-btn" onClick={navigateToRegister} style={{marginTop: "2%"}}>SIGN UP</button>
              </form>
            </div>
          </div>
    </>
  )
}
export default Login;