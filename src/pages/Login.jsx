import React, {useContext, useState} from 'react'
import { AuthContext } from '../contexts/auth.js';
import '../styles/styles.css';


const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  

  const { login, loginMessage } = useContext(AuthContext);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    login(userName, password);
  };


  return (
    <>
        <div className="card">
            <div id="card-content">
              <h1 className="title">Login</h1>
              <form onSubmit={handleSubmit}>
                  <label>Username</label>
                  <input className="content-form" type="text" name="username" value={userName} onChange={(e) => setUserName(e.target.value)} required/>
                  <div className='form-border'></div>
                  <label>Password</label>
                  <input className="content-form" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                  <div className='form-border'></div>
                  {loginMessage}
                  <button className="submit-btn" type="submit">Login</button>
              </form>
            </div>
          </div>
    </>
  )
}
export default Login;