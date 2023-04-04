import React, { useContext } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Card from "./pages/Register.jsx";
import { AuthContext, AuthenticatorProvider } from "./contexts/auth";
import Home from "./pages/Home";
import Login from "./pages/Login";

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
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={<Card />}/>
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
