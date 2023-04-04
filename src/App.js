import React, { useContext } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register.jsx";
import { AuthContext, AuthenticatorProvider } from "./contexts/auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Project from "./pages/Project.jsx";

function App() {
  const Private = ({ children }) => {
    const { authenticated } = useContext(AuthContext);
    const { loading } = useContext(AuthContext);

    if (loading) {
      return (
        <div>
          <h1>Loading</h1>
        </div>
      );
    }

    if (!authenticated) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <div className="App">
      <Router>
        <AuthenticatorProvider>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />}/>
            <Route exact path="/project" element={<Private><Project /></Private>}/>
            <Route
              exact
              path="/home"
              element={
                <Private>
                  <Home />
                </Private>
              }
            />
          </Routes>
        </AuthenticatorProvider>
      </Router>
    </div>
  );
}

export default App;
