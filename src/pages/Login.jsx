import React, {useContext, useState} from 'react'
import { AuthContext } from '../contexts/auth.js'


const Signin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
 
  const { login, loginMessage} = useContext(AuthContext);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    login(userName, password);
  };


  return (
    <div id="login">
      <h1 className="title">Login</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
            <label htmlFor="userName">Username</label>
            <input type="text" name="username" value={userName} onChange={(e) => setUserName(e.target.value)} required/>
        </div>
        <div className="field">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <div className="actions">
        {loginMessage}
        <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}
export default Signin;