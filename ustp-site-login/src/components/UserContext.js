import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const user = JSON.parse(atob(token.split('.')[1]));
        setUser(user);
      } catch (error) {
        console.error('Failed to parse token:', error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "okay") {
          localStorage.setItem('token', data.token);
          const user = JSON.parse(atob(data.token.split('.')[1]));
          setUser(user);
          navigate('/');
        } else {
          alert(data.error || "Login failed");
        }
      })
      .catch(error => {
        console.error('Login error:', error);
        alert("Login failed");
      });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const register = (fname, lname, email, password, role) => {
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ fname, lname, email, password, role }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "okay") {
          alert("Registered Successfully");
          navigate('/login');
        } else {
          alert(data.error || "Registration failed");
        }
      })
      .catch(error => {
        console.error('Registration error:', error);
        alert("Registration failed");
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};
